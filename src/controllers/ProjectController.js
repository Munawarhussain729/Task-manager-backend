const mongoose = require('mongoose')
const ProjectModel = require('../models/ProjectModel')
const Users = require('../models/UserModel')
const Task = require('../models/TaskModel')

const createProject = async (req, res) => {
    try {
        const objectDetails = req?.body
        if (!objectDetails?.title || objectDetails?.title?.length === 0) {
            return res.status(400).json({ message: 'No project title found' })
        }
        const project = new ProjectModel(objectDetails)
        const savedProject = await project.save()
        res.status(200).json({ project: savedProject })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllProject = async (req, res) => {
    try {
        const projects = await ProjectModel.find()
        res.status(200).json({ projects: projects })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const getProjectDetails = async (req, res) => {
    try {
        const projectTitle = req?.body?.title
        const projects = await ProjectModel.find({ title: projectTitle })
        res.status(200).json({ projects: projects })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getProjectTasks = async (req, res) => {
    try {
        const Id = req?.params?.id
        if(!Id){
            return  res.status(400).json({ message: 'Project ID found' })
        }
        const projectId = new mongoose.Types.ObjectId(Id)
        const project = await ProjectModel.findById(projectId)
        if (!project) { 
            res.status(400).json({ message: 'Project not found' })
        }
        else {
            const tasks = await Task.find({ _id: { $in: project.tasks } })
            res.status(200).json({ tasks: tasks })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const addTask = async (req, res) => {
    try {
        const taskId = req?.body?.taskId
        const projectId = req?.body?.projectId
        const project = await ProjectModel.findById(projectId)
        if (project) {
            if (project.tasks.includes(taskId)) {
                res.status(200).json({ message: 'task already in project' })
            }
            else {
                const project = await ProjectModel.findByIdAndUpdate(projectId,
                    { $push: { tasks: taskId } },
                    { new: true })

                res.status(200).json({ project: project })
            }
        }
        else {
            res.status(400).json({ message: 'No project found' })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const addUser = async (req, res) => {
    try {
        const userId = req?.body?.userId
        const projectId = req?.body?.projectId

        const project = await ProjectModel.findById(projectId)
        if (!project) {
            return res.status(400).json({ message: 'No Project found' })
        }
        if (project?.users?.includes(userId)) {
            return res.status(400).json({ message: 'User already in project' })
        }
        const newProject = await ProjectModel.findByIdAndUpdate(projectId,
            { $push: { users: userId } },
            { new: true }
        )
        res.status(200).json({ project: newProject })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getProjectUsers = async (req, res) => {
    try {
        const Id = req?.params?.id
        if(!Id){
            return  res.status(400).json({ message: 'Project ID found' })
        }
        console.log("Inside project users");
        const projectId = new mongoose.Types.ObjectId(Id)
        const project = await ProjectModel.findById(projectId)
        if (!project) {
            res.status(400).json({ message: 'Project not found' })
        } else {
            const users = await Users.find({ _id: { $in: project.users } })
            res.status(200).json({ users: users })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    createProject,
    getAllProject,
    getProjectDetails,
    addTask,
    getProjectTasks,
    getProjectUsers,
    addUser
}