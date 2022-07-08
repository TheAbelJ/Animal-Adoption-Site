const mongoose = require('mongoose');
const Pet = require('../models/pets');

mongoose.connect('mongodb://127.0.0.1:27017/petRescue', {

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedPets=async()=>{
    await Pet.deleteMany({});
    const pet1=new Pet({
        type:'dog',
        species:'dog',
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
            email:'doggo@gmail.com',
            phone:3434353434,
            address:{
                street1:'clubhouse',
                street2:'rocky road',
                city:'london',
                state:'england',
                zip:343434
            }
        },
        user:'62c8802bf061b52fe9ac7158'
       
    })
    const pet2=new Pet({
        type:'cat',
        species:'cat',
        name:'jimmy',
        age:10,
        weight:20,
        gender:'F',
        breeds:{
            primary:"Brazilian Shorthair",
            mixed:false,
            unknown:false
        },
        attributes:{
            declawed:true,
            shots_current:true,
        },
        environment:{
            dogs:true,
            cats:true
        },
        description:'good pussy',
        contact:{
            phone:34343534434,
            address:{
                street1:'mansion',
                street2:'dalal road',
                city:'tokyo',
                state:'japan',
                zip:34353
            }
        },
        shelter:'62c8804fb1492b70fe5e0a21'
    })
   res1 = await pet1.save();
    res2 = await pet2.save();
  /*  console.log(res1);
   console.log(res2); */
}

seedPets();

