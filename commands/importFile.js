const { copyDir } = require("../utilities/pathUtils/copyDir");
const { copyFile } = require("../utilities/pathUtils/copyFile");
const path = require("path");
const { dirPath } = require("../utilities/pathUtils/dir");

const importFiles = {
  command: "import [directory] [files]",
  describe: "Import files from a local file into a directory in CLIP.",
  builder: (yargs) => {
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

  handler: (argv) => {
    if (argv.files) {
      copyFile(
        argv.files,
        argv.directory,
        path.join(dirPath, "/files/images", imageFile)
      );
    } else {
      console.log(argv.directory);
      copyDir(argv.directory, path.join(dirPath, "files/images"));
    }
  },
};

module.exports = importFiles;
