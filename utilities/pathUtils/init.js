const fs = require('fs')
const path = require('path')
const config = require('../logUtils/log')
const getConfig = config().get('baseDir')
const log = require('../logUtils/consoleLogging')
const handleError = require('../errUtils/errorHandler')

const initFiles = async () => {
  log('inform', 'Connecting to the directory...')
  try {
    fs.mkdirSync(path.join(getConfig, 'phofiles'))
    log(
      'Green',
      `Created a directory at location: ${path.join(getConfig, 'phofiles')}`
    )
    return
  } catch (err) {
    if (err.code === 'EEXIST') {
      handleError(err)
    }
  }
}

const initImages = async () => {
  try {
    fs.mkdirSync(path.join(getConfig, 'phofiles', 'images'))
    log(
      'success',
      `Created a folder in the working directory called: ${path.join(
        getConfig,
        'phofiles',
        'images'
      )}`
    )

    return
  } catch (err) {
    if (err.code === 'EEXIST') {
      log(
        'success',
        `You are connected to directory at ${path.join(getConfig, 'phofiles')}`
      )
    }
  }
}

const initPho = async () => {
  await initFiles()
  await initImages()
}

module.exports = initPho
