const express = require('express')
const router = express.Router()
const StudentProfile = require('../../../model/StudentProfile')
const isAuthenticated = require('../../../controller/requestAuthenticator')
const isAuthorized = require('../../../controller/requestAuthorizer')
const mongoose = require('mongoose')
const User = require('../../../model/User')
const {getFilePath} = require('../../../Utils/File')

router.get('/:id', async (req, res) => {
    StudentProfile.findOne({'innovations._id': mongoose.Types.ObjectId(req.params.id)})
    .select({userId: 1, innovations: {$elemMatch: {_id: mongoose.Types.ObjectId(req.params.id)}}})
    .exec()
    .then(async profileData => {
        if(profileData && profileData.innovations && profileData.innovations[0]) {
            let innovation = profileData.innovations[0]

            if(innovation.header && innovation.header.image) {
                innovation.header.image = await getFilePath(innovation.header.image)
            }
            if(innovation.header.video) {
                innovation.header.video = await getFilePath(innovation.header.video)
            }
            innovation.steps = await Promise.all(innovation.steps.map( async step => {
                if(step.image) {
                    step.image = await getFilePath(step.image)
                }
                return step
            }))
            innovation.conclusion = await Promise.all(innovation.conclusion.map( async con => {
                if(con.image) {
                    con.image = await getFilePath(con.image)
                }
                return con
            }))

            innovation = innovation.toObject()

            innovation.user = await User.findOne({_id: profileData.userId})
            .select({
                _id:0, 
                name: 1,
                profilePic: 1,
                description: 1
            })
            .then(async user => {
                if(user.profilePic)
                    user.profilePic = await getFilePath(user.profilePic)
                return user
            })
            .catch(err => {})
            res.status(200).send(innovation)
        }
        else {
            res.status(200).send({})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: "Error in retreiving innovation"})
    })
})

router.post('/', isAuthenticated, isAuthorized(['student']), async (req, res) => {
    const reqData = req.body
    if(reqData && reqData.brief) {
        reqData.brief = reqData.brief.brief
    }
    try {
        let studentProfile = await StudentProfile.findOne({ userId: req.userId })
        if(studentProfile) {
            if(!studentProfile.innovations)
                studentProfile.innovations = [reqData]
            else {
                studentProfile.innovations.push(reqData)
            }
            await studentProfile.save()
            .then(studentProfile => {
                res.status(201).send({message: 'Student innovation added successfully', innovationId: studentProfile.innovations.slice(-1)[0]._id})
            })
            .catch(err => {
                console.log(err)
                res.status(400).send('Error in adding student innovation')
            })
        }
        else {
            studentProfile = new StudentProfile({
                userId: mongoose.Types.ObjectId(req.userId),
                innovations: [reqData]
            })
            await studentProfile.save()
            .then(studentProfile => {
                res.status(201).send({message: 'Student innovation added successfully', innovationId: studentProfile.innovations.slice(-1)[0]._id})
            })
            .catch(err => {
                console.log(err)
                res.status(400).send('Error in adding student innovation')
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).send('Error in adding student innovation')
    }
})

router.put('/:id/:attr', isAuthenticated, isAuthorized(['student']), async (req, res) => {
    const innovationId = mongoose.Types.ObjectId(req.params.id)
    const attr = req.params.attr
    const reqData = req.body
    console.log(req.body)
    await StudentProfile.updateOne({ userId: req.userId, 'innovations._id': innovationId },
    {$set: {[`innovations.$.${attr}`]: attr === 'brief' ? reqData.brief : attr === 'isUploaded' ? reqData.isUploaded : attr === 'isEnabled' ? reqData.isEnabled : reqData}}, (err, raw) => {
        if(err) {
            console.log(err)
            res.status(400).send('Error in updating student innovation')
        }
        else {
            res.status(201).send('Student innovation updated successfully')
        }
    })
})

router.delete('/:id', isAuthenticated, isAuthorized(['student']), async (req, res) => {
    const innovationId = mongoose.Types.ObjectId(req.params.id)
    const reqData = req.body
    console.log(req.body)
    await StudentProfile.updateOne({ userId: req.userId },
    { $pull: {"innovations": {_id: innovationId}}}, (err, raw) => {
        if(err) {
            console.log(err)
            res.status(400).send('Error in deleting student innovation')
        }
        else {
            res.status(201).send('Student innovation deleted successfully')
        }
    })
})

module.exports = router