const path = require('path')
const borderImage = require('../../utilities/imgUtils/whitespaceImage')
const fs = require('fs')
const config = require('../../utilities/logUtils/log')
const getConfig = config().get('baseDir')
const log = require('../../utilities/logUtils/consoleLogging')
const commandJSON = require('../commandData.json')
const { process } = require('../../utilities/processUtils/processBarProcess')
const getDirLength = require('../../utilities/pathUtils/getDirLength')

const border = {
  command: commandJSON.border.command,
  describe: commandJSON.border.description,
  builder: (yargs) => {
    yargs.option('inplace', {
      alias: 'i',
      type: 'boolean',
      describe: commandJSON.border.arguments.inplaceDesc,
      default: false,
      nargs: 1
    })
    yargs.option('directory', {
      alias: 'd',
      type: 'string',
      describe: commandJSON.border.arguments.directoryDesc,
      default: 'images',
      nargs: 1
    })
    yargs.option('files', {
      alias: 'f',
      type: 'array',
      describe: commandJSON.border.arguments.filesDesc
    })
    yargs.option('size', {
      alias: 's',
      type: 'number',
      describe: commandJSON.border.arguments.sizeDesc
    })
    yargs.option('igify', {
      alias: 'ig',
      type: 'boolean',
      describe: commandJSON.border.arguments.igifyDesc,
      default: false
    })
  },
  handler: async (argv) => {
    if (!argv.size && argv.igify === false) {
      log(
        'inform',
        'You must input the resize factor (e.g. 0.5) to use this command.'
      )
    } else {
      if (argv.files) {
        await process(
          'Border Images',
          argv.files,
          argv.files.length,
          (imageFile) => borderImages(argv, imageFile)
        )
        log(
          'success',
          'Border creation has been completed for specified folder.'
        )
      } else if (!argv.files && argv.directory) {
        const dirPath = path.join(getConfig, 'phofiles', argv.directory)
        await process(
          'Border Images',
          fs.readdirSync(dirPath),
          getDirLength(dirPath),
          (imageFile) => borderImages(argv, imageFile)
        )
        log(
          'success',
          'Border creation has been completed for specified directory.'
        )
      } else {
        log(
          'error',
          'No directory or image files have been specified with --directory and/or --files.'
        )
      }
    }
  }
}

const borderImages = async (argv, imageFile = '') => {
  await borderImage(
    path.join(getConfig, 'phofiles', argv.directory, imageFile),
    argv.size,
    argv.igify
  )
}

module.exports = border
