'use strict';
var mongoose = require('mongoose');
var db = require('../db');

var companySchema = new mongoose.Schema({

  businessEmail:String,
  mobileNumber: {
    type:String,
    required:[true,"business phone number required"]
  },
  address:{
    addressLine1:{
      type:String,
      required:[true,"address line 1 not provided"],
      minLength:[10,"invalid address line 1"]
    },
    addressLine2:{
      type:String,
      // required:[true,"address line 2 not provided"],
      default:"",
      
    },
    postCode:{
      type:Number,
      required:[true,"postcode not provided"]
    },
    state:{
      type:String,
      required:[true,"state not provided"]
    },
    county:{
      type:String,
      required:[true,"county not provided"]
    },
    country:{
      type:String,
      default:"Malaysia"
    }
  },
  companyName:String,
  tax:{
    type:Number,
    default:0
  },
  serviceCharges:{
    type:Number,
    default:0
  }
},{timestamps:true});

module.exports = db.model('company', companySchema);