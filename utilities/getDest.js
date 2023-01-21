const { dirPath } = require("../dir");
const path = require("path");
const { checkPath } = require("./checkPath");
const fs = require("fs");

const getDest = (dest, img, operationType) => {
  if (dest) {
    const fileObj = path.parse(img);
    fileName = path.join(
      fileObj.dir + "/" + `${fileObj.name}-${operationType}` + fileObj.ext
    );
    return fileName;
  } else {
    const newDirPath = path.join(dirPath, "files", `${operationType}`);
    if (!checkPath(newDirPath)) {
      fs.mkdirSync(newDirPath);
    }
    return path.join(newDirPath, path.parse(img).base);
  }
};

module.exports = { getDest };
