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

module.exports = {
    createUser
}
