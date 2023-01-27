const fs = require("fs");
const path = require("path");
const log = require("../logUtils/consoleLogging");

const copyFile = (files, directory, dest) => {
  files.forEach((imageFile) => {
    fs.copyFileSync(
      path.join(directory, "/", imageFile),
      path.join(dest, "/", path.parse(imageFile).base),
      null,
      (err) => {
        if (err && err.code !== "EEXIST") {
          log("Error:", err);
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
};

module.exports = copyFile;
