const path = require("path");

const checkFileExt = (file) => {
  const fileType = path.parse(file).ext;

  if (
    (fileType !== undefined && fileType.toLowerCase() === ".jpg") ||
    fileType.toLowerCase() === ".png" ||
    fileType.toLowerCase() === ".jpeg"
  ) {
    return true;
  } else {
    return false;
  }
};

const onlyJpgFilter = (file) => {
  const fileType = path.parse(file).ext;

  if (
    (fileType !== undefined && fileType.toLowerCase() === ".jpg") ||
    fileType.toLowerCase() === ".jpeg"
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = { onlyJpgFilter, checkFileExt };
