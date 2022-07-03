const mongoose = require('mongoose');
const tests = require('../models/test');

mongoose.connect('mongodb://127.0.0.1:27017/petRescue');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedTest = async()=>{
    const test=new tests({
        name:'boba'
    })
    console.log(await test.save());
}
seedTest();

