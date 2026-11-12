const express=require("express")
const router=express.Router()


const {SignupRules,SignupValidation}=require("../middlewares/registration.middleware")
const {CreateUser, LoginValidator, Logout}=require("../controllers/user.controller")

router.post("/signup",SignupRules,SignupValidation,CreateUser)
router.post("/login",LoginValidator)
router.post("/logout",Logout)


module.exports=router