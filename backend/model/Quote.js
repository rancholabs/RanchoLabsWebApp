const mongoose = require('mongoose')

const QuoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true
    },
    by: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Quote', QuoteSchema)