const fs = require("fs");
const path = require("path");
const handleError = require("../errUtils/errorHandler");
const log = require("../logUtils/consoleLogging");

const copyFileOption = async (directory, dest, files) => {
  files.forEach((imageFile) => {
    fs.copyFileSync(
      path.join(directory, "/", imageFile),
      path.join(dest, "/", path.parse(imageFile).base),
      null,
      (err) => {
        if (err && err.code !== "EEXIST") {
          handleError(err);
        } else {
          log(
            "success",
            `Image copied to ${path.join(
              getConfig,
              "/",
              "files",
              "images",
              imageFile
            )}`
          );
        }
      }
    );
  });
  return;
};

const copyFile = async (files, directory, dest) => {
  await copyFileOption(directory, dest, files);
  return;
};

module.exports = copyFile;
