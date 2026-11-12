const mongoose=require("mongoose")

const blacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            expires: 0,
        },
        reason: {
            type: String,
            enum: ["logout", "revoked", "rotation"],
            default: "logout",
        },
    },
    { timestamps: true }
)

const Blacklist=mongoose.model("Blacklist",blacklistSchema)

module.exports={Blacklist}