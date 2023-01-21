const fs = require("fs");
const path = require("path");
const { dirPath } = require("../../dir");
const { copyFile } = require("./copyFile");

const copyDir = (directory) => {
  c = 0;
  fs.readdirSync(directory).forEach((file) => {
    if (path.parse(file).ext === ".jpg" || path.parse(file).ext === ".png") {
      copyFile([file], directory);
      c++;
    }
  });
  console.log(
    `Directory has been copied to ${path.join(
      dirPath,
      "files/images"
    )}. ${c} files have been copied`
  );
};

module.exports = { copyDir };
