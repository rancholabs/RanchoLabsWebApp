const express = require('express')
const router = express.Router()
const isAuthenticated = require('../../../controller/requestAuthenticator')
const isAuthorized = require('../../../controller/requestAuthorizer')

module.exports = router