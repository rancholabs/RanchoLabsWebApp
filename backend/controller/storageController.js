const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const fs = require('fs')
const { AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('../config')

const getSubFolderName = (fileMimeType) => {
    let folderName
    switch(fileMimeType) {
        case 'image': 
            folderName = 'images'
            break
        case 'audio': 
            folderName = 'audios'
            break
        case 'video': 
            folderName = 'videos'
            break
        case 'application': 
            folderName = 'applications'
            break
        default:
            folderName = 'others'
    }
    return folderName
}

const diskStorage = multer.diskStorage({
    async destination(req, file, cb) {
        const validateFilePath = (filePath) => {
            try {
                stat = fs.statSync(filePath)
            } catch (err) {
                fs.mkdirSync(filePath)
            }
        }
        const folderName = getSubFolderName(file.mimetype.split('/')[0])
        const filePath = `uploads/${folderName}/`
        await validateFilePath(filePath)

      cb(null, filePath)
    },
    filename(req, file, cb) {
        const fileNameArr = file.originalname.split('.')
        const ext = fileNameArr.pop()
        const fileName = fileNameArr.join('.')
      cb(null, `${fileName}-${Date.now()}.${ext}`)
    },
  })

aws.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
})
const s3 = new aws.S3()
const awsS3Storage = multerS3({
  s3,
  bucket: AWS_S3_BUCKET,
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    const folderName = getSubFolderName(file.mimetype.split('/')[0])
    const fileNameArr = file.originalname.split('.')
    const ext = fileNameArr.pop()
    const fileName = fileNameArr.join('.')
    cb(null, `${folderName}/${fileName}-${Date.now()}.${ext}`)
  },
})

const awsS3DeleteFile = (fileLocation, cb) => {
    const fileKeyword = fileLocation.split('s3.amazonaws.com/')[1]
    s3.deleteObject({
        Bucket: AWS_S3_BUCKET,
        Key: fileKeyword
      },function (err,data){
          if(err) {
              res.status(400).send('Error in deleting the file')
          }
          else {
              cb()
          }
      })
}
  
module.exports = {diskStorage, awsS3Storage, awsS3DeleteFile}