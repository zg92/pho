const { checkPath } = require("./checkPath");
const fs = require("fs");
const path = require("path");
const { getExif } = require("./getExif");

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
    console.log(`${customPath} has ${c} files`);
    console.log("The files are:");
    fileList.forEach((file) => console.log(file));
  } else {
    console.log("The provided path does not exist");
  }
};

module.exports = { getMetrics };
