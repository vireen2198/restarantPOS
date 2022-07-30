let tablesDao = require('../daos/tablesDao');

module.exports = {
    async getTables() {
        return await tablesDao.getTables()
    },

    async getTable(params) {
        return await tablesDao.getTable(params)
    },
    async registerTables(tables) {
        let data = await tablesDao.registerTables(tables)
        return data

    }
}