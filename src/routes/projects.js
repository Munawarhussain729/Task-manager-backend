const express = require('express')
const ProjectController = require('../controllers/ProjectController')

const router = express.Router()

router.post('/create', ProjectController.createProject)
router.get('/projects', ProjectController.getAllProject)
router.get('/get-project', ProjectController.getProjectDetails)

module.exports = router
