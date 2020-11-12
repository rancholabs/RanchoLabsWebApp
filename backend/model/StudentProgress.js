const mongoose = require('mongoose')

const ClassSchema = {
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    quiz: {
        isCompleted: {
            type: Boolean,
            default: false
        },
        completedOn: Date,
        score: {
            type: Number,
            default: 0
        }
    }
}

const ProjectSchema = {
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    assignment: {
        isSubmitted: {
            type: Boolean,
            default: false
        },
        file: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File'
        },
        submittedOn: Date,
        score: {
            type: Number,
            default: 0
        }
    }
}

const InnovationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    brief: {
        type: String,
        required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    },
    components: [{
        type: String,
        required: true
    }],
    steps: [{
        no: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File'
        }
    }],
    conclusion: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }]
})

const StudentProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch'
    },
    learns: [ClassSchema],
    builds: [ProjectSchema],
    innovates: [InnovationSchema]
})

module.exports = mongoose.model('StudentProgress', StudentProgressSchema)