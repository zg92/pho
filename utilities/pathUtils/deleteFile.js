const fs = require("fs");
const checkPath = require("./checkPath")
const path = require("path");
const config = require('../logUtils/log');
const getConfig = config().get('baseDir')

const deleteFile = (filePath, argv) => {
  const filePathPreDeleted = path.join(
    getConfig,
    "phofiles",
    argv.directory,
    filePath
  );
  if (checkPath(filePathPreDeleted)) {
    fs.unlink(filePathPreDeleted, (err) => {
      if (err) throw err;
      console.log(`File ${filePath} was successfully deleted`);
    });
  } else {
    console.log(`The file: ${filePath} does not exist.`);
  }
};

module.exports = deleteFile;
