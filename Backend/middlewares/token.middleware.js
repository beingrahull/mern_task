const jwt=require("jsonwebtoken")
const {Blacklist} = require("../models/logout.model")

const CheckSignature = async function(req,res,next) {
    try{
        const token = req.cookies?.token
        if (!token) {
            return res.status(404).json({
                "Access Denied":"Signature Tampered"
            })
        }

        const BlacklistToken = await Blacklist.exists({token})
        if (BlacklistToken){
            return res.status(401).json({
                "message":"Token Blacklisted"
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        
        req.user=decode
        next()
    }catch(err){
        console.log("Signature doesn't match : ",err);
        return res.status(401).json({
            "message":"Signature Compromised"
        })
        
    }
    
}

module.exports={CheckSignature}