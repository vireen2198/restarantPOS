'use strict';
var mongoose = require('mongoose');
var db = require('../db');
const bcrypt=require("../config/bcrypt")
var UserSchema = new mongoose.Schema({
  username: {
    type:String,
    unique:true,
    match:[/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/,"invalid username format"]
  },
  email:{
    type:String,
    unique:true
  },
  password:{
    type:String,
  },
  userMobileNumber:{
    type:String,
    default:"",
    match:[/^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$/,"invalid phone number"]
  },
  dummy: Boolean,
  loggedIn: String,
  isAdmin: {
    type:Boolean,
    default:false,
    required:[true,"please provide user type"]
  },
  lastLogin: { type: Date, default: Date.now },
},{timestamps:true});

UserSchema.pre('save', async function(next) {
  try {
    const passwordRegex=/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    if(!passwordRegex.test(this.password))throw new Error("invalid password format");
    const hashedPwd=await bcrypt.newPwdHash(this.password);
    this.password=hashedPwd;
    next()
  } catch (error) {
    throw new Error(error.message)
  }
});
module.exports = db.model('User', UserSchema);