const fs = require("fs");
const copyFile = require("./copyFile");
const log = require("../logUtils/consoleLogging");
const { checkFileExt } = require("./imgExtCheck");
const { ProgressBar } = require("../processUtils/processBarProcess");
const getDirLength = require("./getDirLength");
const handleError = require("../errUtils/errorHandler");

const copyDirProcess = async (directory, destination, outputData, Progress) => {
  try {
    Progress.start();
    for (const file of fs.readdirSync(directory)) {
      if (checkFileExt(file)) {
        await copyFile([file], directory, destination);
        outputData.copied.push(file);
      } else {
        outputData.notCopied.push(file);
      }
      Progress.increment();
    }
    Progress.stop();
  } catch (err) {
    handleError(err);
  }
};

const copyDirLogging = (returnFiles) => {
  log("success", `${returnFiles.copied.length} files have been copied.`);
  log("inform", `The files copied were: `);
  console.log(returnFiles.copied);
  log("error", "The following files could not be copied: ");
  console.log(returnFiles.notCopied);
};

const copyDir = async (directory, destination) => {
  const returnFiles = { copied: [], notCopied: [] };
  const Progress = new ProgressBar(
    "Copying Directory",
    getDirLength(directory)
  );
  await copyDirProcess(directory, destination, returnFiles, Progress);
  copyDirLogging(returnFiles);
};

module.exports = copyDir;
