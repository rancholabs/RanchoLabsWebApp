const mongoose = require('mongoose')

const PaymentSchema = {
    paymentId: {
        type: String,
        default: null
    },
    orderId: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        default: null
    }
}

const StudentCourseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch'
    },
    payment: PaymentSchema

})

module.exports = mongoose.model('StudentCourse', StudentCourseSchema)