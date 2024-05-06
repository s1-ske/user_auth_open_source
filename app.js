const express=require("express");
const router = require("./src/routes/user_routes");
const app=express();
require("dotenv").config();

app.use(express.json());
app.use("/api/v1",router);



module.exports=app;
