const mongoose = require("mongoose")

const Taskschema = new mongoose.Schema({
    Task:{
        type:String,
        minlength:10,
        required:[true,"Task is a required field"]
    },
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
)

const Task = mongoose.model("Task",Taskschema)

module.exports={Task}