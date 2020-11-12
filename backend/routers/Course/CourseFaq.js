const express = require('express')
const router = express.Router()
const Course = require('../../model/Course')
const mongoose = require('mongoose')

router.post('/:id', async (req, res) => {
    const id = req.params.id
    let faqs = req.body ? req.body : []
    const error = {message: 'Error in adding course faqs', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$push: {faqs: { $each : faqs}}})
    .then(course => {
        res.status(201).send({message: 'Course faqs added Succesfully'})
    })
    .catch(err => {
        console.log('Error:', err)
        res.status(400).send(error)
    })
})

router.put('/:id/:fid', async (req, res) => {
    const id = req.params.id
    const fid = req.params.fid
    const faq = req.body
    const faqUpdate = {}
    const error = {message: 'Error in updating course faq', error: 'Bad Request'}
    if(faq && Object.keys(faq).length > 0) {
        if (faq.question) 
            faqUpdate["faqs.$.question"] = faq.question
        if (faq.answer) 
            faqUpdate["faqs.$.answer"] = faq.answer
        Course.updateOne({_id: id, 'faqs._id': fid}, {$set: faqUpdate}, (err, raw) => {
            if(err) {
                console.log(error)
                res.send(500).send(error)
            }
            else {
                const {nModified: n} = raw
                res.status(204).send({message: (n > 0) ? `Course faq updated Succesfully` : 'No Changes detected'})
            }
        })
    }
    else {
        res.status(500).send(error)
    }
})

router.delete('/:id/:fid', async (req, res) => {
    const id = req.params.id
    const fid = req.params.fid
    const error = {message: 'Error in deleting course learn', error: 'Bad Request'}
    Course.updateOne({_id: id}, {$pull: {faqs: fid}}, (err, raw) => {
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