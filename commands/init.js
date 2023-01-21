const yargs = require("yargs");
const fs = require("fs");
const path = require("path");
const { dirPath } = require("../dir.js");

const init = yargs
  .command("$0 <command>", "Initialize program", () => {
    console.log("Connecting to the directory...");
    try {
      fs.mkdirSync(path.join(dirPath, "files"));
      console.log(
        `Created a directory at location: ${path.join(dirPath, "files")}`
      );
    } catch (err) {
      if (err.code == "EEXIST") {
        console.log(
          `You are connected to directory at ${path.join(dirPath, "files")}`
        );
      }
    }

    try {
      fs.mkdirSync(path.join(dirPath, "files", "images"));
      console.log(
        `Created a folder in the working directory called: ${path.join(
          dirPath,
          "files",
          "images"
        )}`
      );
    } catch (err) {
      if (err.code == "EEXIST") {
        return;
      }
    }
  })
  .help().argv;

module.exports = { init };
