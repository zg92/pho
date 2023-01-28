const resizeImage = require("../../utilities/imgUtils/resizeImage");
const path = require("path");
const fs = require("fs");
const config = require("../../utilities/logUtils/log");
const getConfig = config().get("baseDir");
const cliProgress = require("cli-progress");
const log = require("../../utilities/logUtils/consoleLogging");
const colors = require("ansi-colors");
const commandJSON = require("../commandData.json");

const resize = {
  command: commandJSON.resize.command,
  describe: commandJSON.resize.description,
  builder: (yargs) => {
    yargs.option("inplace", {
      alias: "i",
      type: "boolean",
      describe: commandJSON.resize.arguments.inplaceDesc,
      default: false,
      nargs: 1,
    }),
      yargs.option("directory", {
        alias: "d",
        type: "string",
        describe: commandJSON.resize.arguments.directoryDesc,
        default: "images",
        nargs: 1,
      }),
      yargs.option("files", {
        alias: "f",
        type: "array",
        describe: commandJSON.resize.arguments.filesDesc,
      }),
      yargs.option("resize", {
        alias: "r",
        type: "number",
        describe: commandJSON.resize.arguments.resizeDesc,
      });
  },
  handler: (argv) => {
    if (!argv.resize || argv.resize <= 0) {
      log(
        "inform",
        "You must input the resize factor (e.g. 0.5) to use this command. Size factor must be greater than 0."
      );
    } else {
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
            path.join(getConfig, "phofiles", argv.directory, imageFile),
            argv.inplace,
            argv.resize,
            "resized"
          );
          progressBar.increment();
        });
        progressBar.stop();
        log(
          "success",
          "Resize operation creation has been completed for specified files."
        );
      } else if (!argv.files && argv.directory) {
        const len = fs.readdirSync(
          path.join(getConfig, "phofiles", argv.directory)
        ).length;
        const progressBar = new cliProgress.SingleBar(
          {
            format:
              "CLI Progress |" +
              colors.green("{bar}") +
              "| {percentage}% || {value}/{total} Files",
          },
          cliProgress.Presets.shades_classic
        );
        progressBar.start(len, 0);
        fs.readdirSync(
          path.join(getConfig, "phofiles", argv.directory)
        ).forEach((imageFile) => {
          resizeImage(
            path.join(getConfig, "phofiles", argv.directory, imageFile),
            argv.inplace,
            argv.resize,
            "resized"
          );
          progressBar.increment();
        });
        progressBar.stop();
        log(
          "success",
          "Resize operation creation has been completed for .jpg files in the specified directory."
        );
      } else {
        log(
          "inform",
          "No directory or image files have been specified with --directory and/or --files."
        );
      }
    }
  },
};

module.exports = resize;
