const fs = require("fs");
const path = require("path");
const copyFile = require("./copyFile");

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
  console.log(`${c} files have been copied:`);
  console.log("The files copied were:", returnFiles.copied);
  console.log(
    "The following files could not be copied:",
    returnFiles.notCopied
  );
};

module.exports = copyDir;
