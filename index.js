const app=require("./app");
const { connectDB } = require("./connectDb");



const port=process.env.PORT;

connectDB();

app.listen(port,()=>{
    console.log(`your server is working at ${port}`)
})