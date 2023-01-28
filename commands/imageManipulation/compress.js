const resizeImage = require("../../utilities/imgUtils/resizeImage");
const path = require("path");
const fs = require("fs");
const config = require("../../utilities/logUtils/log");
const getConfig = config().get("baseDir");
const cliProgress = require("cli-progress");
const log = require("../../utilities/logUtils/consoleLogging");
const colors = require("ansi-colors");
const commandJSON = require("../commandData.json");

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
  handler: (argv) => {
    if (argv.files) {
      const progressBar = new cliProgress.SingleBar(
        {
          format:
            "CLI Progress |" +
            colors.green("{bar}") +
            "| {percentage}% || {value}/{total} Files",
        },
        cliProgress.Presets.shades_classic
      );
      progressBar.start(argv.files.length, 0);

      argv.files.forEach((imageFile) => {
        resizeImage(
          path.join(getConfig, argv.directory, imageFile),
          argv.inplace,
          Number(0.6),
          "compressed"
        );
        progressBar.increment();
      });
      progressBar.stop();
      log("success", "Compression has been completed for specified files.");
    } else if (!argv.files && argv.directory) {
      const len = fs.readdirSync(
        path.join(getConfig, "phofiles", argv.directory)
      ).length;
      const progressBar = new cliProgress.SingleBar(
        {
          format:
            "CLI Progress |" +
            colors.green("{bar}") +
            "| {percentage}% || {value}/{total} Chunks",
        },
        cliProgress.Presets.shades_classic
      );
      progressBar.start(len, 0);

      fs.readdirSync(path.join(getConfig, "phofiles", argv.directory)).forEach(
        (imageFile) => {
          resizeImage(
            path.join(getConfig, "phofiles", argv.directory, imageFile),
            argv.inplace,
            Number(0.6),
            "compressed"
          );
          progressBar.increment();
        }
      );
      progressBar.stop();
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
module.exports = compress;
