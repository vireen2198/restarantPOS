let transactionServices=require("../services/transactionService")
module.exports={
    async addPreviousTransactions(req,res){
        try {

            let data=await transactionServices.addPreviousTransactions({...req.params,...req.user})
            return res.status(200).json({message:"successfully added transaction"})
        } catch (error) {
            return res.status(500).json({error,message:"something went wrong!!! please try again later"})
        }
    }
}