const mongoose = require('mongoose')
const User = require('../models/UserModel')

const createUser = async (req, res) => {
    try {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailPattern.test(req?.body?.email)) {
            const existingUser = await User.findOne({ email: req.body.email });

            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use' });
            }

            const newUser = new User(req?.body)
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
        console.log("All users are ", allUsers);
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
        console.log("user id found ", userId);
        if (!userId) {
            return res.status(400).json({ message: "No user found" })
        }
        const userObjectId = new mongoose.Types.ObjectId(userId)
        const user = await User.findById(userObjectId)
        console.log("User exists ", user);
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

module.exports = {
    createUser,
    getAllUsers,
    getUser
}
