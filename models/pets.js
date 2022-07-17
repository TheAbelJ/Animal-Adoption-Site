const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const {petList,species}=require('../seeds/petbreeds')

const PetSchema = new Schema({
    species:{
        type:String,
        required:true,
        enum:species
    },
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
            enum:petList
        },
        secondary:{
            type:String,
            enum:petList.concat([''])
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
    description:{
        type:String,
        required:[true,'Description Required']
    },
    medicalIssues:String,
    contact:{
        email:String,
        phone:{
            type:Number,
            required:[true,'Phone Number Required']
        },
        address: {
            addrline1: String,
            addrline2: String,
            city: String,
            state: String,
            zip: Number
        }
    },
    images:[
        {
            url:String,
            fileName:String
        }
    ],
    shelter:{
        type: Schema.Types.ObjectId,
        ref: 'Shelter'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});


PetSchema.post('findOneAndDelete', async function (pet) {
    if (pet.user) {
        await User.updateOne(
            {_id: pet.user.valueOf() },
            { $pullAll: { pets: [pet._id]} }
        )
    }
})

/* pre hook to update User/shelter pet list with newly saved pet */
PetSchema.pre('save',async function(){              /* No need to call next if using an async function in mongoose middleware */
    if(this.user){
        console.log(this.user.valueOf());            
        user = await User.findById(this.user);
        if(user){
            user.pets.push(this._id);
            await user.save();
        }
        
    }
    if(this.shelter){
        console.log(this.shelter.valueOf());            
        shelter = await Shelter.findById(this.shelter);
        if(shelter){
            shelter.pets.push(this._id);
            await shelter.save();
        }
        
    }
})

module.exports = mongoose.model('Pet',PetSchema);

const User = require('./users');
const Shelter = require('./shelters');
/* requiring after export to avoid circular dependency error
https://github.com/Automattic/mongoose/issues/3826 */