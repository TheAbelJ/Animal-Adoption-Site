const express = require("express");
const router = express.Router();
const passport = require('passport');
const pets = require('../controllers/pets')
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { isLoggedIn } = require('../middleware/isLoggedIn');

router.get('/new',isLoggedIn,pets.renderNewForm)

router.post('/new/:pet',isLoggedIn,upload.array('image'),pets.createNewPet)


module.exports = router;
