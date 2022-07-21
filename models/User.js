'use strict';
var mongoose = require('mongoose');
var db = require('../db');

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  mobileNumber: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: String,
  updated_by: String,
  dummy: Boolean,
  loggedIn: String,
  lastLogin: { type: Date, default: Date.now }
});

UserSchema.index({ username: 1, email: 1 }, { unique: true });
module.exports = db.model('User', UserSchema);