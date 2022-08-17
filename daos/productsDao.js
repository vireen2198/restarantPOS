const Products = require('../models/Products')


module.exports = {

    async addProducts(params) {
        const {productName,productPrice,productDescription,productImageAddress,productCategory,productSize}=params
        return await Products.create({productName:productName.toLowerCase(),productDescription:productDescription.toLowerCase(),productImageAddress,productCategory,productSize,productPrice})
    },

    async getProducts(queries) {
        let limitInApage=12;
        let skipItems=limitInApage*(Number(queries.page)-1);
        const data=await Products.find(
            { $or: [ 
                { productName: { $regex: queries.productName.toLowerCase() } }
             ] }
        ).select("_id");
        let totalPages=Math.ceil(data.length/limitInApage)
        const products = await Products.find(
            { $or: [ 
                { productName: { $regex: queries.productName.toLowerCase() } }
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
        const {_id,productName,productPrice,productDescription,productImageAddress,productCategory,productSize}=params
        return await Products.findOneAndUpdate({_id},{productName:productName.toLowerCase(),productDescription:productDescription.toLowerCase(),productImageAddress,productCategory,productSize,productPrice})
    },

    async deleteProducts(params) {
        return await Products.findOneAndRemove({'_id' : params._id})
    },

}