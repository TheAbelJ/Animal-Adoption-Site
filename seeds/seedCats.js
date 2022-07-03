const mongoose = require('mongoose');
const Cats = require('../models/cats');

mongoose.connect('mongodb://127.0.0.1:27017/petRescue', {

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedCats=async()=>{
    await Cats.deleteMany({});
    const cat=new Cats({
        name:'felicity',
        age:12,
        weight:21,
        gender:'M',
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
            phone:3434353434
        }
    })
   res = await cat.save();
   console.log(res);
}

seedCats();

