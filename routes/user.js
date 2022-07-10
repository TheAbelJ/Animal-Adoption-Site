const express = require("express");
const catchAsync = require('../utils/catchAsync');  
const router = express.Router();
const passport = require('passport');

const User = require('../models/users');

router.get('/register',(req,res)=>{
    res.render('user/register')
})
router.post('/register',catchAsync(async (req,res)=>{
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
        const registeredUser = await User.register(user, password);   //register is passport method to add user to database with hashed,salter pswd
        /* req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        }) */

        req.flash('success', 'Successfully made new user');
        res.redirect('/home');
    } catch (e) {
        req.flash('error', e.message);    //e.message comes from passport
        res.redirect('register');
    }
    
}))

router.get('/login', (req, res) => {
    res.render('user/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: 'login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    res.redirect('/home')
    /* const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl); */
})

module.exports = router;
