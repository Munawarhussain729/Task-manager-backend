const mongoose = require('mongoose')
const Task = require('../models/TaskModel')

const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body)
        const savedTask = await newTask.save()
        res.status(200).json(savedTask)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updatePriority = async (req, res) => {
    try {
        const taskId = req.body?._id;
        const newPriority = req.body?.priority;
        if (!taskId || !newPriority) {
            return res.status(400).json({ message: 'Missing parameter _id or priority' })
        }
        const objectIdTaskId = new mongoose.Types.ObjectId(taskId)
        const updatedTask = await Task.findByIdAndUpdate(objectIdTaskId, { priority: newPriority }, { new: true })
        if (!!updatedTask) {
            return res.status(200).json({ message: "User updated successfully" })
        }
        return res.status(400).json({ message: 'User not found' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = {
    createTask,
    updatePriority
}