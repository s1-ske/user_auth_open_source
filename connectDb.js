const mongoose=require("mongoose");

const uri=process.env.URI

exports.connectDB=async(req,res)=>{
    mongoose.connect(uri)
    .then((res)=>{
        console.log(`DB connected sucessfully ${mongoose.connection.port}`)
    })
    .catch((error)=>{
        console.log(`connection failed to Db`)
    })
}