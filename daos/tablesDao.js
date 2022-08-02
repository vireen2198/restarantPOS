let Tables = require("../models/Tables");
let Products=require("../models/Products")
module.exports = {
  async addProductsToDbArray(table) {
    const {productId}=table.add;
    const getProduct=await Products.findOne({_id:productId});
    if(!getProduct)return
    const {productPrice}=getProduct
    let data = await Tables.findOneAndUpdate(
      { tableNumber: Number(table.tableNumber) },
      {
        $addToSet: {
          tableOrder: {
            productId,
            productQuantity:1,
            currentProductTotal:productPrice
          },
        },
      },
      { runValidators: true, new: true }
    );
    await this.modifyTableTotalBill(table.tableNumber)
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
          "tableOrder.$.currentProductTotal": Number(table.productQuantity)*Number(table.productPrice),
        },
      },
      { runValidators: true, new: true }
    );
    await this.modifyTableTotalBill(table.tableNumber)
  },
  async modifyTableTotalBill(tableNumber){
    const data=await Tables.findOne({tableNumber:Number(tableNumber)});
    const tableBill=data.tableOrder.map(item=>item.currentProductTotal).reduce((a,b)=>a+b,0);
    await Tables.findOneAndUpdate(
      {
        tableNumber: Number(tableNumber),
      },
      {
        tableBill
      },
      { runValidators: true, new: true }
    );
  },
  async getTables() {
    try {
      let tables = await Tables.find().sort("tableNumber");
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
    return query
  },

  async registerTables(numberOfTables) {
    for (let i = 1; i <= Number(numberOfTables.tables); i++) {
      let tables = await Tables.create({ tableNumber: i });
    }
  },
  async tableCurrentOrder(table) {
    let {tableOrder}= await Tables.findOne({
      tableNumber: Number(table.tableNumber),
    })
    if(tableOrder)return tableOrder;
    return []
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
    let currentTable  = await Tables.findOne({
      tableNumber: Number(table.tableNumber),
    });
    let product = await Products.findOne({
      _id: table.productId,
    });

    if(!currentTable || !product || !currentTable.tableOrder)return;

    let productQuantityToUpdate = currentTable.tableOrder.find(
      (item) => item.productId === table.productId
    );
    if(!productQuantityToUpdate)return
    switch (table.operator) {
      case "+":
        productQuantityToUpdate.productQuantity++;
        table.productQuantity = productQuantityToUpdate.productQuantity;
        table.productPrice= product.productPrice
        await this.modifyQuantityItems(table);
        break;
      case "-":
        if (productQuantityToUpdate.productQuantity > 1) {
          productQuantityToUpdate.productQuantity--;
          table.productQuantity = productQuantityToUpdate.productQuantity;
          table.productPrice= product.productPrice
          await this.modifyQuantityItems(table);
          break;
        }
        table.productQuantity = 1;
        table.productPrice= product.productPrice
        await this.modifyQuantityItems(table);
        break;
    }
  },
  async deleteSingleOrder(table) {
    let data = await Tables.findOneAndUpdate(
      {
        "tableNumber": Number(table.tableNumber),
      },
      {
        "$pull": {
          "tableOrder": { "productId": table.productId },
        },
      }
    );
    return this.modifyTableTotalBill(table.tableNumber)
  },
};
