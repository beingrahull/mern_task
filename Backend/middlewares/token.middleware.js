const jwt=require("jsonwebtoken")

const CheckSignature = async function(req,res,next) {
    try{
        const token = req.cookie?.token
        if (!token) {
            return res.status(404).json({
                "Access Denied":"Signature Tampered"
            })
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET)
        
        req.user=decode
        next()
    }catch(err){
        console.log("Signature doesn't match : ",err);
        return res.status(404).json({
            "message":"Signature Compromised"
        })
        
    }
    
}

module.exports={CheckSignature}