let Tables = require("../models/Tables");

module.exports = {
  async addProductsToDbArray(table) {
    let data = await Tables.findOneAndUpdate(
      { tableNumber: Number(table.tableNumber) },
      {
        $addToSet: {
          tableOrder: table.add,
        },
      },
      { runValidators: true, new: true }
    );
  },
  async modifyQuantityItems(table) {
    await Tables.findOneAndUpdate(
      {
        tableNumber: Number(table.tableNumber),
        "tableOrder.productId": table.productId,
      },
      {
        $set: {
          "tableOrder.$.productQuantity": Number(table.productQuantity),
        },
      },
      { runValidators: true, new: true }
    );
  },

  async getTables() {
    try {
      let tables = await Tables.find();
      return tables;
    } catch (error) {
      return new Error(error);
    }
  },

  async getTable(params) {
    // let tables = await Tables.find({"tableNumber" : params.tableNumber});
    // return tables
    let pipeline = [];
    pipeline.push(
      {
        $match: {
          tableNumber: Number(params.tableNumber),
        },
      },
      {
        $unwind: {
          path: "$tableOrder",
        },
      },
      {
        $project: {
          tableNumber: "$tableNumber",
          productQuantity: "$tableOrder.quantity",
          productId: "$tableOrder.productId",
        },
      }
    );
    let query = await Tables.aggregate(pipeline).allowDiskUse(true);
  },

  async registerTables(numberOfTables) {
    for (let i = 1; i <= Number(numberOfTables.tables); i++) {
      let tables = await Tables.create({ tableNumber: i });
    }
  },
  async tableCurrentOrder(table) {
    let tableOrders = await Tables.findOne({
      tableNumber: Number(table.tableNumber),
    }).select("tableOrder");
    return tableOrders;
  },

  async addTableCurrentOrder(table) {
    let getTable = await Tables.findOne({
      tableNumber: Number(table.tableNumber),
    });
    if (!getTable.tableOrder) {
      await this.addProductsToDbArray(table);
    }
    if (getTable.tableOrder) {
      let existingOrder = getTable.tableOrder.find(
        (item) => item.productId === table.add.productId
      );
      if (!existingOrder) {
        await this.addProductsToDbArray(table);
      }
    }
    return;
  },
  async modifyTableCurrentOrderItemQuantity(table) {
    let { tableOrder } = await Tables.findOne({
      tableNumber: Number(table.tableNumber),
    });
    let productQuantityToUpdate = tableOrder.find(
      (item) => item.productId === table.productId
    );
    switch (table.operator) {
      case "+":
        productQuantityToUpdate.productQuantity++;
        table.productQuantity = productQuantityToUpdate.productQuantity;

        await this.modifyQuantityItems(table);
        break;
      case "-":
        if (productQuantityToUpdate.productQuantity > 1) {
          productQuantityToUpdate.productQuantity--;
          table.productQuantity = productQuantityToUpdate.productQuantity;
          await this.modifyQuantityItems(table);
          break;
        }
        table.productQuantity = 1;
        await this.modifyQuantityItems(table);
        break;
    }
  },
};
