const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const Schema= mongoose.Schema;


const UserSchema = new Schema({
    firstName:{
        type:String,
        required:[true,'First name required']
    },
    lastName:{
        type:String,
        required:[true,'Last name required']
    },
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
    pets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

//To delete all pets when user is deleted
UserSchema.post('findOneAndDelete', async function (user) {
    if (user) {
        await Pet.deleteMany({
            _id: {
                $in: user.pets
            }
        })
    }
})

module.exports = mongoose.model('User',UserSchema);

const Pet = require('../models/pets');
/* requiring after export to avoid circular dependency error
https://github.com/Automattic/mongoose/issues/3826 */