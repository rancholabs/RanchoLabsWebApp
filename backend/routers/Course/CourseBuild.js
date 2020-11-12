const express = require('express')
const router = express.Router()
const Course = require('../../model/Course')
const mongoose = require('mongoose')

router.post('/:id', async (req, res) => {
    const id = req.params.id
    let builds = req.body ? req.body : []
    builds = builds.map((build, idx) => ({...build, image: mongoose.Types.ObjectId(build.image)}))
    const error = {message: 'Error in adding course builds', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$push: {builds: { $each : builds}}})
    .then(course => {
        res.status(201).send({message: 'Course builds added Succesfully'})
    })
    .catch(err => {
        console.log('Error:', err)
        res.status(400).send(error)
    })
})

router.put('/:id/:bid', async (req, res) => {
    const id = req.params.id
    const bid = req.params.bid
    const build = req.body
    const buildUpdate = {}
    if(build && Object.keys(build).length > 0) {
        if (build.topic) 
            buildUpdate["builds.$.topic"] = build.topic
        if (build.description) 
            buildUpdate["builds.$.description"] = build.description
        if (build.image) 
            buildUpdate["builds.$.image"] = mongoose.Types.ObjectId(build.image)
        const error = {message: 'Error in updating course build', error: 'Bad Request'}
        Course.updateOne({_id: id, 'learns._id': bid}, {$set: buildUpdate}, (err, raw) => {
            if(err) {
                console.log(err)
                res.send(500).send(error)
            }
            else {
                const {nModified: n} = raw
                res.status(204).send({message: (n > 0) ? `Course build updated Succesfully` : 'No Changes detected'})
            }
        })
    }
    else {
        res.status(500).send({error: "Bad request"})
    }
})

router.delete('/:id/:bid', async (req, res) => {
    const id = req.params.id
    const bid = req.params.bid
    const error = {message: 'Error in deleting course build', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$pull: {learns: {_id: bid}}}, (err, raw) => {
        if(err) {
            console.log(err)
            res.send(500).send(error)
        }
        else {
            const {nModified: n} = raw
            res.status(204).send({message: (n > 0) ? `Course build deleted Succesfully` : 'No Changes detected'})
        }
    })
})

module.exports = router