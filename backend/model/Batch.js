const mongoose = require('mongoose')

const ClassSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    startTime: Date,
    endTime: Date,
    quizDeadline: Date,
    instructorNote : [String],
    materials : {
        link : {
            type :  Boolean,
            default : false
        },
        slides : {
            type :  Boolean,
            default : false
        },
        assignments : {
            type :  Boolean,
            default : false
        },
        quiz : {
            type :  Boolean,
            default : false
        }
    }
})

const ProjectSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    deadline: Date
})

const BatchSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    instructor : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor' 
    },
    name : String,
    classes: [ClassSchema],
    projects: [ProjectSchema],
})

module.exports = mongoose.model('Batch', BatchSchema)