var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);
var userController = require("../controllers/userController");

router.get('/getUser',passport.authenticate('user-rule', { session: false }), userController.sendUser );
router.get('/getAllUser',passport.authenticate('user-rule', { session: false }), userController.sendAllUser );
router.post('/settings',passport.authenticate('user-rule', { session: false }), userController.userSettings );
router.post('/addNewWorker',passport.authenticate('user-rule', { session: false }), userController.addNewWorker );
router.post('/userPhoneNumber',passport.authenticate('user-rule', { session: false }), userController.userPhoneNumber );
router.post('/verifyUserPhoneNumber',passport.authenticate('user-rule', { session: false }), userController.verifyUserPhoneNumber );
router.delete('/settings/deleteWorker/:deleteWorker',passport.authenticate('user-rule', { session: false }), userController.deleteWorker );
// router.post('/registerUser', userController.registerUser );
// router.post('/registerBusiness', userController.registerBusiness );
module.exports.router = router;