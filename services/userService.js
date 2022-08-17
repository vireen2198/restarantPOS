const { addNewWorker } = require('../controllers/userController')
const userDao = require('../daos/userDao')

module.exports = {
    async sendUser(params){
        return await userDao.sendUser(params)
    },
    async sendAllUser(params){
        return await userDao.sendAllUser(params)
    },
    async userSettings(params){
        return await userDao.userSettings(params)
    },
    async deleteWorker(params){
        return await userDao.deleteWorker(params)
    },
    async addNewWorker(params){
        return await userDao.addNewWorker(params)
    },
    async userPhoneNumber(params){
        return await userDao.userPhoneNumber(params)
    },
    async verifyUserPhoneNumber(params){
        return await userDao.verifyUserPhoneNumber(params)
    }
}