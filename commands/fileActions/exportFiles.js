const path = require('path')
const copyDir = require('../../utilities/pathUtils/copyDir')
const copyFile = require('../../utilities/pathUtils/copyFile')
const config = require('../../utilities/logUtils/log')
const getConfig = config().get('baseDir')
const log = require('../../utilities/logUtils/consoleLogging')
const commandJSON = require('../commandData.json')

const exportFiles = {
  command: commandJSON.exportFiles.command,
  describe: commandJSON.exportFiles.description,
  builder: (yargs) => {
    yargs.option('directory', {
      alias: 'd',
      describe: commandJSON.exportFiles.arguments.directoryDesc,
      type: 'string',
      default: 'images'
    })
    yargs.option('files', {
      alias: 'f',
      describe: commandJSON.exportFiles.arguments.filesDesc,
      type: 'array'
    })
    yargs.option('destination', {
      alias: 'dest',
      describe: commandJSON.exportFiles.arguments.destinationDesc,
      type: 'string'
    })
  },

  handler: async (argv) => {
    if (argv.files) {
      await copyFile(
        argv.files,
        path.join(getConfig, 'phofiles', argv.directory),
        argv.destination
      )
    } else {
      await copyDir(
        path.join(getConfig, 'phofiles', argv.directory),
        argv.destination
      )
    }
    log('success', `Files have been exported to: ${argv.destination}`)
  }
}

module.exports = exportFiles
