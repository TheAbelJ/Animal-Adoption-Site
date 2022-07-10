const express = require("express");
const catchAsync = require('../utils/catchAsync');  
const router = express.Router();
const passport = require('passport');

const Pet  = require('../models/pets')
const User = require('../models/users');
const {dogList,catList,species}=require('../seeds/petbreeds')

router.get('/new',(req,res)=>{
    res.render('pet/selectType',{species})
})

router.get('/new/dog',(req,res)=>{
    res.render('pet/newDog',{dogList})
})

router.get('/new/cat',(req,res)=>{
    res.render('pet/newCat',{catList})
})

module.exports = router;
