const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync'); 

const Pet  = require('../models/pets')
const User = require('../models/users');
const Shelter = require('../models/shelters')

const {species,dogList,dogAttr,catList,catAttr}=require('../seeds/petbreeds')

//Update species list in js script validateForms.js in public to add a new pet
module.exports.renderNewForm = (req,res)=>{
    if(req.query.petType==='dog')
        return res.render('pet/newPet',{species,petList:dogList,attributes:dogAttr,pet:"dog"})
    else if(req.query.petType==='cat')
        return res.render('pet/newPet',{species,petList:catList,attributes:catAttr,pet:"cat"})
    else
    res.render('pet/newPet',{species,petList:[""],pet:'pet',attributes:[""]})
}

module.exports.createNewPet = catchAsync(async (req,res,next)=>{
    
    const {petType,name,age,weight,gender,primaryBreed,secondaryBreed,attributes,
            medicalIssues,description} = req.body;
    
    mixedBool=(secondaryBreed)?true:false;          //Setting boolean value for mixed if secondary breed selected
    ownerId = req.user._id;                         //setting user/shelterid to that of currently logged in user
    

    let shelter_user = true;                       //true if owner is person. false if owner is shelter
    let owner = await User.findById(ownerId);       //find owner/shelter id
    if(!owner){
        owner = await Shelter.findById(ownerId)
        shelter_user = false;
    }
    if(!owner)
       return next(new ExpressError('Owner/Shelter Not found', 404));
    
    contactDetails = owner.contact;
    location = owner.location;
    newPet = {
        species:petType,
        name,age,weight,gender,
        breeds:{
            primary:primaryBreed,
            secondary:secondaryBreed,
            mixed:mixedBool
        },
        attributes,description,medicalIssues,
        contact: contactDetails,
        location
    }
    
    if(shelter_user){
        newPet.user = ownerId;
    }
    else{
        newPet.shelter = ownerId;
    }
    newPet.image = {
        url:req.file.path,
        fileName:req.file.filename
    }
    const pet = new Pet(newPet);
    await pet.save();
    res.redirect('/home');
})