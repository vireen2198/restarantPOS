const UserDao = require('../daos/authDao')
const bcrypt = require('../config/bcrypt')

module.exports = {
    login: async function (loginDto) {
        let localUser = await UserDao.findUser(loginDto);
        if(localUser == null){
            throw new Error("Unable to find user.")
        } 
        let password = await bcrypt.comparePwd(loginDto.password , localUser.password)
        if (password == true) {

            let user = {
                '_id' : localUser._id.toString().replace(/ObjectId\("(.*)"\)/, "$1"),
                'loggedIn' : 'true',
                'lastLogin' : new Date(),

            }
            UserDao.updateUser(user) //update the login status of the user

            let returnobj = JSON.parse(JSON.stringify(localUser));

            return returnobj;
        } 
        else {
            throw new Error("incorrect username or password.")
        }
    },
}