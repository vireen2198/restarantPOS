var express = require("express");
var router = express.Router();
var tablesController = require("../controllers/tablesController");

router.get("/getTables", tablesController.getTables);
router.get("/getTable", tablesController.getTable);
router.post("/registerTables", tablesController.registerTables);
router.get("/tableCurrentOrder/:tableNumber",tablesController.tableCurrentOrder);
router.post("/addTableCurrentOrder", tablesController.addTableCurrentOrder);
router.post("/modifyTableCurrentOrderItemQuantity",tablesController.modifyTableCurrentOrderItemQuantity);

module.exports.router = router;
