'use strict';
var mongoose = require('mongoose');
var db = require('../db');

var ProductsSchema = new mongoose.Schema({
    productId: { type: mongoose.Types.ObjectId },
    productName: String,
    productPrice: String,
});

ProductsSchema.index({ name:1 });

module.exports = db.model('Products', ProductsSchema);