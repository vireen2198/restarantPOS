const TablesModel = require('../models/Tables')

const getTables=async()=>{
    try {
        const tables=await TablesModel.find();
        return tables
    } catch (error) {
        return new Error(error)
    }
}
const registerTables=(numberOfTables)=>{
  
       
            
            
        
  
}
module.exports = {
    getTables,registerTables
}