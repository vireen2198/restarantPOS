const Products = require('../models/Products')


module.exports = {

    async addProducts(params) {
        return await Products.create(params)
    },

    async getProducts(queries) {
        console.log(queries)
        let limitInApage=12;
        let skipItems=limitInApage*(Number(queries.page)-1);
        const data=await Products.find(
            { $or: [ 
                { productName: { $regex: queries.productName } }
             ] }
        ).select("_id");
        let totalPages=Math.ceil(data.length/limitInApage)
        const products = await Products.find(
            { $or: [ 
                { productName: { $regex: queries.productName } }
             ] }
        ).limit(limitInApage).skip(skipItems).sort(queries.sort);
        return {totalPages,products}
    },

    async getProduct(params) {
        return await Products.find({'_id' : params._id})
    },
    async getMenuProducts(params) {
        return await Products.find({}).sort(params.sort)
    },
    async editProducts(params) {
        return await Products.findOneAndUpdate({'_id' : params._id}, params)
    },

    async deleteProducts(params) {
        return await Products.findOneAndRemove({'_id' : params._id})
    },

}