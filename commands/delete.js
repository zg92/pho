const deleteDir = require("../utilities/pathUtils/deleteDir");
const deleteFile = require("../utilities/pathUtils/deleteFile");

const del = {
  command: "delete [directory] [files]",
  describe: "Delete an existing file or directory within the working directory",
  builder: (yargs) => {
    yargs.option("directory", {
      alias: "-d",
      describe:
        "Specify the directory that should be deleted. By default, if no --file argument is passed, the entire directory will be deleted. Otherwise, this argument will be used to located the images specified in --files for deletion.",
      type: "string",
      default: "images",
    }),
      yargs.option("files", {
        alias: "-f",
        describe:
          "Specify the file(s) that should be deleted. By default the image directory will be used, however if a --directory is specified, it will use the specified directory instead.",
        type: "array",
      });
  },

  handler: (argv) => {
    if (argv.directory === "images" && !argv.files) {
      console.log("The images directory cannot be deleted");
    } else if (argv.directory !== "images" && !argv.files) {
      deleteDir(argv.directory);
    } else if (argv.files) {
      argv.files.forEach((imageFile) => {
        deleteFile(imageFile, argv);
      });
    }
  },
};

module.exports = del;
