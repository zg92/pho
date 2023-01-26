const path = require("path");
const { copyDir } = require("../utilities/pathUtils/copyDir");
const { copyFile } = require("../utilities/pathUtils/copyFile");

const exportFiles = {
  command: "export [directory] [files] [destination]",
  describe: "Export files from a Pho directory to an external directory.",
  builder: (yargs) => {
    yargs.option("directory", {
      alias: "d",
      describe: "Specifies the source directory to export from Pho",
      type: "string",
      default: 'images'
    }),
      yargs.option("files", {
        alias: "f",
        describe: "Option to pick specific files from the --directory used.",
        type: "array",
      }),
      yargs.option("destination", {
        alias: "dest",
        describe:
          "Specifies the destination directory you want to export images into.",
        type: "string",
      });
  },

  handler: (argv) => {
    if (argv.files) {
      copyFile(argv.files, path.join(process.cwd(), 'phofiles', argv.directory), argv.destination);
    } else {
      copyDir(path.join(process.cwd(), 'phofiles', argv.directory), argv.destination);
    }
  },
};

module.exports = exportFiles;
