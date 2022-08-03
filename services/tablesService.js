let tablesDao = require("../daos/tablesDao");

module.exports = {
  async getTables() {
    return await tablesDao.getTables();
  },

  async registerTables(tables) {
    let data = await tablesDao.registerTables(tables);
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
