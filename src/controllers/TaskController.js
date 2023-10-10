const mongoose = require('mongoose')
const Task = require('../models/TaskModel')

const createTask = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No title found' })
        }
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
            return res.status(200).json({ updatedTask: updatedTask })
        }
        return res.status(400).json({ message: 'Task not found' })
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
            return res.status(200).json({ updatedTask: updatedTask })
        }
        return res.status(400).json({ message: 'Task not found' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const updateTaskDetails = async (req, res) => {
    try {
        const taskId = req.body?._id;
        let newDetails = req.body?.details;
        if (!taskId || !newDetails) {
            return res.status(400).json({ message: 'Missing parameter _id or priority' })
        }
        // newDetails?.assignTo = new mongoose.Types.ObjectId(newDetails?.assignTo)

        const objectIdTaskId = new mongoose.Types.ObjectId(taskId)
        const updatedTask = await Task.findByIdAndUpdate(objectIdTaskId,
            { $set: newDetails },
            { new: true })

        if (!!updatedTask) {
            return res.status(200).json({ updatedTask: updatedTask })
        }
        return res.status(400).json({ message: 'Task not found' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const FetchAllTasks = (req, res) => {
    const stream = Task.find().stream();

    stream.on('data', (task) => {
        // Send each task as it's retrieved
        res.write(JSON.stringify({ task }) + '\n');
    });

    stream.on('end', () => {
        // End the response when all data is sent
        res.end();
    });

    stream.on('error', (error) => {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    });
};


const RemoveTask = async (req, res) => {
    try {
        const taskId = req?.params?.id
        const objectTaskId = new mongoose.Types.ObjectId(taskId)
        const allTasks = await Task.findOneAndDelete(objectTaskId)
        if (!!allTasks) {
            return res.status(200).json({ allTasks: allTasks })
        }
        return res.status(400).json({ message: 'No Task found' })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = {
    createTask,
    updatePriority,
    FetchAllTasks,
    updateStatus,
    updateTaskDetails,
    RemoveTask
}