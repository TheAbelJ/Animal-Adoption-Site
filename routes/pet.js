const express = require("express");
 
const router = express.Router();
const passport = require('passport');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync'); 

const Pet  = require('../models/pets')
const User = require('../models/users');
const Shelter = require('../models/shelters')

const {species,dogList,dogAttr,catList,catAttr}=require('../seeds/petbreeds')
const { isLoggedIn } = require('../middleware/isLoggedIn');

router.get('/new',isLoggedIn,(req,res)=>{
    res.render('pet/selectType',{species})
})

router.get('/new/dog',isLoggedIn,(req,res)=>{
    res.render('pet/newDog',{dogList,dogAttr})
})

router.get('/new/cat',isLoggedIn,(req,res)=>{
    res.render('pet/newCat',{catList,catAttr})
})

router.post('/new/:pet',isLoggedIn,catchAsync(async (req,res,next)=>{
    
    petSpecies = req.params.pet
    const {name,age,weight,gender,primaryBreed,secondaryBreed,attributes,
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
    newPet = {
        species:petSpecies,
        name,age,weight,gender,
        breeds:{
            primary:primaryBreed,
            secondary:secondaryBreed,
            mixed:mixedBool
        },
        attributes,description,medicalIssues,
        contact: contactDetails
    }
    
    if(shelter_user){
        newPet.user = ownerId;
    }
    else{
        newPet.shelter = ownerId;
    }

    const pet = new Pet(newPet);
    await pet.save();
    res.redirect('/home');
}))


module.exports = router;
