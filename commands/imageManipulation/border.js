const path = require("path");
const { whiteSpace } = require("../../utilities/imgUtils/whitespaceImage");
const { dirPath } = require("../../dir");
const fs = require("fs");

const border = {
  command: "border [inplace] [directory] [files] [size] [ig]",
  describe:
    "Compress all files in a directory, a single file, or multiple files",
  builder: (yargs) => {
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
          "Required parameter that lets you set the percentage you want to resize the image by. Anything greater than 1 will crop the output image and increase the images width and height.",
      });
    yargs.option("igify", {
      alias: "ig",
      type: "boolean",
      describe: "Creates a whitespace 4x5 crop used for upload to IG.",
      default: true,
    });
  },
  handler: (argv) => {
    if (!argv.size) {
      console.log(
        "You must input the resize factor (e.g. 0.5) to use this command."
      );
    } else {
      if (argv.files) {
        argv.files.forEach((imageFile) => {
          whiteSpace(
            path.join(dirPath, "files", argv.directory, imageFile),
            argv.size,
            argv.igify
          );
        });
      } else if (!argv.files && argv.directory) {
        fs.readdirSync(path.join(dirPath, "files", argv.directory)).forEach(
          (imageFile) => {
            whiteSpace(
              path.join(dirPath, "files", argv.directory, imageFile),
              argv.size,
              argv.igify
            );
          }
        );
      } else {
        console.log(
          "No directory or image files have been specified with --directory and/or --files."
        );
      }
    }
  },
};

module.exports = border;
