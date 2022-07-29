let {getTables:getTablesDao,registerTables:registerTablesDao} = require('../daos/tablesDao');
const getTables=async()=>{
    try {
        return await getTablesDao()
    } catch (error) {
        return new Error(error)
    }
}
const registerTables=async()=>{
    try {
        return await registerTablesDao(10)
    } catch (error) {
        return new Error(error)
    }
}
module.exports = {

    getTables,registerTables
}