const express = require("express")
const router = express.Router()
const {getID} = require("../middlewares/getID.middleware")
const {TaskUpdate} = require("../controllers/Task.controller")
const { allTask } = require("../controllers/getTask.controller")

router.post("/submitTask",getID,TaskUpdate)
router.get("/getTask",getID,allTask)

module.exports=router