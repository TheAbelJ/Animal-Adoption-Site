const {dogList} = require('./dogbreeds')
const {catList} = require('./catbreeds')



module.exports.petList = [].concat(dogList,catList)
