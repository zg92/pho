const checkPath = require("../pathUtils/checkPath");
const fs = require("fs");
const path = require("path");
const getExif = require("./getExif");
const log = require("../logUtils/consoleLogging");

const getMetrics = (customPath, extraData, options) => {
  if (checkPath(customPath)) {
    let c = 0;
    const fileList = [];

    fs.readdirSync(customPath).forEach((file) => {
      c++;
      if (extraData == false) {
        fileList.push(file);
      } else {
        fileList.push([file, getExif(path.join(customPath, file), options)]);
      }
    });
    log("inform", `${customPath} has ${c} files`);
    log("inform", "The files are:");
    fileList.forEach((file) => log("green", file));
  } else {
    log("inform", "The provided path does not exist");
  }
};

module.exports = getMetrics;
