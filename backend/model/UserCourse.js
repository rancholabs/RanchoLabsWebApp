const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    paid: {
        type: Boolean,
        required: true
    },
    transactionId: {
        type: String,
        default: ''
    }
})

const UserCourseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch'
    },
    payment: PaymentSchema

})

module.exports = mongoose.model('UserCourse', UserCourseSchema)