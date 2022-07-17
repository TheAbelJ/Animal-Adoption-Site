const express = require("express");
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users')
const { isLoggedIn } = require('../middleware/isLoggedIn');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(users.registerUser)

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: 'login' }), users.loginUser)

router.route('/profile')
    .get(isLoggedIn, users.renderProfile)
    .patch(isLoggedIn, users.updateUser)

router.route('/pets')
    .get(isLoggedIn, users.renderPets)
    .delete(isLoggedIn, users.deletePet)

router.get('/logout', users.logoutUser)

module.exports = router;
