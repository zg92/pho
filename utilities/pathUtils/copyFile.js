const fs = require("fs");
const path = require("path");

const copyFile = (files, directory, dest) => {
  files.forEach((imageFile) => {
    fs.copyFileSync(
      path.join(directory, "/", imageFile),
      path.join(dest, "/", path.parse(imageFile).base),
      fs.constants.COPYFILE_EXCL,
      (err) => {
        if (err) {
          console.log("Error:", err);
        } else {
          console.log(
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
