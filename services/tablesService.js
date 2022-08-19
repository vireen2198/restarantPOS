let tablesDao = require("../daos/tablesDao");
let userService=require("./userService")
module.exports = {
  async getTables() {
    return await tablesDao.getTables();
  },

  async registerTables(tables) {
    const data=await userService.sendUser(tables.userId);
    if(!data.isAdmin)throw new Error("you do not have enough permission!!! admin assistance required")
    await tablesDao.registerTables(tables);
    return data;
  },
  async tableCurrentOrder(tableNumber) {
    let data = await tablesDao.tableCurrentOrder(tableNumber);
    return data;
  },
  async addTableCurrentOrder(tableNumber) {
    let data = await tablesDao.addTableCurrentOrder(tableNumber);
    return data;
  },
  async modifyTableCurrentOrderItemQuantity(tableNumber) {
    let data = await tablesDao.modifyTableCurrentOrderItemQuantity(tableNumber);
    return data;
  },
  async deleteSingleOrder(table) {
    let data = await tablesDao.deleteSingleOrder(table);
    return data;
  },
};
