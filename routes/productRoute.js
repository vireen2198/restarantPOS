var express = require('express');
var router = express.Router();

var productsController = require("../controllers/productsController");

router.post('/addProducts', productsController.addProducts);
router.post('/getProducts', productsController.getProducts);
router.post('/getProduct', productsController.getProduct);
router.post('/editProducts', productsController.editProducts);
router.post('/deleteProducts', productsController.deleteProducts);
router.post('/searchProducts', productsController.searchProducts);


module.exports.router = router;