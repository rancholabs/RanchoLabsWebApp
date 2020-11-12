const express = require('express')
const router = express.Router()
const User = require('../../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {OAuth2Client} = require('google-auth-library')
const config = require('../../config')
const {JWT_SECRET, GCLIENT_ID, FB_TOKEN } = config
const axios = require('axios')

router.post('/', (req, res) => {
  User.findOne({ email: req.body.email, mode: 'normal' }, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(500).send({message: "Internal server error"})
    }
    else {
      if (!user) return res.status(404).send({user: false})

      const password =  req.body.password ? req.body.password : ''
      const passwordIsValid = bcrypt.compareSync(password, user.password)
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })

      const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: 86400 })

      res.status(200).send({ auth: true, token: token, userName: user.name, role: user.role })
    }
  })
})
  
router.post('/google', (req, res) => {
  const client = new OAuth2Client(GCLIENT_ID)
  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: GCLIENT_ID,
    })
    const payload = ticket.getPayload()
    const email = payload['email']
    User.findOne({ email: email, mode: 'google' }, (err, user) => {
      if (err) {
        console.log(err)
        return res.status(500).send({message: "Internal server error"})
      }
      else {
        if (!user) return res.status(404).send({user: false})
  
        const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: 86400 })
  
        res.status(200).send({ auth: true, token: token, userName: user.name })
      }
    })
  }
  verify().catch(err => {
    res.status(401).send({ auth: false, token: null })
  })

})

router.post('/facebook', async (req, res) => {
  const url = `https://graph.facebook.com/debug_token?input_token=${req.body.token}&access_token=${FB_TOKEN}`
  
  await axios.get(url)
  .then(async resp => {
    const resData = resp.data.data
    if(resData.is_valid) {
      const email = req.body.email
      User.findOne({ email: email, mode: 'facebook' }, (err, user) => {
        if (err) {
          console.log(err)
          return res.status(500).send({message: "Internal server error"})
        }
        else {
          if (!user) return res.status(404).send({user: false})
    
          const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: 86400 })
    
          res.status(200).send({ auth: true, token: token, userName: user.name })
        }
      })
    }
    else {
      res.status(401).send({ auth: false, token: null })
    }
  })
  .catch(err => {
    res.status(401).send({ auth: false, token: null })
  })
})

  module.exports = router