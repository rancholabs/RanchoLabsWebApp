const File = require('./../model/File')

const getFilePath = async (fileId) => {
    return await File.findOne({_id: fileId})
    .select({
        _id:1, 
        originalName: 1, 
        filePath: 1
    })
    .then(file => file)
    .catch(err => {})
}

module.exports = {getFilePath}