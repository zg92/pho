const fs = require("fs");
const path = require("path");
const { deleteDir } = require("../utilities/pathUtils/deleteDir");
const { initPho } = require("../utilities/pathUtils/init");

const reset = {
  command: "reset [directories] [keep]",
  describe:
    "Rename an existing file by passing in the file as the first argument, then the desired new name. The provided new name replaces the existing name by default, however the --a option enables you to append the end of the image's existing name.",
  builder: (yargs) => {
    yargs.option("directories", {
      alias: "d",
      describe:
        "Optional argument enabling you to specify the directories you would like to reset.",
      type: "array",
    }),
    
    yargs.option("keep", {
      alias: "k",
      describe:
        "By default resetting Pho will retain the images in the images directory. Setting --keep to false will remove all content in the images directory.",
      type: "boolean",
      default: true,
    })
  },

  handler: (argv) => {

    if (!argv.directories) {
    dirs = fs.readdirSync(path.join(process.cwd(), 'phofiles'));
    dirs.forEach(async (dirPathPreDeleted) => {
      if (argv.keep) {
        if (dirPathPreDeleted !== 'images') {
          deleteDir(dirPathPreDeleted);
        }
      } else {
        deleteDir(dirPathPreDeleted);
        initPho();
      }
    });
  }
  else {
    argv.directories.forEach(async (dirPathPreDeleted) => {
      if (dirPathPreDeleted !== 'images') {
        deleteDir(dirPathPreDeleted);
      }
  })
}
}}

module.exports = reset;
