const fs = require('fs')
const path = require('path')

const renameFileExecute = (filePath, newName) => {
  fs.renameSync(filePath, renameFilePath(filePath, newName))
}

const renameFilePath = (filePath, newName) => {
  const fileObj = path.parse(filePath)
  return path.join(fileObj.dir, '/', `${newName}${fileObj.ext}`)
}

module.exports = { renameFilePath, renameFileExecute }
