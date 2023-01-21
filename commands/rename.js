const yargs = require("yargs");
const path = require("path");
const { checkPath } = require("../utilities/pathUtils/checkPath");
const { dirPath } = require("../dir");
const {
  renameFileExecute,
  renameFilePath,
} = require("../utilities/pathUtils/renameFile");

const rename = yargs
  .command(
    "$0 <command> <image> <name> [add]",
    "Rename an existing file by passing in the file as the first argument, then the desired new name. The provided new name replaces the existing name by default, however the --a option enables you to append the end of the image's existing name.",
    (yargs) => {
      yargs.positional("image", {
        type: "string",
        describe: "The specific image you want to rename",
        nargs: 1,
      });
      yargs.positional("name", {
        type: "string",
        describe: "The desired new name of the image path provided",
        nargs: 1,
      });
      yargs.option("add", {
        alias: "a",
        describe:
          "Option that changes renaming behevior to append the provided name to the end of image's current name. Default behevior is to replace the image name.",
        type: "boolean",
        default: false,
      });
    },

    (argv) => {
      const imagePreRename = path.join(dirPath, "files", "images", argv.image);

      if (checkPath(imagePreRename)) {
        argv.add
          ? renameFileExecute(
              imagePreRename,
              path.parse(imagePreRename).name + argv.name
            )
          : renameFileExecute(imagePreRename, argv.name);
        console.log(
          `${imagePreRename} has been renamed to ${
            argv.add
              ? renameFilePath(
                  imagePreRename,
                  path.parse(imagePreRename).name + argv.name
                )
              : renameFilePath(imagePreRename, argv.name)
          }`
        );
      } else {
        console.log(
          `The provided image ${imagePreRename} name does not seem to exist`
        );
      }
    }
  )
  .help().argv;
