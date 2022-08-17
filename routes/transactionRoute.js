var express = require('express');
var router = express.Router();
var transactionController=require("../controllers/transactionController")
var passport = require('passport');
require('../config/passport')(passport);
router.post("/addPreviousTransactions/:tableNumber",passport.authenticate('user-rule', { session: false }),transactionController.addPreviousTransactions)
module.exports.router = router;