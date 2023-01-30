const checkPath = require('../pathUtils/checkPath')
const fs = require('fs')
const path = require('path')
const getExif = require('./getExif')
const log = require('../logUtils/consoleLogging')

const logJSON = (file) => {
  log('white', ` - ${file.len > 1 ? file[0] : file}`)
  if (file.len > 1) {
    log('inform', `${JSON.stringify(file[1], null, 3)}`)
  }
}

const logFiles = (customPath, fileList) => {
  log('inform', `${customPath} has ${customPath.length} files`)
  log('inform', 'The files are:')
  fileList.forEach((file) => logJSON(file))
}

const getMetricsOperation = async (customPath, extraData, options) => {
  const fileList = []
  fs.readdirSync(customPath).forEach((file) => {
    if (extraData === false) {
      fileList.push(file)
    } else {
      fileList.push([file, getExif(path.join(customPath, file), options)])
    }
  })
  logFiles(customPath, fileList)
}

const getMetrics = async (customPath, extraData, options) => {
  if (checkPath(customPath)) {
    await getMetricsOperation(customPath, extraData, options)
  } else {
    log('inform', 'The provided path does not exist')
  }
}

module.exports = getMetrics
