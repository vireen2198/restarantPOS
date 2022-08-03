var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);

var productsController = require("../controllers/productsController");

router.post('/addProducts', passport.authenticate('user-rule', { session: false }), productsController.addProducts);
router.post('/getProducts', passport.authenticate('user-rule', { session: false }),  productsController.getProducts);
router.post('/getProduct', passport.authenticate('user-rule', { session: false }), productsController.getProduct);
router.post('/editProducts', passport.authenticate('user-rule', { session: false }), productsController.editProducts);
router.post('/deleteProducts', passport.authenticate('user-rule', { session: false }), productsController.deleteProducts);
router.post('/getMenuProducts', productsController.getMenuProducts);


module.exports.router = router;