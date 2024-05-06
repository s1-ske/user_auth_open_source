const {Schema,model}=require("mongoose");


const user=new Schema({
    email:{
        type:String,
        require:[true,"please enter the email"]
    },
    password:{
        type:String,
        require:[true,"please enter the password"]
    }
})


module.exports=new model("user",user);