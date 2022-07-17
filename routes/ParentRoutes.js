var express = require('express');
var router = express.Router();

router.use('/products', require('./productRoute').router);

module.exports.router = router;