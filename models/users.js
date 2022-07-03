const mongoose=require('mongoose');
const Dog = require('./dogs');
const Cat = require('./cats');
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
    dogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Dog'
        }
    ],
    cats: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cat'
        }
    ]
});

UserSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Dog.deleteMany({
            _id: {
                $in: doc.dogs
            }
        })
        await Cat.deleteMany({
            _id: {
                $in: doc.cats
            }
        })
    }
})

module.exports = mongoose.model('User',UserSchema);
