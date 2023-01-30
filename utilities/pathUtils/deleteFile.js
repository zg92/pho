const fs = require('fs')
const checkPath = require('./checkPath')
const path = require('path')
const config = require('../logUtils/log')
const getConfig = config().get('baseDir')
const errorHandler = require('../errUtils/errorHandler')
const log = require('../logUtils/consoleLogging')

const deleteFile = (filePath, argv) => {
  const filePathPreDeleted = path.join(
    getConfig,
    'phofiles',
    argv.directory,
    filePath
  )

  if (checkPath(filePathPreDeleted)) {
    fs.unlink(filePathPreDeleted, (err) => {
      if (err) {
        errorHandler(err)
      }
      log('success', `File ${filePath} was successfully deleted`)
    })
  } else {
    log('inform', `The file: ${filePath} does not exist.`)
  }
}

module.exports = deleteFile
