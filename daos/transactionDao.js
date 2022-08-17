let Transaction=require("../models/Transaction");
let Tables=require("../models/Tables")
module.exports={
    async addPreviousTransactions(params){
       let data = await Tables.findOne({tableNumber:Number(params.tableNumber)});
       if(!data)return 
       if(!data.tableOrder||!data.tableOrder.length)return
       const {tableNumber,tableOrder,tableBill,totalToPay}=data;
       await Transaction.create({tableNumber,tableOrder,tableBill,totalPaid:totalToPay,waiterName:params.username});
       await Tables.findOneAndUpdate({tableNumber:Number(params.tableNumber)},{tableOrder:[],tableBill:0,totalToPay:0},{runValidators:true});
       return
    }
}