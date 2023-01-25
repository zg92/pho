const exifParser = require("exif-parser");
const fs = require("fs");
const { handleError } = require("../errUtils/errorHandler");

const capitalizeOption = (option) => {
  return option[0].toUpperCase() + option.slice(1).toLowerCase();
};

const getOptions = (exifData, options) => {
  optionObject = {};
  options.forEach(
    (option) =>
      (optionObject[option.toLowerCase()] =
        option.toLowerCase() != "imagesize"
          ? exifData["tags"][capitalizeOption(option)]
          : exifData["imageSize"])
  );
  return optionObject;
};

const getExif = (img, options) => {
  try {
    const imageBuffer = fs.readFileSync(img);
    const parser = exifParser.create(imageBuffer);
    const exifData = parser.parse();
    if (!options.includes("all")) {
      return getOptions(exifData, options);
    } else {
      const { tags, imageSize } = exifData;
      return { tags, imageSize };
    }
  } catch (err) {
    return handleError(err);
  }
};

module.exports = { getExif };
