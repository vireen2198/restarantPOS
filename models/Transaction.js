'use strict';
var mongoose = require('mongoose');
var db = require('../db');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
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
    }
  );
var TableSchema = new mongoose.Schema({
    tableNumber: {
      type: Number,
      required:[true,"table number missing"]
    },
    tableOrder:{
      type:[],
      required:[true,"table orders missing"],
      minLength:1
    },
    tableBill: {
      type: Number,
      required:[true,"table current bill missing"],
    },
    totalPaid:{
      type:Number,
      required:[true,"table final amount missing"],
    }
  
  });
var TransactionSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required:[true,"table number missing"]
  },
  tableOrder:{
    type:[],
    required:[true,"table orders missing"],
    minLength:1
  },
  tableBill: {
    type: Number,
    required:[true,"table current bill missing"],
  },
  totalPaid:{
    type:Number,
    required:[true,"table final amount missing"],
  },
  waiterName:{
    type:String,
    required:[true,"waiter name not provided"]
  }
},{timestamps:true});


TransactionSchema.plugin(aggregatePaginate);
module.exports = db.model('transactions', TransactionSchema);