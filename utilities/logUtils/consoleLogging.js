const chalk = require("chalk");

const log = (type, message) => {
  switch (type) {
    case "success":
      return console.log(chalk.green.bold(message));
    case "inform":
      return console.log(chalk.yellow.bold(message));
    case "error":
      return console.log(chalk.red.bold(message));
  }
};

module.exports = log;
