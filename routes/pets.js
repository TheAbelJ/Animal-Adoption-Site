const express = require("express");
const router = express.Router();
const passport = require('passport');
const pets = require('../controllers/pets')
const { isLoggedIn } = require('../middleware/isLoggedIn');

router.get('/new',isLoggedIn,pets.renderNewForm)

router.post('/new/:pet',isLoggedIn,pets.createNewPet)


module.exports = router;
