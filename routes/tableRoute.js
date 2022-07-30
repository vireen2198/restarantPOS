var express = require('express');
var router = express.Router();

var tablesController = require("../controllers/tablesController")

router.get('/getTables', tablesController.getTables);
router.get('/getTable', tablesController.getTable);
router.post('/registerTables', tablesController.registerTables);

module.exports.router = router;