"use strict";
var mongoose = require("mongoose");
var db = require("../db");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

var orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "products",
      unique: true,
      required: [true, "invalid product"],
    },
    productQuantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
var TableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    unique: true,
    required:[true,"table number missing"]
  },
  tableOrder: [orderSchema],
});

TableSchema.plugin(aggregatePaginate);
module.exports = db.model("tables", TableSchema);
