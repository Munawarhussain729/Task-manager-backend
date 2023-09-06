const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    assignedTo: {
        type: Array
    },
    status: {
        type: String,
        default:'toDo'
    },
    dueDate: {
        type: Date
    },
    priority: {
        type: String
    },
    title: {
        type: String,
        require:true
    },
    description: {
        type: String
    }
})

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task