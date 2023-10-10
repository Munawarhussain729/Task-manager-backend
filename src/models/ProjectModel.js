const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    title:{
        type:String,
        require,
    },
    description:{
        type:String,
    },
    users:{
        type:Array
    },
    tasks:{
        type:Array
    }
})

const Projects = mongoose.model('Projects', ProjectSchema)
module.exports = Projects