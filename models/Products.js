'use strict';
var mongoose = require('mongoose');
var db = require('../db');

var ProductsSchema = new mongoose.Schema({
    productId: { type: mongoose.Types.ObjectId },
    productName: String,
    productPrice: String,
    productDescription: String,
    productImageAdress: String,
});

ProductsSchema.index({ productId: 1, name: 1 } , { unique : true });

module.exports = db.model('Products', ProductsSchema);