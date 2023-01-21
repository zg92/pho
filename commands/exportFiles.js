const path = require("path");
const yargs = require("yargs");
const { dirPath } = require("../dir");
const { copyDir } = require("../utilities/pathUtils/copyDir");
const { copyFile } = require("../utilities/pathUtils/copyFile");

const exportFiles = yargs
  .command(
    "$0 <command> [directory] [files] <destination>",
    "Initialize program",
    (yargs) => {
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

    (argv) => {
      if (argv.files) {
        copyFile(argv.files, argv.directory, argv.destination);
      } else {
        copyDir(argv.directory, argv.destination);
      }
    }
  )
  .help().argv;
