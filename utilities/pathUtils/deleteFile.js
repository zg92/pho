const fs = require("fs");
const { dirPath } = require("./dir");
const { checkPath } = require("./checkPath");
const path = require("path");

const deleteFile = (filePath, argv) => {
  const filePathPreDeleted = path.join(
    dirPath,
    "files",
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

module.exports = { deleteFile };
