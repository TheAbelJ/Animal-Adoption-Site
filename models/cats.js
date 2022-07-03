const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const {catList}=require('../seeds/catbreeds')

const CatSchema = new Schema({
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
            enum:catList
        },
        secondary:{
            type:String,
            enum:catList
        },
        mixed:Boolean
    },
    attributes:{
        spayed_neutered:Boolean,
        house_trained:Boolean,
        declawed:Boolean,
        shots_current:Boolean,
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

module.exports = mongoose.model('Cat',CatSchema);
