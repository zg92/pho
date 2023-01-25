const { dirPath } = require("../../utilities/pathUtils/dir");
const { resizeImage } = require("../../utilities/imgUtils/resizeImage");
const path = require("path");
const fs = require("fs");

const compress = {
  command: "compress [inplace] [directory] [files]",
  describe:
    "Compress all files in a directory, a single file, or multiple files",
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
      argv.files.forEach((imageFile) => {
        resizeImage(
          path.join(dirPath, "files", argv.directory, imageFile),
          argv.inplace,
          Number(0.6),
          "compressed"
        );
      });
    } else if (!argv.files && argv.directory) {
      console.log(path.join(dirPath, "files", argv.directory));
      fs.readdirSync(path.join(dirPath, "files", argv.directory)).forEach(
        (imageFile) => {
          resizeImage(
            path.join(dirPath, "files", argv.directory, imageFile),
            argv.inplace,
            Number(0.6),
            "compressed"
          );
        }
      );
    } else {
      console.log(
        "No directory or image files have been specified with --directory and/or --files."
      );
    }
  },
};
module.exports = compress;
