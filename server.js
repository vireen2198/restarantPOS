const express=require("express");
const app=express();
require("dotenv").config();
const port = process.env.PORT || 5000
//middlewares
app.use(express.json());
app.use(express.static("public"))
//start server fn
const startServer=async()=>{
    try {
        app.listen(port,()=>{
            console.log(`server started on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
startServer()
