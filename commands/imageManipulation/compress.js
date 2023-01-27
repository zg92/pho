const resizeImage = require("../../utilities/imgUtils/resizeImage");
const path = require("path");
const fs = require("fs");
const config = require("../../utilities/logUtils/log");
const getConfig = config().get("baseDir");
const cliProgress = require("cli-progress");
const log = require("../../utilities/logUtils/consoleLogging");
const colors = require("ansi-colors");

const compress = {
  command: "compress [inplace] [directory] [files]",
  describe:
    "Compress all .jpg files in a directory, a single file, or multiple files",
  builder: (yargs) => {
    yargs.option("inplace", {
      alias: "i",
      type: "boolean",
      describe:
        "Flag that lets you perform the compressor operation in place. By default this value is set to false, so a copy folder will be created containing the processed photos.",
      default: false,
      nargs: 1,
    }),
      yargs.option("directory", {
        alias: "d",
        type: "string",
        describe:
          "Optional parameter that will perform the image compression on an entire directory. If the --file option is also set, the `--directory` will be used to locate the target --file(s).",
        default: "images",
        nargs: 1,
      }),
      yargs.option("files", {
        alias: "f",
        type: "array",
        describe:
          "Optional parameter that will perform the image compression on the image(s) specified. A single or multiple image files can be entered.",
      });
  },
  handler: (argv) => {
    if (argv.files) {
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
