const Products = require('../models/Products')


module.exports = {

    async addProducts(params) {
        return await Products.create(params)
    },

    async getProducts(queries) {
        
        return await Products.find().sort(queries)
    },

    async getProduct(params) {
        return await Products.find({'_id' : params._id})
    },

    async editProducts(params) {
        return await Products.findOneAndUpdate({'_id' : params._id}, params)
    },

    async deleteProducts(params) {
        return await Products.findOneAndRemove({'_id' : params._id})
    },

    async searchProducts(params,queries) {
        return await Products.find(
            { $or: [ 
               { productName: { $regex: params.productName } }
            ] }).sort("-productName")
    },
}