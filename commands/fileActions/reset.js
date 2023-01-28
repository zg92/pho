const fs = require("fs");
const path = require("path");
const deleteDir = require("../../utilities/pathUtils/deleteDir");
const initPho = require("../../utilities/pathUtils/init");
const config = require("../../utilities/logUtils/log");
const getConfig = config().get("baseDir");
const log = require("../../utilities/logUtils/consoleLogging");
const commandJSON = require("../commandData.json");

const reset = {
  command: commandJSON.reset.command,
  describe: commandJSON.reset.description,
  builder: (yargs) => {
    yargs.option("directories", {
      alias: "d",
      describe: commandJSON.reset.arguments.directoriesDesc,
      type: "array",
    }),
      yargs.option("keep", {
        alias: "k",
        describe: commandJSON.reset.arguments.keepDesc,
        type: "boolean",
        default: true,
      });
  },

  handler: (argv) => {
    if (!argv.directories) {
      dirs = fs.readdirSync(path.join(getConfig, "phofiles"));
      dirs.forEach(async (dirPathPreDeleted) => {
        if (argv.keep) {
          if (dirPathPreDeleted !== "images") {
            deleteDir(dirPathPreDeleted);
          }
        } else {
          deleteDir(dirPathPreDeleted);
          initPho();
        }
      });
    } else {
      argv.directories.forEach(async (dirPathPreDeleted) => {
        deleteDir(dirPathPreDeleted);
        initPho();
      });
    }
    log("success", "All directories have been reset.");
  },
};

module.exports = reset;
