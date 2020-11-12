const mongoose = require('mongoose')
const File = require('../model/File')

const setProfilePic = async (userId, filePath) => {
    let profilePic = filePath
    const storeFile = new Promise(async (resolve, reject) => {
        if(profilePic) {
          const fileData = new File({
              _id: new mongoose.Types.ObjectId(),
              filePath: profilePic,
              createdBy: userId,
              createdAt: new Date().toISOString()
          })
      
          await fileData.save()
          .then(doc => {
             resolve(doc._id)
          })
          .catch(err => {
              reject(err)
          })
        }
    })
    profilePic = await storeFile
    .then(id => id)
    .catch(err => {
        console.log(err)
        return undefined
    })
    return profilePic
}

module.exports = { setProfilePic }