const Products = require('../models/Products')


module.exports = {

    async addProducts(params) {
        return await Products.create(params)
    },

    async getProducts() {
        return await Products.find()
    },

    async editProducts(params) {
        return await Products.findOneAndUpdate({'_id' : params._id}, params)
    },

    async deleteProducts(params) {
        return await Products.findOneAndRemove({'_id' : params._id})
    },

    async searchProducts(params) {
        return await Products.find({ 'productName': { $regex: params.productName } })
    },
}