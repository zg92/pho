const { initClip } = require("../utilities/pathUtils/init.js");

const init = {
  command: "init",
  describe: "Initialize program",
  handler: () => {
    initClip();
  },
};

module.exports = init;
