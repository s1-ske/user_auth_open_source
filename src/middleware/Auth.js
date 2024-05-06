const User=require("../model/user_model");
const {verifyToken}=require("../utils/utils")

exports.Authentication=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        throw new Error("token not found")
    }
    const data=await verifyToken(token,process.env.SECRET)
    console.log(data)
    if(!data){
        throw new Error("data not found")
    }
    const id=data.id;
    console.log(id)
    const user=await User.findById(id);
    if(!user){
        throw new Error("user not found");
    }
    console.log(user)
    req.user=user;
    next(); 
}
