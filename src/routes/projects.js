const express = require('express')
const ProjectController = require('../controllers/ProjectController')

const router = express.Router()

router.post('/add-task', ProjectController.addTask)
router.post('/add-user', ProjectController.addUser)
router.post('/create', ProjectController.createProject)
router.get('/projects', ProjectController.getAllProject)
router.get('/get-project', ProjectController.getProjectDetails)
router.get('/project-tasks/:id', ProjectController.getProjectTasks)
router.get('/project-users/:id', ProjectController.getProjectUsers)

module.exports = router
