'use strict';
var mongoose = require('mongoose');
var db = require('../db');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');

var ProductsSchema = new mongoose.Schema({
    productName: String,
    productPrice: String,
    productDescription: String,
    productCategory: String,
    productImageAddress: String,
});

ProductsSchema.index({ productName: 1}, { unique: true });

ProductsSchema.plugin(aggregatePaginate);
module.exports = db.model('Product', ProductsSchema);