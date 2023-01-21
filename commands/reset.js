const yargs = require("yargs");
const { dirPath } = require("../dir");
const fs = require("fs");
const path = require("path");
const { deleteDir } = require("../utilities/pathUtils/deleteDir");
const { initClip } = require("../utilities/pathUtils/init");

const reset = yargs
  .command(
    "$0 <command> [keep]",
    "Rename an existing file by passing in the file as the first argument, then the desired new name. The provided new name replaces the existing name by default, however the --a option enables you to append the end of the image's existing name.",
    (yargs) => {
      yargs.option("keep", {
        alias: "k",
        describe:
          "By default resetting CLIP will retain the images directory. Setting --keep to false will remove all content in the images directory.",
        type: "boolean",
        default: true,
      });
    },

    (argv) => {
      dirs = fs.readdirSync(path.join(dirPath, "files"));
      dirs.forEach(async (dirPathPreDeleted) => {
        if (argv.keep) {
          if (dirPathPreDeleted !== "images") {
            deleteDir(dirPathPreDeleted);
          }
        } else {
          await deleteDir(dirPathPreDeleted);
          initClip();
        }
      });
    }
  )
  .help().argv;
