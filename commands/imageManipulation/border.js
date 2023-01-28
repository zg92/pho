const path = require("path");
const whiteSpace = require("../../utilities/imgUtils/whitespaceImage");
const fs = require("fs");
const config = require("../../utilities/logUtils/log");
const getConfig = config().get("baseDir");
const log = require("../../utilities/logUtils/consoleLogging");
const cliProgress = require("cli-progress");
const colors = require("ansi-colors");
const commandJSON = require("../commandData.json");

const border = {
  command: commandJSON.border.command,
  describe: commandJSON.border.description,
  builder: (yargs) => {
    yargs.option("inplace", {
      alias: "i",
      type: "boolean",
      describe: commandJSON.border.arguments.inplaceDesc,
      default: false,
      nargs: 1,
    }),
      yargs.option("directory", {
        alias: "d",
        type: "string",
        describe: commandJSON.border.arguments.directoryDesc,
        default: "images",
        nargs: 1,
      }),
      yargs.option("files", {
        alias: "f",
        type: "array",
        describe: commandJSON.border.arguments.filesDesc,
      }),
      yargs.option("size", {
        alias: "s",
        type: "number",
        describe: commandJSON.border.arguments.sizeDesc,
      });
    yargs.option("igify", {
      alias: "ig",
      type: "boolean",
      describe: "Creates a whitespace 4x5 crop used for upload to IG.",
      default: false,
    });
  },
  handler: async (argv) => {
    if (!argv.size && argv.igify === false) {
      log(
        "inform",
        "You must input the resize factor (e.g. 0.5) to use this command."
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
        promises = argv.files.map(async (imageFile) => {
          await whiteSpace(
            path.join(getConfig, imageFile),
            argv.size,
            argv.igify
          );
          progressBar.increment();
        });
        await Promise.all(promises);
        progressBar.stop();
        log(
          "success",
          "Border creation has been completed for specified folder."
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
        const promises = fs
          .readdirSync(path.join(getConfig, "phofiles", argv.directory))
          .map(async (imageFile) => {
            await whiteSpace(
              path.join(getConfig, "phofiles", argv.directory, imageFile),
              argv.size,
              argv.igify
            );
            progressBar.increment();
          });

        await Promise.all(promises);
        progressBar.stop();
        log(
          "success",
          "Border creation has been completed for specified directory."
        );
      } else {
        log(
          "error",
          "No directory or image files have been specified with --directory and/or --files."
        );
      }
    }
  },
};

module.exports = border;
