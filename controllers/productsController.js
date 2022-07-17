let productsService = require("../services/productsService")

module.exports = {
    async addProducts(req, res) {
        try {
            await productsService.addProducts(req.body)
            res.status(200).send({ message: 'Product added successfully' })
        } catch (e) {
            res.status(400).send({ e: true, message: e.message });
        }
    },

    async getProducts(req, res) {
        try {
            let products = await productsService.getProducts()
            res.status(200).send({ products, message: 'Product retrieved successfully' })
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
}