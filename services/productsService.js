let productsDao = require('../daos/productsDao');

module.exports = {

    async addProducts(params) {
        return await productsDao.addProducts(params)
    },

    async getProducts(query) {
        return await productsDao.getProducts(query)
    },
    async getMenuProducts(query) {
        return await productsDao.getMenuProducts(query)
    },
    async getProduct(params) {
        return await productsDao.getProduct(params)
    },

    async editProducts(params) {
        return await productsDao.editProducts(params)
    },

    async deleteProducts(params) {
        return await productsDao.deleteProducts(params)
    },

}