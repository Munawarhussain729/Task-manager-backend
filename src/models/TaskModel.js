const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    assignedTo: {
        type: Array
    },
    dueDate: {
        type: Date
    },
    priority: {
        type: String
    },
    description: {
        type: String
    }
})

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task