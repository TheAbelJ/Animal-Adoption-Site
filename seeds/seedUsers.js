const mongoose = require('mongoose');
const Pet = require('../models/pets');
const Users = require('../models/users.js');

mongoose.connect('mongodb://127.0.0.1:27017/petRescue', {

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedUsers=async()=>{
    await Users.deleteMany({});
    const user = new Users({
        firstName:'Mahito',
        lastName:'John',
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
   /*  pet = await Pet.findOne({});
    user.pets.push(pet); */
    res = await user.save();
    console.log(res);
}

seedUsers();


/* to check if delete post middleware works */
/* Users.findByIdAndDelete('62c8802bf061b52fe9ac7158')
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
}); */



/* Users.findOne({}).populate('pets')
.then(res=>{
   console.log(res.pets[0].contact.address)
})
.catch(err=>{
    console.log(err)
})

 */