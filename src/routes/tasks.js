const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

router.post('/create-task', TaskController.createTask)
router.put('/udpate-priority', TaskController.updatePriority)
router.put('/udpate-status', TaskController.updateStatus)
router.put('/update-task', TaskController.updateTaskDetails)
router.get('/get-tasks', TaskController.FetchAllTasks)
router.delete('/remove-task/:id', TaskController.RemoveTask)

module.exports = router
