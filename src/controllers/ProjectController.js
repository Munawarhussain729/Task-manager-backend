const mongoose = require('mongoose')
const ProjectModel = require('../models/ProjectModel')

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
        console.log("Project title is ", projectTitle);
        const projects = await ProjectModel.find({title:projectTitle})
        res.status(200).json({ projects: projects })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports = {
    createProject,
    getAllProject,
    getProjectDetails,
}