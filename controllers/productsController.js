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
}