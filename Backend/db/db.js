const mongoose=require("mongoose")

async function connecttodb(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to db")
    }catch(error){
        console.log("Connection Failed : ",error)
    }
}

module.exports=connecttodb