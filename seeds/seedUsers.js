const mongoose = require('mongoose');
const Cats = require('../models/cats');
const Dogs = require('../models/dogs');
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
        name:'Mahito',
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
    user.cats.push(cat);
    user.dogs.push(dog);
   res = await user.save();
    console.log(res);
}

seedUsers();

/* to check if delete post middleware works */
/* Users.findByIdAndDelete('62c199c165fd1472d48aa7e1')
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
});
 */

/* Users.findOne({}).populate('dogs').populate('cats')
.then(res=>{
    
    console.log(res.dogs)
    console.log(res.cats)
})
.catch(err=>{
    console.log(err)
})
 */

/* Cats.findOne({}).then((res)=>{
    console.log(res)
})
.catch((err)=>{
    console.log('error')
}) */