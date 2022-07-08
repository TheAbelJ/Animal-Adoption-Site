const mongoose=require('mongoose');
const Schema= mongoose.Schema;


const ShelterSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name required']
    },
    contact:{
        email:String,
        website:String,
        phone:{
            type:Number,
            required:[true,'Phone Number Required']
        },
        address: {
            street1: String,
            street2: String,
            city: String,
            state: String,
            zip: Number
        }
    },
    pets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        }
    ]
});

//To delete all pets when shelter is deleted
ShelterSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Pet.deleteMany({
            _id: {
                $in: doc.pets
            }
        })
    }
})
module.exports = mongoose.model('Shelter',ShelterSchema);

const Pet = require('../models/pets');