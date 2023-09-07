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
        console.log("Got an ID ", req.body?._id);
        console.log("Got priority  ", req.body?.priority);
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

const updateStatus = async (req, res) => {
    try {
        const taskId = req.body?._id;
        const newStatus = req.body?.status;
        if (!taskId || !newStatus) {
            return res.status(400).json({ message: 'Missing parameter _id or priority' })
        }
        const objectIdTaskId = new mongoose.Types.ObjectId(taskId)
        const updatedTask = await Task.findByIdAndUpdate(objectIdTaskId, { status: newStatus }, { new: true })
        if (!!updatedTask) {
            return res.status(200).json({ message: "User updated successfully" })
        }
        return res.status(400).json({ message: 'User not found' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const updateTaskDetails = async (req, res) => {
    try {
        const taskId = req.body?._id;
        const newDetails = req.body?.details;
        if (!taskId || !newDetails) {
            return res.status(400).json({ message: 'Missing parameter _id or priority' })
        }
        console.log("Inside the route");
        const objectIdTaskId = new mongoose.Types.ObjectId(taskId)
        const updatedTask = await Task.findByIdAndUpdate(objectIdTaskId,
            { $set: newDetails },
            { new: true })

        if (!!updatedTask) {
            return res.status(200).json({ message: "User updated successfully" })
        }
        return res.status(400).json({ message: 'User not found' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const FetchAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find()
        if (!!allTasks) {
            return res.status(200).json({ allTasks: allTasks })
        }
        return res.status(200).json({ message: 'No Task found' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = {
    createTask,
    updatePriority,
    FetchAllTasks,
    updateStatus,
    updateTaskDetails
}