const express=require("express");
const { createUser, loginUser, updatePassword, forgetPassword, validatePassword } = require("../controllers/user_controllers");
const { Authentication } = require("../middleware/Auth");
const router=express.Router();


router.post("/signup",createUser);
router.post("/login",loginUser)
router.post("/update",Authentication,updatePassword)
router.post("/forget",forgetPassword)
router.post("/validate",validatePassword)

module.exports=router;