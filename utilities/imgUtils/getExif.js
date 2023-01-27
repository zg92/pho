const exifParser = require("exif-parser");
const fs = require("fs");
const path = require("path");
const handleError = require("../errUtils/errorHandler");

const getOptions = (exifData, options) => {
  optionObject = {};
  options.forEach(
    (option) =>
      (optionObject[option] =
        option.toLowerCase() != "imagesize"
          ? exifData["tags"][option]
          : exifData["imageSize"])
  );
  return optionObject;
};

const lowercaseKeys = (exifObj) => {
  const keys = Object.keys(exifObj);
  let n = keys.length;
  const newObj = {};
  while (n--) {
    const key = keys[n];
    newObj[key.toLowerCase()] = exifObj[key];
  }
  return newObj;
};

const getExif = (img, options) => {
  try {
    if (path.parse(img).ext === ".jpg" || path.parse(img).ext === ".jpeg") {
      const imageBuffer = fs.readFileSync(img);
      const parser = exifParser.create(imageBuffer);
      const exifData = parser.parse();
      let { tags, imageSize } = exifData;
      tags = lowercaseKeys(tags);
      if (!options.includes("all")) {
        return getOptions({ tags, imageSize }, options);
      } else {
        return { tags, imageSize };
      }
    }
  } catch (err) {
    return handleError(err);
  }
};

module.exports = getExif;
