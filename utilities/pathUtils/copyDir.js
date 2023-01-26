const fs = require("fs");
const path = require("path");
const copyFile = require("./copyFile");

const copyDir = (directory, destination) => {
  c = 0;
  fs.readdirSync(directory).forEach((file) => {
    const fileType = path.parse(file).ext
    if (fileType.toLowerCase() === ".jpg" || fileType.toLowerCase() === ".png" || fileType.toLowerCase() === ".jpeg") {
      copyFile([file], directory, destination);
      c++;
    }
  });
  console.log(
    `Directory has been copied to ${destination}. ${c} files have been copied`
  );
};

module.exports = copyDir;
