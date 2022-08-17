"use strict";
var mongoose = require("mongoose");
var db = require("../db");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

var orderSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      required:[true,"product id missing"]
    },
    productQuantity: {
      type: Number,
      required:[true,"product quantity missing"]    
    },
    currentProductTotal:{
      type: Number,
      required:[true,"product quantity missing"]    
    }

  },
  { timestamps: true }
);
var TableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    unique: true,
    required:[true,"table number missing"]
  },
  tableOrder:{
    type:[
      orderSchema
    ],
    default:undefined
  },
  tableBill: {
    type: Number,
    required:[true,"table current bill missing"],
    default:0
  },
  totalToPay:{
    type:Number,
    required:[true,"table final amount missing"],
    default:0
  }

});

TableSchema.plugin(aggregatePaginate);
module.exports = db.model("tables", TableSchema);
