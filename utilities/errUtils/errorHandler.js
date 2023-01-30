const log = require('../logUtils/consoleLogging')

const handleError = (error) => {
  log('error', `Error: ${error.message}`)
  return error
}

module.exports = handleError
