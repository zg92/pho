const fs = require("fs");
const path = require("path");
const copyFile = require("./copyFile");
const log = require("../logUtils/consoleLogging");

const copyDir = (directory, destination) => {
  returnFiles = { copied: [], notCopied: [] };
  c = 0;
  fs.readdirSync(directory).forEach((file) => {
    const fileType = path.parse(file).ext;
    if (
      fileType.toLowerCase() === ".jpg" ||
      fileType.toLowerCase() === ".png" ||
      fileType.toLowerCase() === ".jpeg"
    ) {
      copyFile([file], directory, destination);
      returnFiles.copied.push(file);
      c++;
    } else {
      returnFiles.notCopied.push(file);
    }
  });
  log("success", `${c} files have been copied.`);
  log("inform", `The files copied were: `);
  console.log(returnFiles.copied);
  log("error", "The following files could not be copied: ");
  console.log(returnFiles.notCopied);
};

module.exports = copyDir;
