const express = require('express')
const router = express.Router()
const Course = require('../../model/Course')

router.post('/:id', async (req, res) => {
    const id = req.params.id
    const outcomes = req.body ? req.body : []
    const error = {message: 'Error in adding course outcomes', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$push: {outcomes: { $each : outcomes}}})
    .then(course => {
        res.status(201).send({message: 'Course outcomes added Succesfully'})
    })
    .catch(err => {
        console.log('Error:', err)
        res.status(400).send(error)
    })
})

router.put('/:id/:oid', async (req, res) => {
    const id = req.params.id
    const oid = req.params.oid
    const outcome = req.body
    const outcomeUpdate = {}
    const error = {message: 'Error in updating course outcome', error: 'Bad Request'}
    if(outcome && Object.keys(outcome).length > 0) {
        if (outcome.outcome) 
            outcomeUpdate["outcomes.$.outcome"] = outcome.outcome
        Course.updateOne({_id: id, 'outcomes._id': oid}, {$set: outcomeUpdate}, (err, raw) => {
            if(err) {
                console.log(error)
                res.send(500).send(error)
            }
            else {
                const {nModified: n} = raw
                res.status(204).send({message: (n > 0) ? `Course outcome updated Succesfully` : 'No Changes detected'})
            }
        })
    }
    else {
        res.status(500).send(error)
    }
})

router.delete('/:id/:oid', async (req, res) => {
    const id = req.params.id
    const oid = req.params.oid
    const error = {message: 'Error in deleting course outcome', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$pull: {learns: {_id: oid}}}, (err, raw) => {
        if(err) {
            console.log(error)
            res.send(500).send(error)
        }
        else {
            const {nModified: n} = raw
            res.status(204).send({message: (n > 0) ? `Course outcome deleted Succesfully` : 'No Changes detected'})
        }
    })
})

module.exports = router