const path = require('path')
const getMetrics = require('../../utilities/imgUtils/getMetrics')
const getExif = require('../../utilities/imgUtils/getExif')
const config = require('../../utilities/logUtils/log')
const getConfig = config().get('baseDir')
const log = require('../../utilities/logUtils/consoleLogging')
const commandJSON = require('../commandData.json')

const peek = {
  command: commandJSON.peek.command,
  describe: commandJSON.peek.description,
  builder: (yargs) => {
    yargs
      .positional('directory', {
        type: 'string',
        describe: commandJSON.peek.arguments.directoryDesc,
        default: 'images'
      })
      .option('exif', {
        alias: 'e',
        type: 'boolean',
        describe: commandJSON.peek.arguments.exifDesc,
        default: false,
        nargs: 1
      })
      .option('files', {
        alias: 'f',
        type: 'array',
        describe: commandJSON.peek.arguments.filesDesc
      })
      .option('options', {
        alias: 'o',
        type: 'array',
        describe: commandJSON.peek.arguments.optionsDesc,
        default: 'all'
      })
  },

  handler: (argv) => {
    if (!argv.files) {
      getMetrics(
        path.join(getConfig, 'phofiles', argv.directory),
        argv.exif,
        argv.options
      )
    } else {
      argv.files.forEach((fileName) => {
        const exifData = getExif(
          path.join(getConfig, 'phofiles', argv.directory, fileName),
          argv.options
        )
        log('success', `Here is the exif data you requested for ${fileName}:`)
        console.log(exifData)
      })
    }
  }
}

module.exports = peek
