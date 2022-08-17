
let transactionDao = require("../daos/transactionDao");

module.exports = {
  async addPreviousTransactions(params) {
    return await transactionDao.addPreviousTransactions(params);
  }
}