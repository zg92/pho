const fs = require("fs");
const path = require("path");
const { copyFile } = require("./copyFile");

const copyDir = (directory, destination) => {
  c = 0;
  fs.readdirSync(directory).forEach((file) => {
    if (path.parse(file).ext === ".jpg" || path.parse(file).ext === ".png") {
      copyFile([file], directory, destination);
      c++;
    }
  });
  console.log(
    `Directory has been copied to ${destination}. ${c} files have been copied`
  );
};

module.exports = { copyDir };
