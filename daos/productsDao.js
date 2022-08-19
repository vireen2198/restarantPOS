const Products = require('../models/Products')
const imageTypeArray=["image/png","image/jpeg","image/jpg"]

module.exports = {

    async addProducts(params) {
        try {
            const {productName,productPrice,productDescription,productImageAddress,productCategory,productSize}=params;
            if(!productImageAddress)throw new Error("product image required")
            const imageType=productImageAddress.split(";")[0].split(":")[1];
            const imageFormat=productImageAddress.split(",")[0].split(";")[1];
            if(!imageType||!imageFormat)throw new Error("invalid image format")
            if(!imageTypeArray.some(type=>type===imageType.toLowerCase())||!imageFormat.toLowerCase()==="base64")throw new Error("invalid image format")
            await Products.create({productName:productName?productName.toLowerCase():"",productDescription:productDescription?productDescription.toLowerCase():"",productImageAddress,productCategory,productSize,productPrice:Number(productPrice).toFixed(2)})
            return 
        } catch (error) {
            throw new Error(error.message)
        }
       
    },

    async getProducts(queries) {
        try {
            let limitInApage=12;
            let skipItems=limitInApage*(Number(queries.page)-1);
            let {productName}=queries;
            productName = productName?productName.toLowerCase() : ""
            const data=await Products.find(
                { $or: [ 
                    { productName: { $regex: productName }}
                 ] } 
            ).select("_id");
            let totalPages=Math.ceil(data.length/limitInApage)
            const products = await Products.find(
                { $or: [ 
                    { productName: { $regex: productName} }
                 ] }
            ).limit(limitInApage).skip(skipItems).sort(queries.sort);
            return {totalPages,products}
        } catch (error) {
            throw new Error(error)
        }
       
    },

    async getProduct(params) {
        return await Products.find({'_id' : params._id})
    },
    async getMenuProducts(params) {
        return await Products.find({}).sort(params.sort)
    },

    async editProducts(params) {
        try {
            const {_id,productName,productPrice,productDescription,productImageAddress,productCategory,productSize}=params;
            if(!productImageAddress)throw new Error("product image required")
            const imageType=productImageAddress.split(";")[0].split(":")[1];
            const imageFormat=productImageAddress.split(",")[0].split(";")[1];
            if(!imageType||!imageFormat)throw new Error("invalid image format")
            if(!imageTypeArray.some(type=>type===imageType.toLowerCase())||!imageFormat.toLowerCase()==="base64")throw new Error("invalid image format")
            await Products.findOneAndUpdate({_id},{productName:productName?productName.toLowerCase():"",productDescription:productDescription?productDescription.toLowerCase():"",productImageAddress,productCategory,productSize,productPrice:Number(productPrice).toFixed(2)},{runValidators:true})
            return
        } catch (error) {
            throw new Error(error.message)
        }
        
    },

    async deleteProducts(params) {
        return await Products.findOneAndRemove({'_id' : params._id})
    },
    async getAllProducts(queries) {
        const products = await Products.find(
            {}
        )
        const modifiedProducts=products.map(product=>{
            const {productName,productPrice,productDescription,productCategory,productImageAddress,productSize}=product
            return {productName:productName.toLowerCase(),productPrice:Number(productPrice),productDescription,productCategory,productImageAddress,productSize}
        })
        await Products.deleteMany();
        const data=await Products.insertMany(modifiedProducts)
        return {data}
    },

}