const path = require("path");
const checkPath = require("./checkPath");
const fs = require("fs");
const { renameFilePath } = require("./renameFile");

const getDest = (dest, img, operationType) => {
  if (dest) {
    return renameFilePath(img, `${path.parse(img).name}-${operationType}`);
  } else {
    const newDirPath = path.join(process.cwd(), 'phofiles', operationType);
    if (!checkPath(newDirPath)) {
      fs.mkdirSync(newDirPath);
    }
    return path.join(newDirPath, path.parse(img).base);
  }
};

module.exports = getDest;
