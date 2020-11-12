const express = require('express')
const router = express.Router()
const User = require('../../model/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {OAuth2Client} = require('google-auth-library')
const config = require('../../config')
const {JWT_SECRET, GCLIENT_ID, FB_TOKEN } = config
const { sendMail } = require('../../Utils/Email')
const { setProfilePic } = require('../../Utils/ProfilePic')
const axios = require('axios')

router.post('/', (req, res) => {
    let hashedPassword =  req.body.password ? bcrypt.hashSync(req.body.password, 8) : ''
    User.findOne({email: req.body.email})
    .exec()
    .then(userM => {
      if(userM) {
        return res.status(500).send({message: "Email already exists", emailExists: true})
      }
      else {
        User.create({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          createdAt: new Date().toISOString()
        }, (err, user) => {
          if (err) {
            console.log(err)
            return res.status(500).send({message: "Registration failed"})
          }
          else {
            if(user.email)
              sendMail([user.email], {type: 'ACCOUNT_REGISTERED', args: {}})
            const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: 86400 })
        
            res.status(200).send({ auth: true, token: token, userName: user.name })
          }
        })
      }
    })
})

router.post('/google', (req, res) => {
  const client = new OAuth2Client(GCLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: GCLIENT_ID,
    });
    const payload = ticket.getPayload()
    const name = {
        first: payload['given_name'],
        last: payload['family_name']
    }
    let profilePic = payload['picture']
    const email = payload['email']    
    User.findOne({email: email})
    .exec()
    .then(async userM => {
        if(userM) {
            return res.status(500).send({message: "Email already exists", emailExists: true})
        }
        else {
            const userId = new mongoose.Types.ObjectId()
            profilePic = await setProfilePic(userId, profilePic)
            User.create({
            _id: userId,
            name: name,
            email: email,
            mode: 'google',
            profilePic: profilePic,
            createdAt: new Date().toISOString()
            }, (err, user) => {
            if (err) {
                console.log(err)
                return res.status(500).send({message: "Registration failed"})
            }
            else {
                if(user.email)
                sendMail([user.email], {type: 'ACCOUNT_REGISTERED', args: {}})
                const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: 86400 })
            
                res.status(200).send({ auth: true, token: token, userName: user.name })
            }
            })
        }
    })
  }
  verify().catch(err => {
      res.status(200).send({message: "Registration failed"})
  })

})

router.post('/facebook', async (req, res) => {
  const url = `https://graph.facebook.com/debug_token?input_token=${req.body.token}&access_token=${FB_TOKEN}`
  
  await axios.get(url)
  .then(async resp => {
    const resData = resp.data.data
    if(resData.is_valid) {
      const fbUserId = resData.user_id
      const url2 = `https://graph.facebook.com/${fbUserId}?fields=first_name,last_name,email,picture&access_token=${FB_TOKEN}`
      await axios.get(url2)
      .then(resp2 => {
        const {first_name, last_name, picture} = resp2.data
        let profilePic = ''
        if(picture) {
          const {url} = picture.data
          profilePic = url
        }
        const name = {
          first: first_name,
          last: last_name
        }
        const email = req.body.email
        User.findOne({email: email})
        .exec()
        .then(async userM => {
            if(userM) {
                return res.status(500).send({message: "Email already exists", emailExists: true})
            }
            else {
                const userId = new mongoose.Types.ObjectId()
                profilePic = await setProfilePic(userId, profilePic)
                User.create({
                _id: userId,
                name: name,
                email: email,
                mode: 'facebook',
                profilePic: profilePic,
                createdAt: new Date().toISOString()
                }, (err, user) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({message: "Registration failed"})
                }
                else {
                    if(user.email)
                    sendMail([user.email], {type: 'ACCOUNT_REGISTERED', args: {}})
                    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: 86400 })
                
                    res.status(200).send({ auth: true, token: token, userName: user.name, role: user.role })
                }
                })
            }
        })
      })
      .catch(err => {
        console.log(err)
        res.status(200).send({message: "Registration failed"})
      })
    }
    else {
      res.status(200).send({message: "Registration failed"})
    }
  })
  .catch(err => {
    res.status(200).send({message: "Registration failed"})
  })
  

})

module.exports = router