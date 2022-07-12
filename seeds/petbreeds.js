const {dogList} = require('./dogbreeds')
const {catList} = require('./catbreeds')



module.exports.petList = [].concat(dogList,catList);
module.exports.species=['dog','cat'];
module.exports.catList = catList;
module.exports.dogList = dogList;
module.exports.dogAttr ={
    spayed_neutered:"Is your dog spayed/neutered?",
    house_trained:"Is your dog house trained?",
    shots_current:"Are your dogs vaccinations up to date?",
    leash_trained:"Is your dog leash trained"
}

module.exports.catAttr ={
    spayed_neutered:"Is your cat spayed/neutered?",
    house_trained:"Is your cat house trained?",
    shots_current:"Are your cats vaccinations up to date?"
}  