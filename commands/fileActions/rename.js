const path = require("path");
const checkPath = require("../../utilities/pathUtils/checkPath");
const config = require("../../utilities/logUtils/log");
const getConfig = config().get("baseDir");
const log = require("../../utilities/logUtils/consoleLogging");
const commandJSON = require("../commandData.json");

const {
  renameFileExecute,
  renameFilePath,
} = require("../../utilities/pathUtils/renameFile");

const rename = {
  command: commandJSON.rename.command,
  describe: commandJSON.rename.description,
  builder: (yargs) => {
    yargs.option("file", {
      alias: "f",
      type: "string",
      describe: commandJSON.rename.arguments.fileDesc,
      nargs: 1,
    });
    yargs.option("newName", {
      alias: "n",
      type: "string",
      describe: commandJSON.rename.arguments.newNameDesc,
      nargs: 1,
    });
    yargs.option("add", {
      alias: "a",
      describe: commandJSON.rename.arguments.addDesc,
      type: "boolean",
      default: false,
    });
  },

  handler: (argv) => {
    if (argv.newName && argv.file) {
      const imagePreRename = path.join(
        getConfig,
        "phofiles",
        "images",
        argv.file
      );

      if (checkPath(imagePreRename)) {
        argv.add
          ? renameFileExecute(
              imagePreRename,
              path.parse(imagePreRename).name + argv.newName
            )
          : renameFileExecute(imagePreRename, argv.name);
        log(
          "success",
          `${imagePreRename} has been renamed to ${
            argv.add
              ? renameFilePath(
                  imagePreRename,
                  path.parse(imagePreRename).name + argv.newName
                )
              : renameFilePath(imagePreRename, argv.newName)
          }`
        );
      } else {
        log(
          "inform",
          `The provided --image ${imagePreRename} does not seem to exist`
        );
      }
    } else {
      log(
        "inform",
        "You must provide an --image and --name to rename the image file to the provided --name."
      );
    }
  },
};

module.exports = rename;
