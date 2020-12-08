const express = require('express')
const router = express.Router()
const StudentProfile = require('../../../model/StudentProfile')
const isAuthenticated = require('../../../controller/requestAuthenticator')
const isAuthorized = require('../../../controller/requestAuthorizer')
const mongoose = require('mongoose')
const User = require('../../../model/User')
const {getFilePath} = require('../../../Utils/File')

router.get('/:id', async (req, res) => {
    StudentProfile.findOne({'projects._id': mongoose.Types.ObjectId(req.params.id)})
    .select({userId: 1, projects: {$elemMatch: {_id: mongoose.Types.ObjectId(req.params.id)}}})
    .exec()
    .then(async profileData => {
        if(profileData && profileData.projects && profileData.projects[0]) {
            let project = profileData.projects[0]

            if(project.header && project.header.image) {
                project.header.image = await getFilePath(project.header.image)
            }
            if(project.header.video) {
                project.header.video = await getFilePath(project.header.video)
            }
            project.steps = await Promise.all(project.steps.map( async step => {
                if(step.image) {
                    step.image = await getFilePath(step.image)
                }
                return step
            }))
            project.conclusion = await Promise.all(project.conclusion.map( async con => {
                if(con.image) {
                    con.image = await getFilePath(con.image)
                }
                return con
            }))

            project = project.toObject()

            project.user = await User.findOne({_id: profileData.userId})
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
            res.status(200).send(project)
        }
        else {
            res.status(200).send({})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: "Error in retreiving project"})
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
            if(!studentProfile.projects)
                studentProfile.projects = [reqData]
            else {
                studentProfile.projects.push(reqData)
            }
            await studentProfile.save()
            .then(studentProfile => {
                res.status(201).send({message: 'Student project added successfully', projectId: studentProfile.projects.slice(-1)[0]._id})
            })
            .catch(err => {
                console.log(err)
                res.status(400).send('Error in adding student project')
            })
        }
        else {
            studentProfile = new StudentProfile({
                userId: mongoose.Types.ObjectId(req.userId),
                projects: [reqData]
            })
            await studentProfile.save()
            .then(studentProfile => {
                res.status(201).send({message: 'Student project added successfully', projectId: studentProfile.projects.slice(-1)[0]._id})
            })
            .catch(err => {
                console.log(err)
                res.status(400).send('Error in adding student project')
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).send('Error in adding student project')
    }
})

router.put('/:id/:attr', isAuthenticated, isAuthorized(['student']), async (req, res) => {
    const projectId = mongoose.Types.ObjectId(req.params.id)
    const attr = req.params.attr
    const reqData = req.body
    console.log(req.body)
    await StudentProfile.updateOne({ userId: req.userId, 'projects._id': projectId },
    {$set: {[`projects.$.${attr}`]: attr === 'brief' ? reqData.brief : attr === 'isUploaded' ? reqData.isUploaded : attr === 'isEnabled' ? reqData.isEnabled : reqData}}, (err, raw) => {
        if(err) {
            console.log(err)
            res.status(400).send('Error in updating student project')
        }
        else {
            res.status(201).send('Student project updated successfully')
        }
    })
})

router.delete('/:id', isAuthenticated, isAuthorized(['student']), async (req, res) => {
    const projectId = mongoose.Types.ObjectId(req.params.id)
    const reqData = req.body
    console.log(req.body)
    await StudentProfile.updateOne({ userId: req.userId },
    { $pull: {"projects": {_id: projectId}}}, (err, raw) => {
        if(err) {
            console.log(err)
            res.status(400).send('Error in deleting student project')
        }
        else {
            res.status(201).send('Student project deleted successfully')
        }
    })
})

module.exports = router