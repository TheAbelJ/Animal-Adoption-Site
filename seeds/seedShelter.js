const mongoose = require('mongoose');
const Pet = require('../models/pets');
const Shelters = require('../models/shelters.js');

mongoose.connect('mongodb://127.0.0.1:27017/petRescue', {

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedShelters=async()=>{
    await Shelters.deleteMany({});
    const shelter = new Shelters({
        name:'southside shelter',
        contact:{
            email:'fool@gmail.com',
            phone:3434353434,
            address:{
                street1:'45,dalal road',
                street2:'camel center',
                city:'london',
                state:'england',
                zipcode:3973434
            }
        }
    });
    /* pet = await Pet.findOne({});
    shelter.pets.push(pet); */
    res = await shelter.save();
    console.log(res);
}

seedShelters();


/* to check if delete post middleware works */
/* Shelters.findByIdAndDelete('62c8804fb1492b70fe5e0a21')
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
}); */

