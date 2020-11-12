const express = require('express')
const router = express.Router()
const Course = require('../../model/Course')

router.post('/:id', async (req, res) => {
    const id = req.params.id
    const learns = req.body ? req.body : []
    const error = {message: 'Error in adding course learns', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$push: {learns: { $each : learns}}})
    .then(course => {
        res.status(201).send({message: 'Course learns added Succesfully'})
    })
    .catch(err => {
        console.log('Error:', err)
        res.status(400).send(error)
    })
})

router.put('/:id/:lid', async (req, res) => {
    const id = req.params.id
    const lid = req.params.lid
    const learn = req.body
    const learnUpdate = {}
    const error = {message: 'Error in updating course learn', error: 'Bad Request'}
    if(learn && Object.keys(learn).length > 0) {
        if (learn.topic) 
            learnUpdate["learns.$.topic"] = learn.topic
        if (learn.description) 
            learnUpdate["learns.$.description"] = learn.description
        Course.updateOne({_id: id, 'learns._id': lid}, {$set: learnUpdate}, (err, raw) => {
            if(err) {
                console.log(error)
                res.send(500).send(error)
            }
            else {
                const {nModified: n} = raw
                res.status(204).send({message: (n > 0) ? `Course learn updated Succesfully` : 'No Changes detected'})
            }
        })
    }
    else {
        res.status(500).send(error)
    }
})

router.delete('/:id/:lid', async (req, res) => {
    const id = req.params.id
    const lid = req.params.lid
    const error = {message: 'Error in deleting course learn', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$pull: {learns: {_id: lid}}}, (err, raw) => {
        if(err) {
            console.log(error)
            res.send(500).send(error)
        }
        else {
            const {nModified: n} = raw
            res.status(204).send({message: (n > 0) ? `Course learn deleted Succesfully` : 'No Changes detected'})
        }
    })
})

module.exports = router