const path = require("path");
const getMetrics = require("../../utilities/imgUtils/getMetrics");
const config = require("../../utilities/logUtils/log");
const getConfig = config().get("baseDir");
const log = require("../../utilities/logUtils/consoleLogging");
const commandJSON = require("../commandData.json");
const fs = require("fs");

const dirpeek = {
  command: commandJSON.dirPeek.command,
  describe: commandJSON.dirPeek.description,
  builder: (yargs) => {
    yargs.option("extra", {
      alias: "e",
      type: "boolean",
      describe: commandJSON.dirPeek.arguments.extra,
      default: false,
      nargs: 1,
    });
  },
  handler: (argv) => {
    const dirs = fs.readdirSync(path.join(getConfig, "phoFiles"));
    log("success", "The following directories currently exist:");
    dirs.forEach((dir) => {
      const dirPath = path.join(getConfig, "phoFiles", dir);
      log("inform", `\n***${dir.toUpperCase()}`);
      if (argv.extra) {
        getMetrics(dirPath, false, "all");
      }
    });
  },
};

module.exports = dirpeek;
