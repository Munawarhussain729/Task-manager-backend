const express = require('express')
const UserController = require('../controllers/UserController')

const router = express.Router()

router.post('/create-user', UserController.createUser)
// router.put('/update-user:id')
router.get('/user-detail/:id', UserController.getUser)
router.get('/users', UserController.getAllUsers)

module.exports = router
