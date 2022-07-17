'use strict';
var mongoose = require('mongoose');
var db = require('../db');

var ProductsSchema = new mongoose.Schema({
    productName: String,
    productPrice: String,
    productDescription: String,
    productImageAddress: String,
});

ProductsSchema.index({ productName: 1}, { unique: true });

module.exports = db.model('Product', ProductsSchema);