const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const {dogList}=require('../seeds/dogbreeds')

const DogSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name required']
    },
    age:{
        type:Number,
        required:[true,'Age required']
    },
    weight:Number,
    gender:{
        type:String,
        enum:['M','F'],
        required:[true,'Gender Required']
    },
    breeds:{
        primary:{
            type:String,
            required:[true,'Breed Required'],
            enum:dogList
        },
        secondary:{
            type:String,
            enum:dogList
        },
        mixed:Boolean
    },
    attributes:{
        spayed_neutered:Boolean,
        house_trained:Boolean,
        declawed:Boolean,
        shots_current:Boolean,
        leash_trained:Boolean
    },
    environment:{
        children:Boolean,
        dogs:Boolean,
        cats:Boolean
    },
    description:{
        type:String,
        required:[true,'Description Required']
    },
    contact:{
        email:String,
        phone:{
            type:Number,
            required:[true,'Phone Number Required']
        },
        address:String
    },
    shelter:{
        type: Schema.Types.ObjectId,
        ref: 'Shelter'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Dog',DogSchema);
