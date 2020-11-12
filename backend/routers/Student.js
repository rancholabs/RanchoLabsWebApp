const express = require('express')
const router = express.Router()
const Student = require('../model/Student')
const isAuthenticated = require('../controller/requestAuthenticator')
const isAuthorized = require('../controller/requestAuthorizer')
const mongoose = require('mongoose')

router.post('/', isAuthenticated, isAuthorized(['student']), async (req, res) => {
    const info = Object.keys(req.body)
    try {
        var student = await Student.findOne({ userId: req.userId })
        if(student) {
            info.forEach((update) => student[update] = req.body[update])
            await student.save()
            res.status(201).send('Student information updated')
        }
        else {
            const reqData = req.body
            reqData.userId = mongoose.Types.ObjectId(req.userId)
            student = new Student(reqData)
            await student.save()
            .then(student => {
                res.status(201).send('Student information added successfully')
            })
            .catch(err => {
                res.status(400).send('Error in adding student information')
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).send('Error in updating student information')
    }
})

router.get('/', isAuthenticated, isAuthorized(['student']), async (req, res) => {
    try{
        const student = await Student.findOne({userId : req.userId})
        if(student){
            res.status(201).send({loginfor : student.loginfor, freeEnrollment : student.freeEnrollment})

        }
        else{
            res.status(400).send('Student not found')
        }
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

module.exports = router