const express = require('express')
const router = express.Router()
const Course = require('../../model/Course')
const mongoose = require('mongoose')

router.post('/:id', async (req, res) => {
    const id = req.params.id
    let innovates = req.body ? req.body : []
    innovates = innovates.map((innovate, idx) => ({...innovate, image: mongoose.Types.ObjectId(innovate.image)}))
    const error = {message: 'Error in adding course innovates', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$push: {innovates: { $each : innovates}}})
    .then(course => {
        res.status(201).send({message: 'Course innovates added Succesfully'})
    })
    .catch(err => {
        console.log('Error:', err)
        res.status(400).send(error)
    })
})

router.put('/:id/:iid', async (req, res) => {
    const id = req.params.id
    const iid = req.params.iid
    const innovate = req.body
    const innovateUpdate = {}
    if(innovate && Object.keys(innovate).length > 0) {
        if (innovate.topic) 
            innovateUpdate["innovates.$.topic"] = innovate.topic
        if (innovate.description) 
            innovateUpdate["innovates.$.description"] = innovate.description
        if (innovate.image) 
            innovateUpdate["innovates.$.image"] = mongoose.Types.ObjectId(innovate.image)
        const error = {message: 'Error in updating course innovate', error: 'Bad Request'}
        Course.updateOne({_id: id, 'innovates._id': iid}, {$set: innovateUpdate}, (err, raw) => {
            if(err) {
                console.log(err)
                res.send(500).send(error)
            }
            else {
                const {nModified: n} = raw
                res.status(204).send({message: (n > 0) ? `Course innovate updated Succesfully` : 'No Changes detected'})
            }
        })
    }
    else {
        res.status(500).send({error: "Bad request"})
    }
})

router.delete('/:id/:iid', async (req, res) => {
    const id = req.params.id
    const iid = req.params.iid
    const error = {message: 'Error in deleting course innovate', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$pull: {innovates: {_id: iid}}}, (err, raw) => {
        if(err) {
            console.log(err)
            res.send(500).send(error)
        }
        else {
            const {nModified: n} = raw
            res.status(204).send({message: (n > 0) ? `Course innovate deleted Succesfully` : 'No Changes detected'})
        }
    })
})

module.exports = router