const Configstore = require("configstore");
const packageJson = require("../../package.json");
const log = require("./consoleLogging");

const configGet = () => {
  const config = new Configstore(packageJson);
  return config;
};

const configSet = async (value) => {
  (await checkPath(value))
    ? config().set("baseDir", value)
    : log("error", "That path doesn't exist");
};

module.exports = configGet;
