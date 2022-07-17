let productsDao = require('../daos/productsDao');

module.exports = {

    async addProducts(params) {
        return await productsDao.addProducts(params)
    },

    async getProducts() {
        return await productsDao.getProducts()
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

    async searchProducts(params) {
        return await productsDao.searchProducts(params)
    },
}