const checkPath = require("./checkPath");
const fs = require("fs");
const path = require("path");
const config = require("../logUtils/log");
const getConfig = config().get("baseDir");
const log = require("../logUtils/consoleLogging");

const deleteDir = async (directory) => {
  const dirPathPreDeleted = path.join(getConfig, "phofiles", directory);
  if (checkPath(dirPathPreDeleted)) {
    fs.rmSync(dirPathPreDeleted, { recursive: true }, (err) => {
      if (err) {
        log("error", err);
      } else {
        log(
          "success",
          `The directory at ${dirPathPreDeleted} has been deleted.`
        );
      }
    });
  } else {
    log("inform", "The directory specified does not exist.");
  }
};

module.exports = deleteDir;
