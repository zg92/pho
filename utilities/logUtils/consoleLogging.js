const colors = require("ansi-colors");

const log = (type, message) => {
  switch (type) {
    case "success":
      return console.log(colors.green.bold(message));
    case "inform":
      return console.log(colors.yellow.bold(message));
    case "error":
      return console.log(colors.red.bold(message));
  }
};

module.exports = log;
