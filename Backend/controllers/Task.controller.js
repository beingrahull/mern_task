const {Task} = require("../models/task.model")

async function TaskUpdate(req, res, next) {
    try {
        const userId = req.user?._id || req.user?.id || req.user;
        const { Task: updatedTask } = req.body
        
        const newTask = await Task.create({
            Task: updatedTask,
            user: userId,
        });

        return res.status(200).json({
            message: "Task Updated",
            id: TaskUpdate._id,
            task: TaskUpdate.Task,
        });
    } catch (err) {
        console.log("Task update failed : ", err)
        next(err)
    }
}

module.exports = { TaskUpdate }
