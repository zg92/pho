const copyDir = require('../../utilities/pathUtils/copyDir')
const copyFile = require('../../utilities/pathUtils/copyFile')
const path = require('path')
const config = require('../../utilities/logUtils/log')
const getConfig = config().get('baseDir')
const commandJSON = require('../commandData.json')

const importFiles = {
  command: commandJSON.importFiles.command,
  describe: commandJSON.importFiles.description,
  builder: (yargs) => {
    yargs.option('directory', {
      alias: 'd',
      describe: commandJSON.importFiles.arguments.directoryDesc,
      type: 'string'
    })
    yargs.option('files', {
      alias: 'f',
      describe: commandJSON.importFiles.arguments.filesDesc,
      type: 'array'
    })
  },

  handler: (argv) => {
    if (argv.files) {
      copyFile(
        argv.files,
        argv.directory,
        path.join(getConfig, 'phofiles', 'images')
      )
    } else {
      copyDir(argv.directory, path.join(getConfig, 'phofiles', 'images'))
    }
  }
}

module.exports = importFiles
