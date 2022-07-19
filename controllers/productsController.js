let productsService = require("../services/productsService")

module.exports = {
    async addProducts(req, res, errorHandler) {
        try {
            await productsService.addProducts(req.body)
            res.status(200).send({ message: 'Product added successfully' })
        } catch (err) {
                // Set custom error for unique keys
                let errMsg;
                if (err.code == 11000) {
                  errMsg = Object.keys(err.keyValue)[0] + " already exists.";
                } else {
                  errMsg = err.message;
                }
                res.status(400).json({ statusText: "Bad Request", message: errMsg });
          }
    },

    async getProducts(req, res) {
        try {
            let products = await productsService.getProducts()
            res.status(200).send({ products, message: 'Products retrieved successfully' })
        } catch (e) {
            res.status(400).send({ e: true, message: e.message });
        }
    },

    async getProduct(req, res) {
        try {
            let product = await productsService.getProduct(req.body)
            res.status(200).send({ product, message: 'Product retrieved successfully' })
        } catch (e) {
            res.status(400).send({ e: true, message: e.message });
        }
    },

    async editProducts(req, res) {
        try {
            await productsService.editProducts(req.body)
            res.status(200).send({ message: 'Product edited successfully' })
        } catch (e) {
            res.status(400).send({ e: true, message: e.message });
        }
    },

    async deleteProducts(req, res) {
        try {
            await productsService.deleteProducts(req.body)
            res.status(200).send({ message: 'Product removed successfully' })
        } catch (e) {
            res.status(400).send({ e: true, message: e.message });
        }
    },

    async searchProducts(req, res) {
        try {
            let products = await productsService.searchProducts(req.body);
            res.status(200).send({ products, message: 'Product retrieved successfully' })
        } catch (e) {
            res.status(400).send({ e: true, message: e.message });
        }
    },
}