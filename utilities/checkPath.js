const fs = require("fs");

const checkPath = (pathLocation) => {
  if (fs.existsSync(pathLocation)) {
    return true;
  } else {
    return false;
  }
};

module.exports = { checkPath };
