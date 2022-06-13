const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const AnimalSchema = new Schema({
    name:String,
    type:String,
    age:Number
});

module.exports = mongoose.model('Animals',AnimalSchema);

