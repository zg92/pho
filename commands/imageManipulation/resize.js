const resizeImage = require('../../utilities/imgUtils/resizeImage')
const path = require('path')
const fs = require('fs')
const config = require('../../utilities/logUtils/log')
const getConfig = config().get('baseDir')
const log = require('../../utilities/logUtils/consoleLogging')
const commandJSON = require('../commandData.json')
const { process } = require('../../utilities/processUtils/processBarProcess')
const getDirLength = require('../../utilities/pathUtils/getDirLength')

const resize = {
  command: commandJSON.resize.command,
  describe: commandJSON.resize.description,
  builder: (yargs) => {
    yargs.option('inplace', {
      alias: 'i',
      type: 'boolean',
      describe: commandJSON.resize.arguments.inplaceDesc,
      default: false,
      nargs: 1
    })
    yargs.option('directory', {
      alias: 'd',
      type: 'string',
      describe: commandJSON.resize.arguments.directoryDesc,
      default: 'images',
      nargs: 1
    })
    yargs.option('files', {
      alias: 'f',
      type: 'array',
      describe: commandJSON.resize.arguments.filesDesc
    })
    yargs.option('resize', {
      alias: 'r',
      type: 'number',
      describe: commandJSON.resize.arguments.resizeDesc
    })
  },
  handler: async (argv) => {
    if (!argv.resize || argv.resize <= 0) {
      log(
        'inform',
        'You must input the resize factor (e.g. 0.5) to use this command. Size factor must be greater than 0.'
      )
    } else {
      if (argv.files) {
        await process(
          'Resize Images',
          argv.files,
          argv.files.length,
          (imageFile) => resizeImages(argv, imageFile)
        )
        log(
          'success',
          'Resize operation creation has been completed for specified files.'
        )
      } else if (!argv.files && argv.directory) {
        const dirPath = path.join(getConfig, 'phofiles', argv.directory)
        await process(
          'Resize Files Images',
          fs.readdirSync(dirPath),
          getDirLength(dirPath),
          (imageFile) => resizeImages(argv, imageFile)
        )
        log(
          'success',
          'Resize operation creation has been completed for .jpg files in the specified directory.'
        )
      } else {
        log(
          'inform',
          'No directory or image files have been specified with --directory and/or --files.'
        )
      }
    }
  }
}

const resizeImages = async (argv, imageFile = '') => {
  await resizeImage(
    path.join(getConfig, 'phofiles', argv.directory, imageFile),
    argv.inplace,
    argv.resize,
    'resized'
  )
}

module.exports = resize
