const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const {petList,species}=require('../seeds/petbreeds')
const {cloudinary} = require('../cloudinary')

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
        years:{
            type:Number,
            required:[true,'Age required']
        },
        months:{
            type:Number
        }
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
    attributes:{                        //these attributes are to be updated in petDetails page to list all attributes
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
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {      //longitude first then latitude
            type: [Number],
            required: true
        }
    },
    image:{
            url:String,
            fileName:String
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

//index created as $geoNear in the aggregation pipeline requires a 2d or 2dsphere index
PetSchema.index( { location : "2dsphere" } );

//Static methods
PetSchema.statics.findByDistance = function(longitude, latitude, distance, resultCount,filter,resultOffset) { 
    //console.log(`longitude: ${longitude}, latitude: ${latitude}`);
    //console.log(`result offset in model:${resultOffset}`)
    //console.log(distance,'in static')
    const unitValue = 1000;
    const foundPets = this.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                query: {
                    'species':filter.species,
                    'breeds.primary': {$in:filter.primary},
                    'breeds.secondary': {$in:filter.secondary},
                    'breeds.mixed': {$in:filter.mixed},
                    'age.years': {$gte:filter.minAge, $lte:filter.maxAge},
                    'weight': {$gte:filter.minWeight, $lte:filter.maxWeight}              
                },
                maxDistance: distance * unitValue, 
                distanceField: 'distance',
                distanceMultiplier: 1 / unitValue
            }
        },
        {
            $project: {
                _id: 1, 
                distance: 1,
                name: 1,
                species:1,
                breeds:1,
                age:1,
                image:1
            }
        },
        {
            $sort: {
                distance: 1
            }
        },
        {$setWindowFields: {output: {totalCount: {$count: {}}}}}, // returns the total count of pets
        {
            $skip: resultOffset
        },
        { $limit: resultCount }
    ]);
    return foundPets; 
}

//mongoose middleware
PetSchema.post('findOneAndDelete', async function (pet) {  
    //deletes pet ids from their owners pet array
    if (pet.user) {
        await User.updateOne(
            {_id: pet.user.valueOf() },
            { $pullAll: { pets: [pet._id]} }
        )
    }
    else if (pet.shelter) {
        await Shelter.updateOne(
            {_id: pet.shelter.valueOf() },
            { $pullAll: { pets: [pet._id]} }
        )
    }
    //deletes hosted pet images on cloudinary
    cloudinary.uploader.destroy(pet.image.fileName);
})

/* pre hook to update User/shelter pet list with newly saved pet */
PetSchema.pre('save',async function(){              /* No need to call next if using an async function in mongoose middleware */
    if(this.user){          
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