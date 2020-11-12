const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    no: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }
})

module.exports = mongoose.model('Project', ProjectSchema)