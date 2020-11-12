const express = require('express')
const router = express.Router()
const Student = require('../model/Student')
const User = require('../model/User')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')

router.post('/register', async (req, res) => {
    const {location, email, grade} = req.body
    const error = {message: 'Error in registering for workshop', error: 'Bad Request'}

    const userData = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        createdAt: new Date().toISOString()
    })
    
    await userData.save()
    .then( async user => {
        const studentData = new Student({
            userId: new mongoose.Types.ObjectId(user._id),
            grade: grade,
            location: location
        })
        await studentData.save()
        .then(doc => {
            const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: 86400 })
            res.status(200).send({ auth: true, token: token })
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send(error)
        })
    })
    .catch(err => {
        console.log('Error:', err)
        res.status(400).send(error)
    })
})

module.exports = router