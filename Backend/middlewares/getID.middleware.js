const jwt=require("jsonwebtoken")


async function getID(req,res,next) {
    try{
        const token = req.cookies?.AccessToken
        if (!token){
            return res.status(401).json({"ID":"Token not found"})
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if (!decode) {
            return res.status(401).json({ status: "Invalid token" });
        }

        req.user = decode._id || decode.id || decode.userId;    
        if (!req.user) {
            console.log("Decoded token payload:", decode);
            return res.status(401).json({ status: "User ID missing in token" });
        }    
        next()

    }catch(err){
        console.log("Token cred failure : ",err)
        return res.status(401).json({
            "status":"Token-ID failed"
        })
    }
    

}


module.exports={getID}