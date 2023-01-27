const prompts = require("prompts");
const initPho = require("../utilities/pathUtils/init.js");
const checkPath = require("../utilities/pathUtils/checkPath.js");
const config = require("../utilities/logUtils/log");
const figlet = require("figlet");
const log = require("../utilities/logUtils/consoleLogging");
const chalk = require("chalk");

const init = {
  command: "init",
  describe: "Initialize program",
  handler: async () => {
    console.log(
      chalk.blue.bold(
        figlet.textSync("Welcome to PHO", {
          font: "big",
          horizontalLayout: "default",
          verticalLayout: "default",
        })
      )
    );

    const baseDir = await prompts({
      type: "text",
      name: "value",
      message: chalk.white.bold(
        "What filepath do you want to create Pho's file system?"
      ),
    });

    if (checkPath(baseDir.value)) {
      await config().set("baseDir", baseDir.value);
      await initPho();
    } else {
      log("inform", "That path doesn't exist");
    }
  },
};

module.exports = init;
