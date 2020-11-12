const express = require('express')
const router = express.Router()
const Course = require('../../model/Course')
const mongoose = require('mongoose')

router.post('/:id', async (req, res) => {
    const id = req.params.id
    let instructors = req.body ? req.body : []
    instructors = instructors.map((instructor, idx) => mongoose.Types.ObjectId(instructor))
    const error = {message: 'Error in adding course instructors', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$push: {instructors: { $each : instructors}}})
    .then(course => {
        res.status(201).send({message: 'Course instructors added Succesfully'})
    })
    .catch(err => {
        console.log('Error:', err)
        res.status(400).send(error)
    })
})

router.delete('/:id/:iid', async (req, res) => {
    const id = req.params.id
    const iid = req.params.iid
    const error = {message: 'Error in deleting course learn', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$pull: {instructors: iid}}, (err, raw) => {
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