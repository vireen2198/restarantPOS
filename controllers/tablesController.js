let tableService = require("../services/tablesService");

module.exports = {
  async getTables(req, res) {
    try {
      let tables = await tableService.getTables();
      if (!tables.length)
      return res.status(400).json({ message: "you do not have any tables listed yet" });
      return res.status(200).json({ tables, message: "tables retrieved successfully" });
    } catch (error) {
      return res.status(500).json({ error, message: "something went wrong!!! please try again later" });
    }
  },

  async getTable(req, res) {
    try {
      let table = await tableService.getTable(req.body);
      return res.status(200).json({ table, message: "table retrieved successfully" });
    } catch (error) {
      return res.status(500).json({ error, message: "something went wrong!!! please try again later" });
    }
  },

  async registerTables(req, res) {
    try {
      await tableService.registerTables(req.body);
      return res.status(201).json({ message: "tables successfully added" });
    } catch (error) {
      console.log(error);
    }
  },

  async tableCurrentOrder(req, res) {
    try {
      console.log(req.params);
      let orders = await tableService.tableCurrentOrder(req.params);
      return res.status(200).json({ orders, message: "tables retrieved successfully" });
    } catch (error) {
      return res.status(500).json({ error, message: "something went wrong!!! please try again later" });
    }
  },

  async addTableCurrentOrder(req, res) {
    try {
      console.log(req.params);
      let orders = await tableService.addTableCurrentOrder(req.body);
      return res.status(200).json({ orders, message: "tables retrieved successfully" });
    } catch (error) {
      return res.status(500).json({ error, message: "something went wrong!!! please try again later"});
    }
  },

  async modifyTableCurrentOrderItemQuantity(req, res) {
    try {
      let orders = await tableService.modifyTableCurrentOrderItemQuantity(
        req.body
      );
      return res.status(200).json({ orders, message: "tables retrieved successfully" });
    } catch (error) {
      return res.status(500).json({ error, message: "something went wrong!!! please try again later"});
    }
  },
  async deleteSingleOrder(req, res) {
    try {
      let orders = await tableService.deleteSingleOrder(
        req.body
      );
      return res.status(200).json({ message: "tables retrieved successfully" });
    } catch (error) {
      return res.status(500).json({ error, message: "something went wrong!!! please try again later"});
    }
  },
};
