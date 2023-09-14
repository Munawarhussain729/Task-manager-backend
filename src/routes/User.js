const express = require('express')
const UserController = require('../controllers/UserController')

const router = express.Router()

router.post('/create-user', UserController.createUser)
router.post('/validate-user', UserController.validateUser)
// router.put('/update-user:id')
router.get('/user-detail/:id', UserController.getUser)
router.get('/users', UserController.getAllUsers)
router.get('/my-tasks/:id', UserController.getMyTask)

module.exports = router
