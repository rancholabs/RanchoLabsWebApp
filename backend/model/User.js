const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        first: {
            type: String,
            default: null
        },
        last: {
            type: String,
            default: null
        }
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mode: {
        type: String,
        enum: ['normal', 'google', 'facebook'],
        default: 'normal'
    },
    mobileNo: {
        code: String,
        number: String
    },
    profilePic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    },
    password: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'student', 'instructor'],
        default: 'student'
    },
    createdAt: Date
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)