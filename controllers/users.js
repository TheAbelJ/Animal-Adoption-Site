const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/users');
const Pet = require('../models/pets')

module.exports.renderRegisterForm = (req,res)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/home');
    }
    res.render('user/register')
}

module.exports.renderProfile = catchAsync(async (req,res) => {
    const user = await User.findById(req.user._id)
    res.render('user/profile',{user})
    
})

module.exports.renderLoginForm = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/home');
    }
    console.dir(req.session)
    res.render('user/login');
}

module.exports.loginUser =  (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/home';
    /* delete req.session.returnTo; */
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res) => {
    req.logout(function(err){
        if (err) {return next(err)}
    });
    req.flash('success', "Goodbye!");
    res.redirect('/home');
}

module.exports.renderPets = catchAsync(async (req,res)=>{
    const user = await User.findById(req.user._id)
    const pets = await Pet.find({_id:{ $in:user.pets }})
    res.render('user/petList',{pets})
})

module.exports.deletePet = catchAsync(async (req,res)=>{
    const delPet = await Pet.findByIdAndDelete(req.body.petId)
    res.redirect('pets')

})

module.exports.registerUser = catchAsync(async (req,res)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/home');
    }
    try {
        const { username,password,name,phone,email,addr } = req.body;
        newUser={
            username,
            firstName:name.first,
            lastName:name.last,
            contact:{
                email,
                phone,
                address:{
                    addrline1:addr.line1,
                    addrline2:addr.line2,
                    city:addr.city,
                    state:addr.state,
                    zip:addr.zip
                }
            }
        }
        const user = new User(newUser);
        const registeredUser = await User.register(user, password);   //register is passport method to add user to database with hashed,salted pswd
        req.login(registeredUser, err => {
         if (err) return next(err);
         req.flash('success', 'Welcome to Pet Rescue!');
         res.redirect('/home');
        })
    } catch (e) {
        req.flash('error', e.message);    //e.message comes from passport
        res.redirect('register');
    }
    
})

module.exports.updateUser = catchAsync(async (req,res) =>{
    const user = await User.findById(req.user._id);
    const keys = Object.keys(user.contact.address);
    addrChange = false              // to log if address was changed
    contactChange = false           //to log if contact was changed
    nameChange = false              //to log if name was changed
    if(user.firstName!==req.body.name.first || user.lastName!==req.body.name.last){
        nameChange = true;
    }

    req.body.address.zip = parseInt(req.body.address.zip);
    //to check if address was updated
    for( let i of keys){
        if(req.body.address[i]!==user.contact.address[i]){
            addrChange = true;
            break;
        }
    } 
    newContact = {
        email:req.body.email,
        phone:parseInt(req.body.phone),
        address:req.body.address
    }

    // to check if contact was updated
    if(parseInt(req.body.phone)!==user.contact.phone || req.body.email!==user.contact.email){
        contactChange = false;
    }
    if(addrChange || contactChange){
        for( let i of user.pets){ 
            id = i.valueOf()
            await Pet.findByIdAndUpdate(id,{contact:newContact})
        }
    }
    if(addrChange || nameChange || contactChange){
        user.contact = newContact;
        user.firstName = req.body.name.first;
        user.lastName = req.body.name.last;
        await user.save();
    }
    res.redirect('profile')
        
})