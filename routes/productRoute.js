var express = require('express');
var router = express.Router();

var productsController = require("../controllers/productsController");

router.post('/addProducts', productsController.addProducts);

module.exports.router = router;