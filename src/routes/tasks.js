const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

router.post('/create-task', TaskController.createTask)
router.put('/udpate-priority', TaskController.updatePriority)

module.exports = router
