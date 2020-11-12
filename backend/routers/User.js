const express = require('express')
const router = express.Router()
const User = require('../model/User')
const isAuthenticated = require('../controller/requestAuthenticator')
const isAuthorized = require('../controller/requestAuthorizer')
const bcrypt = require('bcryptjs')
const { sendMail } = require('../Utils/Email')

router.put('/updateRole/:id', isAuthenticated, isAuthorized(['admin']), (req, res) => {
    const id = req.params.id
    const role = req.body.role
    const description = req.body.description
    const updateQuery = {role: role}
    if(description !== undefined) {
        updateQuery.description = description
    }
    User.updateOne({_id: id}, updateQuery, {runValidators: true}, (err, raw) => {
        if(err) {
            console.log(err)
            res.status(500).send({message: 'error', error: 'Error in updating role'})
        }
        else {
            const {nModified: n} = raw
            res.status(204).send({message: (n > 0) ? `Updated Successfully` : 'No Changes detected'})
        }
    })
})

router.patch('/updateUser', isAuthenticated, async(req,res) => {
    
    var user = await User.findById(req.userId);
    const updates =  Object.keys(req.body);
    
    try{
        updates.forEach((update) => {
            if(update === 'password' )
            {
                user[update] = bcrypt.hashSync(req.body[update], 8)
            }
            else{
                user[update] = req.body[update]
            }
        })
        await user.save()
        res.status(201).send('User update successfull')
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/setPassword', isAuthenticated, async(req,res) => {
    var user = await User.findById(req.userId);
    const password = req.body && req.body.password ? req.body.password : ''

    const newHashedPassword = bcrypt.hashSync(password, 8)

    try{
        user.password = newHashedPassword
        await user.save()
        sendMail([user.email], {type: 'PASSWORD_SET'})
        res.status(201).send('Password set successfully') 
    } catch (err) {
        console.log(err)
        res.status(400).send('Error in seting the password!')
    }
})

router.patch('/changePassword', isAuthenticated, async(req,res) => {
    var user = await User.findById(req.userId);
    const password = req.body && req.body.password ? req.body.password : ''

    const newHashedPassword = bcrypt.hashSync(password, 8)

    try{
        user.password = newHashedPassword
        await user.save()
        sendMail([user.email], {type: 'PASSWORD_CHANGED'})
        res.status(201).send('Password changed successfully') 
    } catch (err) {
        console.log(err)
        res.status(400).send('Error in changing the password!')
    }
})

module.exports = router