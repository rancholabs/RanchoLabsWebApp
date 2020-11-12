const express = require('express')
const router = express.Router()
const Course = require('../../model/Course')
const mongoose = require('mongoose')

router.post('/:id', async (req, res) => {
    const id = req.params.id
    let reviews = req.body ? req.body : []
    const error = {message: 'Error in adding course reviews', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$push: {reviews: { $each : reviews}}})
    .then(course => {
        res.status(201).send({message: 'Course reviews added Succesfully'})
    })
    .catch(err => {
        console.log('Error:', err)
        res.status(400).send(error)
    })
})

router.put('/:id/:rid', async (req, res) => {
    const id = req.params.id
    const rid = req.params.rid
    const review = req.body
    const reviewUpdate = {}
    const error = {message: 'Error in updating course review', error: 'Bad Request'}
    if(review && Object.keys(review).length > 0) {
        if (review.name) 
            reviewUpdate["reviews.$.name"] = review.name
        if (review.grade) 
            reviewUpdate["reviews.$.grade"] = review.grade
        if (review.school) 
            reviewUpdate["reviews.$.school"] = review.school
        if (review.review) 
            reviewUpdate["reviews.$.review"] = review.review
        Course.updateOne({_id: id, 'reviews._id': rid}, {$set: reviewUpdate}, (err, raw) => {
            if(err) {
                console.log(err)
                res.send(500).send(error)
            }
            else {
                const {nModified: n} = raw
                res.status(204).send({message: (n > 0) ? `Course review updated Succesfully` : 'No Changes detected'})
            }
        })
    }
    else {
        res.status(500).send(error)
    }
})

router.delete('/:id/:rid', async (req, res) => {
    const id = req.params.id
    const rid = req.params.rid
    const error = {message: 'Error in deleting course innovate', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$pull: {reviews: {_id: rid}}}, (err, raw) => {
        if(err) {
            console.log(err)
            res.send(500).send(error)
        }
        else {
            const {nModified: n} = raw
            res.status(204).send({message: (n > 0) ? `Course review deleted Succesfully` : 'No Changes detected'})
        }
    })
})

module.exports = router