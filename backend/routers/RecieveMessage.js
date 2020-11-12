
const express = require('express')
const router = express.Router()
const { sendMail } = require('../Utils/Email')


router.post('/recievemail', async(req, res) => {
try{
  console.log(req.body)
  if(!req.body.senderMail)
  {
    throw "new error";
  }
  await sendMail(["ruchadeshpande1251@gmail.com"], {type: 'SEND_MESSAGE', args: {senderName:req.body.senderName, message:req.body.message}})
  await sendMail([req.body.senderMail], {type: 'MESSAGE_ACKNOWLEDGEMENT', args: {senderName:req.body.senderName}})
  res.status('200').send({message:'Mail sent'})

} catch(e)
{
  res.status('400').send({message:'Failed', error:e})
} })

router.post('/callback', async(req, res) => {
  try{
    console.log(req.body)
    if(!req.body.senderContact)
    {
      throw "new error";
    }
    await sendMail(["labs.rancho@gmail.com"], {type: 'CALLBACK_REQUEST', args: {senderName:req.body.senderName, senderContact:req.body.senderContact}})
    res.status('200').send({message:'Callback request sent!'})
  
  } catch(e)
  {
    res.status('400').send({message:'Failed', error:e})
  } })
  

module.exports = router
