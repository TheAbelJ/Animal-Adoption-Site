const mongoose = require('mongoose');
const Cats = require('../models/cats');
const Dogs = require('../models/dogs');
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
    cat = await Cats.findOne({});
    dog = await Dogs.findOne({});
    shelter.cats.push(cat);
    shelter.dogs.push(dog);
   res = await shelter.save();
    console.log(res);
}

seedShelters();

/* to check if delete post middleware works */
/* Shelters.findByIdAndDelete('62c19bc6ba1d24234f58f53f')
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
});
 */
