const mongoose = require('mongoose')
const ProjectModel = require('../models/ProjectModel')

const createProject = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    createProject
}