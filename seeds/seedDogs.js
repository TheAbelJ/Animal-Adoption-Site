const mongoose = require('mongoose');
const Dogs = require('../models/dogs');

mongoose.connect('mongodb://127.0.0.1:27017/petRescue', {

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDogs=async()=>{
    await Dogs.deleteMany({});
    const dog1=new Dogs({
        name:'bones',
        age:12,
        weight:21,
        gender:'M',
        breeds:{
            primary:"Alpine Spaniel",
            secondary:"American Cocker Spaniel",
            mixed:true,
            unknown:false
        },
        attributes:{
            declawed:true,
            shots_current:true,
        },
        environment:{
            dogs:true
        },
        description:'good doggo',
        contact:{
            phone:3434353434
        }
    })
    const dog2=new Dogs({
        name:'jimmy',
        age:10,
        weight:20,
        gender:'F',
        breeds:{
            primary:"Boxer",
        },
        attributes:{
            declawed:true,
            shots_current:true,
        },
        environment:{
            dogs:true
        },
        description:'fighting doggo',
        contact:{
            phone:34343534434
        }
    })
   res1 = await dog1.save();
    res2 = await dog2.save();
   console.log(res1);
   console.log(res2);
}

seedDogs();

