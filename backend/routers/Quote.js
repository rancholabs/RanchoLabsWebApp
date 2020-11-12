const express = require('express')
const router = express.Router()
const Quote = require('../model/Quote')
const {getQuotes} = require('../Utils/Quote')
const isAuthenticated = require('../controller/requestAuthenticator')
const isAuthorized = require('../controller/requestAuthorizer')

router.get('/', async (req, res) => {
    const quotes = await getQuotes()
    res.status(200).send(quotes)
})

router.post('/', isAuthenticated, isAuthorized(['admin']), (req, res) => {
    const data = req.body? req.body : []
    Quote.insertMany(data)
    .then(quotes => {
        res.status(201).send({message: 'Quotes added successfully'})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({status: 'error', error: 'Error in adding quotes'})
    })
})

router.put('/:id', isAuthenticated, isAuthorized(['admin']), (req, res) => {
    const id = req.params.id
    if(req.body && Object.keys(req.body).length > 0) {
        const quote = req.body.quote
        const by = req.body.by
        const updateQuery = {}
        if(quote !== undefined) {
            updateQuery.quote = quote
        }
        if(by !== undefined) {
            updateQuery.by = by
        }
        Quote.updateOne({_id: id}, updateQuery, (err, raw) => {
            if(err) {
                console.log(err)
                res.status(500).send({message: 'error', error: 'Error in updating quote'})
            }
            else {
                const {nModified: n} = raw
                res.status(204).send({status: (n > 0) ? `Updated Successfully` : 'No Changes detected'})
            }
        })
    }
    else {
        res.status(500).send({message: 'error', error: 'Bad Request. Error in updating quote'})
    }
})

router.delete('/:id', isAuthenticated, isAuthorized(['admin']), (req, res) => {
    const error = {message: 'Error in deleting quote', error: 'Bad Request'}
    Quote.deleteOne({_id: id}, (err, raw) => {
        if(err) {
            console.log(error)
            res.send(500).send(error)
        }
        else {
            const {nModified: n} = raw
            res.status(204).send({message: (n > 0) ? `Quote deleted Succesfully` : 'No Changes detected'})
        }
    })
})

module.exports = router