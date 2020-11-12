const mongoose = require('mongoose')

const CourseGroupSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }
})

module.exports = mongoose.model('CourseGroup', CourseGroupSchema)