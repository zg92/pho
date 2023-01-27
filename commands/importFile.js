const copyDir = require("../utilities/pathUtils/copyDir");
const copyFile = require("../utilities/pathUtils/copyFile");
const path = require("path");
const config = require('../utilities/logUtils/log');
const getConfig = config().get('baseDir')

const importFiles = {
  command: "import [directory] [files]",
  describe: "Import files from a local file into a directory in Pho.",
  builder: (yargs) => {
    yargs.option("directory", {
      alias: "d",
      describe: "Specifies the source directory to import into Pho",
      type: "string",
    }),
      yargs.option("files", {
        alias: "f",
        describe: "Option to pick specific files from the --directory used.",
        type: "array",
      });
  },

  handler: (argv) => {
    if (argv.files) {
      copyFile(
        argv.files,
        argv.directory,
        path.join(getConfig, 'phofiles', 'images', imageFile)
      );
    } else {
      copyDir(argv.directory, path.join(getConfig, 'phofiles', 'images'));
    }
  },
};

module.exports = importFiles;
