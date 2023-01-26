const path = require("path");
const getMetrics = require("../utilities/imgUtils/getMetrics");
const getExif = require("../utilities/imgUtils/getExif");

const peek = {
  peek: "peek [dirName] [extra] [files] [options]",
  describe:
    "Peek at a directory and see metrics or a specific file data by including the `--files` option in conjuction with any specific fields you want to extract using `--option` and passing in an array.",
  builder: (yargs) => {
    yargs
      .positional("dirName", {
        type: "string",
        describe: "Specify the directory you want to peek at",
        default: 'images'
      })
      .option("exif", {
        alias: "e",
        type: "boolean",
        describe:
          "Specify if you would like returned files from the directory to include exif information (this arg is not considered when peeking at a specific file using --files).",
        default: false,
        nargs: 1,
      })
      .option("files", {
        alias: "f",
        type: "array",
        describe:
          "Specify the file name (e.g. file.jpg) you want to get the exif data from.",
      })
      .option("options", {
        alias: "o",
        type: "array",
        describe:
          "If you use the file arg, --options specify what exif data you want to retrieve by passing the needed info's name seperated by commas with no spacing. Options can be passed in all lowercase or using capitalization shown in the raw exif results.",
        default: "all",
      });
  },

  handler: (argv) => {
    if (!argv.files) {
      getMetrics(
        path.join(process.cwd(), 'phofiles', argv.dirName),
        argv.exif,
        argv.options
      );
    } else {
      argv.files.forEach((fileName) => {
        exifData = getExif(
          path.join(process.cwd(), 'phofiles', argv.dirName, fileName),
          argv.options
        );
        console.log(`Here is the exif data you requested for ${fileName}:`);
        console.log(exifData);
      });
    }
  },
};

module.exports = peek;
