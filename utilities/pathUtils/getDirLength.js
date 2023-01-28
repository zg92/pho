const fs = require("fs");

const getDirLength = (dir) => {
  if (dir) {
    return fs.readdirSync(dir).length;
  } else {
    return 0;
  }
};

module.exports = getDirLength;
