const express = require('express')
const ProjectController = require('../controllers/ProjectController')

const router = express.Router()

router.post('/create', ProjectController.createProject)
router.get('/projects', ProjectController.getAllProject)

module.exports = router
