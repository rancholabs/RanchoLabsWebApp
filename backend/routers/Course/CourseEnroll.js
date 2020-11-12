const express = require('express')
const router = express.Router()
const StudentCourse = require('../../model/StudentCourse')
const Course = require('../../model/Course')
const mongoose = require('mongoose')
const { sendMail } = require('../../Utils/Email')

router.post('/', async (req, res) => {
    const courseId = mongoose.Types.ObjectId(req.body.courseId)
    const studentCourse = new StudentCourse({
        userId: mongoose.Types.ObjectId(req.userId),
        courseId: courseId,
        batchId: mongoose.Types.ObjectId(req.body.batchId),
        payment: req.body.payment
    })
    studentCourse.save()
    .then(sc => {
        Course.aggregate([
            {
                $match: {_id: courseId}
            },
            {
                $lookup : {
                    from: 'batches',
                    let: { courseId: '$_id'},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$courseId', '$$courseId']
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                startDate: 1
                            }
                        }
                    ],
                    as: 'batch',
                    
                }
            },
            {
                $unwind: '$batch'
            },
            {
                $project: {
                    _id: 0,
                    courseName: '$name',
                    startDate: '$batch.startDate'
                }
            }
        ])
        .exec()
        .then(courses => {
            if(courses[0]) {
                sendMail([req.email], {type: 'COURSE_REGISTERED', args: courses[0]})
            }
        })
        .catch(err => {
            console.log(err)
        })
        res.status(201).send({message: "Course Registered Successfully"})
    })
    .catch(err => {
        console.log(err)
        res.status(400).send({message: "Error in registering the course", error: "Bad request"})
    })
})

router.get('/', (req, res) => {
    StudentCourse.find({userId: mongoose.Types.ObjectId(req.userId)})
    .select({courseId: 1})
    .exec()
    .then(courses => {
        res.status(200).send(courses)
    })
    .catch(err => {
        res.status(400).send({message: "Error in retreiving the user courses"})
    })
})

module.exports = router