const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const respo=async(res,statuscode,message,data)=>{
    res.status(statuscode).json({
        message,
        data
    })
}


const hashPassword= async(password)=>{
    if(!password){
        throw new Error("password not found ")
    }
    const hashpass=await bcrypt.hash(password,10);
    return hashpass;
}

const comparePassword=async(password,hashpass)=>{
    const comparehash=await bcrypt.compare(password,hashpass);
    return comparehash;
}

const createToken=async(id)=>{
    const token=await jwt.sign({id,iet:Date.now()},process.env.SECRET);
    return token;
}

const verifyToken=async(id,secret)=>{
    if(!id || !secret){
        throw new Error("in valid cred")
    }
    const verify=await jwt.verify(id,secret);
    return verify;
}

module.exports={respo,hashPassword,comparePassword,createToken,verifyToken}