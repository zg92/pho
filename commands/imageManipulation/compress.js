const resizeImage = require("../../utilities/imgUtils/resizeImage");
const path = require("path");
const fs = require("fs");
const config = require("../../utilities/logUtils/log");
const getConfig = config().get("baseDir");
const log = require("../../utilities/logUtils/consoleLogging");
const commandJSON = require("../commandData.json");
const { process } = require("../../utilities/processUtils/processBarProcess");
const getDirLength = require("../../utilities/pathUtils/getDirLength");

const compress = {
  command: commandJSON.compress.command,
  describe: commandJSON.compress.description,
  builder: (yargs) => {
    yargs.option("inplace", {
      alias: "i",
      type: "boolean",
      describe: commandJSON.compress.arguments.inplaceDesc,
      default: false,
      nargs: 1,
    }),
      yargs.option("directory", {
        alias: "d",
        type: "string",
        describe: commandJSON.compress.arguments.directoryDesc,
        default: "images",
        nargs: 1,
      }),
      yargs.option("files", {
        alias: "f",
        type: "array",
        describe: commandJSON.compress.arguments.filesDesc,
      });
  },
  handler: async (argv) => {
    if (argv.files) {
      await process(
        "Compress Images",
        argv.files,
        argv.files.length,
        (imageFile) => compressImages(argv, imageFile)
      );
      log("success", "Compression has been completed for specified files.");
    } else if (!argv.files && argv.directory) {
      const dirPath = path.join(getConfig, "phofiles", argv.directory);
      await process(
        "Compress Images",
        fs.readdirSync(dirPath),
        getDirLength(dirPath),
        (imageFile) => compressImages(argv, imageFile)
      );
      log(
        "success",
        "Compression has been completed for specified directories."
      );
    } else {
      log(
        "error",
        "No directory or image files have been specified with --directory and/or --files."
      );
    }
  },
};

const compressImages = async (argv, imageFile = "") => {
  await resizeImage(
    path.join(getConfig, "phofiles", argv.directory, imageFile),
    argv.inplace,
    Number(0.6),
    "compressed"
  );
};

module.exports = compress;
