const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message : {
        type : String,
        required : true
    },
    receivedAt: Date
})

module.exports = mongoose.model('Message', MessageSchema)
