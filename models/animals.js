const mongoose=require('mongoose');
const Schema= mongoose.Schema;


const AnimalSchema = new Schema({
    type:{
        type:String,
        required:true
    },
    species:{
        type:String,
        required:true
    },
    breeds:{
        primary:{
            type:String,
            required:true
        },
        secondary:String,
        mixed:Boolean,
        unknown:Boolean
    },

});

module.exports = mongoose.model('Animals',AnimalSchema);
