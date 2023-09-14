const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/UserModel');
const Task = require('../models/TaskModel');

const createUser = async (req, res) => {
    const saltRound = 10;
    try {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailPattern.test(req?.body?.email)) {
            const existingUser = await User.findOne({ email: req.body.email });

            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
            const password = req.body?.password
            const encryptedPass = await bcrypt.hash(password, saltRound)
            const userDetail = { ...req.body, password: encryptedPass }

            const newUser = new User(userDetail)
            await newUser.save()
            res.status(200).json({ message: "User created successfuly" })
        }
        else {
            res.status(400).json({ message: "Invalid Email address" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        if (!!allUsers) {
            return res.status(200).json({ users: allUsers })
        }
        res.status(200).json({ message: "No User found" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req?.params?.id
        if (!userId) {
            return res.status(400).json({ message: "No user found" })
        }
        const userObjectId = new mongoose.Types.ObjectId(userId)
        const user = await User.findById(userObjectId)
        if (!!user) {
            res.status(200).json({ user: user })
        }
        else {
            res.status(400).json({ message: "User does not exists" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const validateUser = async (req, res) => {
    try {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailPattern.test(req?.body?.email)) {
            const existingUser = await User.findOne({ email: req.body.email });

            if (!existingUser) {
                return res.status(400).json({ message: 'No user found' });
            }
            const userValid = await bcrypt.compare(req?.body?.password, existingUser?.password )
            if (userValid) {
                return res.status(200).json({ userProfile: existingUser })
            }
            res.status(400).json({ message: "Invalid password" })
        }
        else {
            res.status(400).json({ message: "Invalid Email address" })
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid user name or password' })
    }
}

const getMyTask = async (req, res) => {
    try {
        const userId = req?.params?.id
    
        // const userId = new mongoose.Types.ObjectId(id)
        // console.log("User id it became ", userId);
        if(userId){
            const userTasks = await Task.find({ assignedTo: userId });
            return res.status(200).json({ userTasks });
        }
        else{
            res.status(400).json({ message: "Usernot found" })
        }

    } catch (error) {
        res.status(400).json({ message: 'Error in finding task' })
    }
}
module.exports = {
    createUser,
    getAllUsers,
    getUser,
    validateUser,
    getMyTask
}
