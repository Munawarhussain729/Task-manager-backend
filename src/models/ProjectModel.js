const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    name:{
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

const Projects = ProjectSchema.model('Projects', ProjectSchema)
module.exports = Projects