const express = require("express")
const{ connection } = require("./db")
const { router } = require("./routes/api.routes")
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

// swagger UI
// my requirements
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "PIONEER_LABS assignment",
        version: "1.0.0",
      },
      servers: [
        {
            url: "http://localhost:4400",
        },
        {
            url: "https://pioneer-labs-assignment-u346.onrender.com",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  // building OpenApi Specifications
  const openApiSpec = swaggerJsDoc(options);
  
  //Building complete UI
  app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.get("/",(req,res)=>{
    res.json("this is home")
})
app.use("/", router)

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