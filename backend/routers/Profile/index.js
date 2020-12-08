const express = require('express')
const router = express.Router()
const studentRouter = require('./Student')
const instructorRouter = require('./Instructor')

router.use('/student', studentRouter)
router.use('/instructor', instructorRouter)

module.exports = router