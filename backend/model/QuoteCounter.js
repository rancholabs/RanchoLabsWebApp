const mongoose = require('mongoose')

const QuoteCounterSchema = new mongoose.Schema({
    counter: {
        type: Number,
        default: 0
    },
    updatedDate: Date
})

module.exports = mongoose.model('QuoteCounter', QuoteCounterSchema)