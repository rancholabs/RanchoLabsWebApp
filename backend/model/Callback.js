const mongoose = require('mongoose')

const CallbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    receivedAt: Date
})

module.exports = mongoose.model('CallbackRequests', CallbackSchema)
