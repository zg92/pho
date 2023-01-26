const initPho = require("../utilities/pathUtils/init.js");

const init = {
  command: "init",
  describe: "Initialize program",
  handler: () => {
    initPho();
  },
};

module.exports = init;
