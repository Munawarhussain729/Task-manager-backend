const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    }
})

const Users = mongoose.model('Users', UserSchema)
module.exports = Users