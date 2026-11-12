const jwt = require("jsonwebtoken")
const Newuser = require("../models/user.model")
const {Blacklist} = require("../models/logout.model")


async function CreateUser(req,res,next) {
    try{
        const {name,email,password} = req.body
        const existing=await Newuser.findOne({email})
        if (existing){
            return res.status(409).json({
            success: false,
            message: "An account with this email already exists",
            })
        }
        const newRegistration = await Newuser.create(
            {
                name,
                email,
                password
            })
        return res.status(201).json({
            "message":"User Created",
            "Name":name
        })
    }catch(err){
        console.log("Signup Failed : ",err);
        next(err)
    }
}

async function LoginValidator(req,res,next){
    try{
        const {email,password}=req.body
        const emailindb=await Newuser.findOne({email}).select("+password")
        if (!emailindb){
            return res.status(401).json({
                "message":"Invalid email or password"
            })
        }
        const passcode=await emailindb.comparePassword(password)
        if (!passcode){
            return res.status(402).json({
                "message":"Invalid credentials"
            })
        }

        const token=emailindb.GenerateToken()

        res.cookie("AccessToken",token,
            {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        return res.status(201).json({
            "message":"Access Granted",
            "Name":emailindb.name
        })
    }catch(err){
        console.log("Login Failed : ",err);
        next(err)
        
    }
}

async function Logout(req, res, next) {
    try {
        const token = req.cookies?.AccessToken || req.headers.authorization?.split(" ")[1];

        if (token) {
            const decode = jwt.decode(token);
            const expiresAt = decode?.exp
                ? new Date(decode.exp * 1000)
                : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

            await BlacklistModel.updateOne(
                { token },
                { $setOnInsert: { token, expiresAt, reason: "logout" } },
                { upsert: true }
            );
        }

        res.clearCookie("AccessToken", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { CreateUser, LoginValidator, Logout };