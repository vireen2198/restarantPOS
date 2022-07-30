let Tables = require('../models/Tables')

module.exports = {
    async getTables() {
        try {
            let tables = await Tables.find();
            return tables
        } catch (error) {
            return new Error(error)
        }
    },

    async getTable(params) {
            // let tables = await Tables.find({"tableNumber" : params.tableNumber});
            // return tables
            let pipeline = [] 
            pipeline.push({
                $match: {
                    tableNumber: Number(params.tableNumber)
                }
            },{
                $unwind: {
                    path: "$tableOrder"  
                }
            },{
                $project: {
                    tableNumber: "$tableNumber",
                    productQuantity: "$tableOrder.quantity",
                    productId: "$tableOrder.productId",
                }
            })
            let query = await Tables.aggregate(pipeline).allowDiskUse(true)
            console.log(query)
    },

    async registerTables(numberOfTables) {

        for (let i = 1 ; i <= numberOfTables.tables ; i++){
            let tables = await Tables.create({'tableNumber' : i})
            console.log(tables)
        }
        

    }
}