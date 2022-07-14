const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/users');

module.exports.renderRegisterForm = (req,res)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/home');
    }
    res.render('user/register')
}

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

module.exports.renderLoginForm = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/home');
    }
    console.dir(req.session)
    res.render('user/login');
}

module.exports.loginUser =  (req, res) => {
    req.flash('success', 'Welcome back!');
    console.dir(req.session)
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