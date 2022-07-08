const mongoose=require('mongoose');
const Schema= mongoose.Schema;


const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name required']
    },
    contact:{
        email:String,
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

//To delete all pets when user is deleted
UserSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Pet.deleteMany({
            _id: {
                $in: doc.pets
            }
        })
    }
})

module.exports = mongoose.model('User',UserSchema);

const Pet = require('../models/pets');
/* requiring after export to avoid circular dependency error
https://github.com/Automattic/mongoose/issues/3826 */