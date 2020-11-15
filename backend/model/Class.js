const mongoose = require('mongoose')

const ReferenceSchema = new mongoose.Schema({
    refType: {
        type: String,
        enum: ['link', 'text', 'file'],
        required: true
    },
    link: {
        type: String
    },
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    },
    text: {
        type: String
    }
})

const ResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    score: {
        type: Number,
        required: true
    }
})

const AttendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    present: {
        type: Boolean,
        default : false
    }
})

const MaterialsSchema = {
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    },
    quizLink: {
        type: String,
        required: true
    },
    references: [ReferenceSchema]
}

const ClassSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    classLink: String,
    classNo: {
        type: Number,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    materials: MaterialsSchema,
    //quizResults: [ResultSchema],
    //assignments: [ResultSchema],
    attendance: [AttendanceSchema]
})

module.exports = mongoose.model('Class', ClassSchema)