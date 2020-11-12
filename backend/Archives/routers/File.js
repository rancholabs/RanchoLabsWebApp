const express = require('express')
const router = express.Router()
const multer = require('multer')
const File = require('../model/File')
const mongoose = require('mongoose')
const fs = require('fs')
const isAuthenticated = require('../controller/requestAuthenticator')
const { diskStorage, awsS3Storage } = require('../controller/storageController')

const upload = multer({ storage: diskStorage })

router.get('/', (req, res) => {
    const error = {message: 'Error in retreiving the files', error: 'Bad Request'}
    File.find({createdBy: req.userId})
    .select({originalName: 1, filePath: 1, mimeType:1, size: 1})
    .exec()
    .then( files => {
        res.send(files)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(error)
    })
})

router.get('/:id', (req, res) => {
    const error = {message: 'Error in retreiving the file', error: 'Bad Request'}
    const id = mongoose.Types.ObjectId(req.params.id)
    File.find({createdBy: req.userId, _id: id})
    .select({originalName: 1, filePath: 1, mimeType:1, size: 1})
    .exec()
    .then( files => {
        res.send(files[0])
    })
    .catch(er => {
        console.log(err)
        res.status(500).send(error)
    })
})

router.post('/', isAuthenticated, upload.array('files', 12), (req, res) => {
    const files = req.files
    if (!files) {
        res.status(400).send({message: 'Please choose files'})
    }
    console.log(files)
    const filePromise = new Promise( async(resolve, reject) => {
        let resFileNames = []
        let resErrors = []
        await Promise.all(files.map( async(file) => {
            const fileData = new File({
                _id: new mongoose.Types.ObjectId(),
                name: file.filename,
                originalName: file.originalname,
                mimeType: file.mimetype,
                directoryPath: file.destination,
                filePath: file.path.split('\\').join('/'),
                size: file.size,
                createdBy: req.userId,
                createdAt: new Date().toISOString()
            })

            await fileData.save()
            .then(doc => {
                resFileNames.push({fileId: doc._id})
            })
            .catch(err => {
                console.log(err)
                resErrors.push({message: 'Error adding file'})
            })
        }))
        resolve({status: (resFileNames.length === files.length),filesUploaded: resFileNames, errors: resErrors})
    })

    filePromise.then((resp) => res.status(201).send(resp))
})

router.put('/:id', isAuthenticated, (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    const fileName = req.body.fileName
    const error = {message: 'Error in updating the file', error: 'Bad Request'}
    File.updateMany({_id: id}, {originalName: fileName}, (err, raw) => {
        if(err) {
            console.log(err)
            res.status(500).send(error)
        }
        else {
            const {nModified: n} = raw
            res.status(204).send({message: (n > 0) ? `Updated ${n} docs` : 'No Changes detected'})
        }
    })
})

router.delete('/:id', isAuthenticated, (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    const query = {_id: id}
    const error = {message: 'Error in deleting the file', error: 'Bad Request'}
    File.find(query)
    .exec()
    .then(files => {
        if (files.length === 0)
            res.status(500).send({status: 'error', message: 'Unable to find the file id'})
        else {
            fs.unlink(files[0].filePath, (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).send(error)
                }
                else {
                    File.deleteOne(query, (err) => {
                        if(err) {
                            console.log(err)
                            res.status(500).send(error)
                        }
                        else {
                            res.status(204).send({message: 'File deleted successfully', status: true})
                        }
                    })
                }
            })
        }
    })
})

module.exports = router