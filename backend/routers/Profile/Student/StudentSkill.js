const express = require('express')
const router = express.Router()
const StudentProfile = require('../../../model/StudentProfile')
const isAuthenticated = require('../../../controller/requestAuthenticator')
const isAuthorized = require('../../../controller/requestAuthorizer')

router.post('/', isAuthenticated, isAuthorized(['student']), async (req, res) => {
    const reqData = req.body
    try {
        let studentProfile = await StudentProfile.findOne({ userId: req.userId })
        if(studentProfile) {
            studentProfile.skills = reqData
            await studentProfile.save()
            .then(studentProfile => {
                res.status(201).send({message: 'Student skills updated successfully'})
            })
            .catch(err => {
                console.log(err)
                res.status(400).send('Error in updating student skills')
            })
        }
        else {
            studentProfile = new StudentProfile({
                userId: mongoose.Types.ObjectId(req.userId),
                skills: reqData
            })
            await studentProfile.save()
            .then(studentProfile => {
                res.status(201).send({message: 'Student skills added successfully'})
            })
            .catch(err => {
                console.log(err)
                res.status(400).send('Error in adding student skills')
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).send('Error in updating student skills')
    }
})

module.exports = router