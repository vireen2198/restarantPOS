'use strict';
var mongoose = require('mongoose');
var db = require('../db');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');

var ProductsSchema = new mongoose.Schema({
    productName: {
        type:String,
        required:[true,"product name required"],
        minlength:[4,"product name must be at least 4 characters long"],
        maxlength:[50,"product name must not exceed 50 characters"]
    },
    productPrice: {
        type:Number,   
        required:[true,"product price missing"],
        maxlength:[6,"invalid product price at (product price max length)"],
        minlength:[1,"invalid product price at (product price min length)"],
        pattern:[/^[1-9]{1}\d{1,3}\.\d{0,2}$/,"invalid product price"]
    },
    productDescription: {
        type:String,   
        maxlength:[1000,"product description must not exceed 1000 characters"],
        default:""
    },
    productCategory: {
        type:String,
        enum:{
            values:["western","arab","pakistani","local","bites","beverage","shisha"],
            message:"invalid product category"
        },
        required:[true,"product category missing"]
    },
    productImageAddress: String,
    productSize:{
        type:String,
        enum:{
            values:["","s","m","l"],
            message:"invalid product size"
        },
        default:""
    }
},{timestamps:true});


ProductsSchema.plugin(aggregatePaginate);
module.exports = db.model('Product', ProductsSchema);