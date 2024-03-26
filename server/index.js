const express = require("express")
const{ connection } = require("./db")


const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.json("this is home")
})


app.listen(4400, async()=>{
    try{
        await connection
        console.log("connection to database is complete")
        console.log("server is running on 4400 port")
    }
    catch(err){
        console.log(err)
    }
})