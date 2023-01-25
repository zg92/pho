const path = require("path");
const { dirPath } = require("../dir");
const { copyDir } = require("../utilities/pathUtils/copyDir");
const { copyFile } = require("../utilities/pathUtils/copyFile");

const exportFiles = {
  command: "export [directory] [files] [destination]",
  describe: "Initialize program",
  builder: (yargs) => {
    yargs.option("directory", {
      alias: "d",
      describe: "Specifies the source directory to import into CLIP",
      type: "string",
      default: path.join(dirPath, "files/images"),
    }),
      yargs.option("files", {
        alias: "f",
        describe: "Option to pick specific files from the --directory used.",
        type: "array",
      }),
      yargs.option("destination", {
        alias: "dest",
        describe:
          "Specifies the destination directory you want to export images to.",
        type: "string",
      });
  },

  handler: (argv) => {
    if (argv.files) {
      copyFile(argv.files, argv.directory, argv.destination);
    } else {
      copyDir(argv.directory, argv.destination);
    }
  },
};

module.exports = exportFiles;