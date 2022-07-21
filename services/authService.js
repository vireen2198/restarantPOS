const UserDao = require('../daos/authDao')
module.exports = {
    login: async function (loginDto) {

        if (loginDto != undefined) {
            let localUser = await UserDao.findUser(loginDto)

            if (undefined == localUser || null == localUser) {
                throw new Error("Username and Password does not match")
            }

            let user = {
                '_id' : localUser._id.toString().replace(/ObjectId\("(.*)"\)/, "$1"),
                'updated_at' : new Date(),
                'loggedIn' : 'true',
                'lastLogin' : new Date(),

            }
            UserDao.updateUser(user) //update the login status of the user

            let returnobj = JSON.parse(JSON.stringify(localUser));

            return returnobj;
        } else {
            throw new Error("Unable to find user.")
        }
    },
}