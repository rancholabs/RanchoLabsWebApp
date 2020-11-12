const express = require('express')
const router = express.Router()
const Batch = require('../model/Batch')
const Instructor = require('../model/Instructor')
const Class = require('../model/Class')
const mongoose = require('mongoose')

router.get('/:bid', async (req, res) => {
    const bid = req.params.bid
    const batch = await Batch.findOne({ _id: bid })
    try {
        if (batch) {
            res.status(201).send({ batch })
        }
        else {
            res.status(404).send({ error: 'Batch not found' })
        }
    }
    catch (e) {
        res.status(404).send({ message: 'error', error: e })
    }
})

router.patch('/:bid/:iid', async (req, res) =>{
    try{
        const update = await Batch.updateOne({_id : req.params.bid}, {$set:{instructor: mongoose.Types.ObjectId(req.params.iid)}})
        const batch =  await Batch.find({_id:req.params.bid})
        if(update.ok){
            res.status(201).send({batch, message:'Updated instructor for the batch'})
        }
        else{
            res.status(400).send('Error in adding batch instructor')
        }
    }catch(e){
        res.status(400).send({error : e})
    }
})

router.patch('/:bid/update' , async (req, res) => {
    try{
        const batch = await Batch.findOne({_id : req.params.bid})
        if(batch){
            const updates = Object.keys(req.body)
        updates.forEach((update) => {
            batch[update] = req.body[update]
        })
        await batch.save()
        res.status(201).send(batch)
    }
        else{
            throw new error('Batch not found')
        }
    }
    catch(e){
        res.status(400).send('Error')
    }
} )

router.put('/:bid/:cid', async (req, res) => {
    try{
        const batch = await Batch.findOne({_id:req.params.bid})
        const clas = batch.classes.filter((c) => {
            if(c._id == req.params.cid)
            return c
        })
        const updates =  Object.keys(req.body)
        updates.forEach((update)=> {
            if(update === 'instructorNote')
            {
                clas[0].instructorNote.push(req.body[update])
            }
            else{
                clas[0][update] = req.body[update]
            }
        })
        await batch.save()
        res.status(201).send(clas)
    }
    catch(e){
        console.log(e)
        res.status(400).send('Error')
    }
})

module.exports = router