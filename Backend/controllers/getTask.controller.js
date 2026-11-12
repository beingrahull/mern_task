const { Task } = require("../models/task.model");

async function allTask(req, res, next) {
    try {
        const userId = req.user?._id || req.user?.id || req.user;
        const finTasks = await Task.find({ user: userId });

        return res.status(200).json({
            tasks: finTasks,
        });
    } catch (err) {
        console.log("Error fetching the Tasks : ", err);
        next(err);
    }
}

module.exports = { allTask };
