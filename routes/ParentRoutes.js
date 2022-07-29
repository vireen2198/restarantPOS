var express = require('express');
var router = express.Router();

router.use('/products', require('./productRoute').router);
router.use('/auth', require('./authRoute').router);
router.use('/tables', require('./tableRoute').router);

module.exports.router = router;