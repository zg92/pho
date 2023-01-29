const fs = require("fs");
const handleError = require("../errUtils/errorHandler");

const getDirLength = (dir) => {
  try {
    if (dir) {
      return fs.readdirSync(dir).length;
    } else {
      return 0;
    }
  } catch (err) {
    handleError(err);
  }
};

module.exports = getDirLength;
