const User = require('../models/User')

module.exports = {
    findUser: async function (params) {
    let searchObj = {}

    if (params.username) {
      searchObj.username = params.username
    }

    if (params.password) {
      searchObj.password = params.password
    }


    return await User.findOne(searchObj)
  },

  updateUser: async function (userDto) {
    return await User.findOneAndUpdate({ '_id': userDto._id }, userDto)
  },
}