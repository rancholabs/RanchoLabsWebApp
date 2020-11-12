const express = require('express')
const router = express.Router()
const Message = require('../model/Message')
const Callback = require('../model/Callback')
const { sendMail } = require('../Utils/Email')

router.post('/message', async(req, res) =>{
    const message = new Message({
        name : req.body.senderName,
        email : req.body.senderMail,
        message : req.body.message,
        receivedAt : new Date().toISOString()
    })
    try {
        await message.save()
        await sendMail(["ruchadeshpande1251@gmail.com"], {type: 'SEND_MESSAGE', args: {senderName:req.body.senderName, message:req.body.message}})
        await sendMail([req.body.senderMail], {type: 'MESSAGE_ACKNOWLEDGEMENT', args: {senderName:req.body.senderName}})
        res.status(201).send('Message sent!')

    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/callback', async(req,res) => {
    const callback = new Callback({
        name : req.body.senderName,
        contact : req.body.senderContact,
        receivedAt : new Date().toISOString()
    })
    try {
        await callback.save()
        await sendMail(["labs.rancho@gmail.com"], {type: 'CALLBACK_REQUEST', args: {senderName:req.body.senderName, senderContact:req.body.senderContact}})
        res.status(201).send('Callback request sent!')

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router