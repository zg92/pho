const { dirPath } = require("../../dir");
const { checkPath } = require("./checkPath");
const fs = require("fs");
const path = require("path");

const deleteDir = (argv) => {
  const dirPathPreDeleted = path.join(dirPath, "files", argv.directory);
  if (checkPath(dirPathPreDeleted)) {
    fs.rm(dirPathPreDeleted, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`The directory at ${dirPathPreDeleted} has been deleted.`);
      }
    });
  } else {
    console.log("The directory specified does not exist.");
  }
};

module.exports = { deleteDir };
