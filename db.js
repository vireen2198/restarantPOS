'use strict';
var mongoose = require('mongoose');

module.exports = mongoose.createConnection(process.env.DATABASE_URL, {
    useNewUrlParser: true,
});