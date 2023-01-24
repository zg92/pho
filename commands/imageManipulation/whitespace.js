const path = require("path");
const yargs = require("yargs");
const { whiteSpace } = require("../../utilities/imgUtils/whitespaceImage");
const { dirPath } = require("../../dir");

const whitespace = yargs
  .command(
    "$0 <command> [inplace] [directory] [files] [size] [ig]",
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
        yargs.option("size", {
          alias: "s",
          type: "number",
          describe:
            "Required parameter that lets you set the percentage you want to resize the image by.",
        });
      yargs.option("ig", {
        alias: "ig",
        type: "boolean",
        describe: "Creates a whitespace 4x5 crop used for upload to IG.",
        default: true,
      });
    },
    (argv) => {
      if (!argv.size) {
        console.log(
          "You must input the resize factor (e.g. 0.5) to use this command"
        );
      } else {
        if (argv.files) {
          argv.files.forEach((imageFile) => {
            whiteSpace(
              path.join(dirPath, "files", argv.directory, imageFile),
              argv.size
            );
          });
        } else if (!argv.files && argv.directory) {
          fs.readdirSync(path.join(dirPath, "files", argv.directory)).forEach(
            (imageFile) => {
              argv.files.forEach((imageFile) => {
                whiteSpace(
                  path.join(dirPath, "files", argv.directory, imageFile),
                  argv.size
                );
              });
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
