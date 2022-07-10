const {dogList} = require('./dogbreeds')
const {catList} = require('./catbreeds')



module.exports.petList = [].concat(dogList,catList);
module.exports.species=['dog','cat'];
module.exports.catList = catList;
module.exports.dogList = dogList;