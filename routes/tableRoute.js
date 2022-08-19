var express = require("express");
var router = express.Router();
var tablesController = require("../controllers/tablesController");
var passport = require("passport");
require("../config/passport")(passport);
router.get(
  "/getTables",
  passport.authenticate("user-rule", { session: false }),
  tablesController.getTables
);
router.post("/registerTables",passport.authenticate("user-rule", { session: false }), tablesController.registerTables);
router.get(
  "/tableCurrentOrder/:tableNumber",
  passport.authenticate("user-rule", { session: false }),
  tablesController.tableCurrentOrder
);
router.post(
  "/addTableCurrentOrder",
  passport.authenticate("user-rule", { session: false }),
  tablesController.addTableCurrentOrder
);
router.post(
  "/modifyTableCurrentOrderItemQuantity",
  passport.authenticate("user-rule", { session: false }),
  tablesController.modifyTableCurrentOrderItemQuantity
);
router.post(
  "/deleteSingleOrder",
  passport.authenticate("user-rule", { session: false }),
  tablesController.deleteSingleOrder
);
module.exports.router = router;
