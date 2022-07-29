var express = require('express');
var router = express.Router();
const {getTables,registerTables}=require("../controllers/tablesController");
router.get("/getTables",getTables);
router.post("/registerTables",registerTables);
module.exports.router = router;