const deleteDir = require('../../utilities/pathUtils/deleteDir')
const deleteFile = require('../../utilities/pathUtils/deleteFile')
const log = require('../../utilities/logUtils/consoleLogging')
const commandJSON = require('../commandData.json')

const del = {
  command: commandJSON.delete.command,
  describe: commandJSON.delete.description,
  builder: (yargs) => {
    yargs.option('directory', {
      alias: '-d',
      describe: commandJSON.delete.arguments.directoryDesc,
      type: 'string',
      default: 'images'
    })
    yargs.option('files', {
      alias: '-f',
      describe: commandJSON.delete.arguments.filesDesc,
      type: 'array'
    })
  },

  handler: (argv) => {
    if (argv.directory === 'images' && !argv.files) {
      log('inform', 'The images directory cannot be deleted')
    } else if (argv.directory !== 'images' && !argv.files) {
      deleteDir(argv.directory)
    } else if (argv.files) {
      argv.files.forEach((imageFile) => {
        deleteFile(imageFile, argv)
      })
    }
  }
}

module.exports = del
