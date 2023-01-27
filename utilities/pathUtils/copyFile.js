const fs = require("fs");
const path = require("path");
const handleError = require("../errUtils/errorHandler");
const log = require("../logUtils/consoleLogging");

const copyFile = (files, directory, dest) => {
  const progressBar = new cliProgress.SingleBar(
    {
      format:
        "CLI Progress |" +
        colors.green("{bar}") +
        "| {percentage}% || {value}/{total} Chunks",
    },
    cliProgress.Presets.shades_classic
  );
  progressBar.start(argv.files.length, 0);

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
    progressBar.increment();
  });
  progressBar.stop();
};

module.exports = copyFile;
