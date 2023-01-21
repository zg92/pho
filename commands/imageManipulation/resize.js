const yargs = require("yargs");
const { dirPath } = require("../../dir");
const { resizeImage } = require("../../utilities/imgUtils/resizeImage");
const path = require("path");
const fs = require("fs");

const compress = yargs
  .command(
    "$0 <command> [inplace] [directory] [files] [resize]",
    "Compress all files in a directory, a single file, or multiple files",
    (yargs) => {
      yargs.option("inplace", {
        alias: "i",
        type: "boolean",
        describe:
          "Flag that lets you perform the compressor operation within the same folder as the specified --directory or --file. By default this value is set to false, so a copy folder will be created containing the processed photos.",
        default: false,
        nargs: 1,
      }),
        yargs.option("directory", {
          alias: "d",
          type: "string",
          describe:
            "Optional parameter that will perform the image resize on an entire directory. If the --file option is also set, the `--directory` will be used to locate the target --file(s).",
          default: "images",
          nargs: 1,
        }),
        yargs.option("files", {
          alias: "f",
          type: "array",
          describe:
            "Optional parameter that will perform the image resize on the image(s) specified. A single or multiple image files can be entered.",
        }),
        yargs.option("resize", {
          alias: "r",
          type: "number",
          describe:
            "required parameter that lets you set the percentage you want to resize the image by.",
        });
    },
    (argv) => {
      if (!argv.resize) {
        console.log(
          "You must input the resize factor (e.g. 0.5) to use this command"
        );
      } else {
        if (argv.files) {
          argv.files.forEach((imageFile) => {
            resizeImage(
              path.join(dirPath, "files", argv.directory, imageFile),
              argv.inplace,
              argv.resize,
              "resized"
            );
          });
        } else if (!argv.files && argv.directory) {
          fs.readdirSync(path.join(dirPath, "files", argv.directory)).forEach(
            (imageFile) => {
              resizeImage(
                path.join(dirPath, "files", argv.directory, imageFile),
                argv.inplace,
                argv.resize,
                "resized"
              );
            }
          );
        } else {
          console.log(
            "No directory or image files have been specified with --directory and/or --files."
          );
        }
      }
    }
  )
  .help().argv;
