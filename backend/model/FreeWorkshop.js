const mongoose = require('mongoose')

const FreeWorkshopSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    createdAt: Date
})

module.exports = mongoose.model('FreeWorkshop', FreeWorkshopSchema)