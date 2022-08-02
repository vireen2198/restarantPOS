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

  tableStatus:{
    type:String,
    enum:{
      values:["vacant","occupied"],
      message:"invalid table status"
    },
    default:"vacant"
  },
  tableBill: {
    type: Number,
    default:0
  }

});

TableSchema.plugin(aggregatePaginate);
module.exports = db.model("tables", TableSchema);
