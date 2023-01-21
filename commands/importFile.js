const yargs = require("yargs");
const { copyDir } = require("../utilities/pathUtils/copyDir");
const { copyFile } = require("../utilities/pathUtils/copyFile");

const importFile = yargs
  .command(
    "$0 <command> [directory] [files]",
    "Initialize program",
    (yargs) => {
      yargs.option("directory", {
        alias: "d",
        describe: "Specifies the source directory to import into CLIP",
        type: "string",
      }),
        yargs.option("files", {
          alias: "f",
          describe: "Option to pick specific files from the --directory used.",
          type: "array",
        });
    },

    (argv) => {
      if (argv.files) {
        copyFile(argv.files, argv.directory);
      } else {
        copyDir(argv.directory);
      }
    }
  )
  .help().argv;
