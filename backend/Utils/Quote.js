const Quote = require('../model/Quote')
const QuoteCounter = require('../model/QuoteCounter')

const getQuotes = async () => {
    return await Quote.find({})
    .select({__v: 0})
    .sort({_id: 1})
    .exec()
    .then(quotes => quotes)
    .catch(err => [])
}

const getQuoteCounter = async () => {
    return await QuoteCounter.find({})
    .select({_id: 0, __v: 0})
    .exec()
    .then(quotecounters => quotecounters.length === 1 ? quotecounters[0]: {counter: -1, updatedDate: null})
    .catch(err => ({counter: -1, updatedDate: null}))
}

const getQuote = async () => {
    const prevValue = await getQuoteCounter()
    const quotes = await getQuotes()
    const quotesLength = quotes.length
    const date = new Date()
    const prevDate = prevValue.updatedDate ? new Date(prevValue.updatedDate) : null
    let newCounter = prevValue.counter
    if(quotesLength > 0) {
        if(!prevDate || date.getDate() !== prevDate.getDate()) {
            const newValue = (newCounter + 1) % quotesLength
            newCounter = await QuoteCounter.updateMany({}, {counter: newValue, updatedDate: date.toISOString()}, {upsert: true})
            .then(doc => newValue)
            .catch(err => prevValue.counter)
        }
        return quotes[newCounter]
    }
    else {
        return {}
    }

}

module.exports = {getQuotes, getQuote}