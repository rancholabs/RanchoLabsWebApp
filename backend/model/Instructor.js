const mongoose = require('mongoose')

const InstructorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    password : String,
    domain: String,
    todolist : {
        type: String,
        default : null
    }
})

module.exports = mongoose.model('Instructor', InstructorSchema)