const yargs = require("yargs");
const { initClip } = require("../utilities/pathUtils/init.js");

const init = yargs
  .command("$0 <command>", "Initialize program", () => {
    initClip();
  })
  .help().argv;

module.exports = { init };
