const express=require("express");
const {getTables:getTablesServices,registerTables:registerTablesServices}=require("../services/tablesService");
const getTables=async(req,res)=>{
    try {
        const tables=await getTablesServices();
        if(!tables.length)return res.status(400).json({message:"you do not have any tables listed yet"});
        return res.status(400).json({tables,message:"tables retrieved successfully"})

    } catch (error) {
       return res.status(500).json({error,message:"something went wrong!!! please try again later"})
    }
}
const registerTables=async(req,res)=>{
    try {
        const {tables}=req.query;
        await registerTablesServices(tables);
        return res.status(201).json({message:"tables successfully added"})
    }catch (error) {
        console.log(error)
    }
}
module.exports={
    getTables,registerTables
}