const checkPath = require("../pathUtils/checkPath");
const getWidthHeight = require("./getWidthHeight");
const getDest = require("../pathUtils/getDest");
const handleError = require("../errUtils/errorHandler");
const sharp = require("sharp");
const path = require("path");
const log = require("../logUtils/consoleLogging");
const { onlyJpgFilter } = require("../pathUtils/imgExtCheck");

const resizeImage = async (img, dest, newDim, operation) => {
  if (onlyJpgFilter(img)) {
    if (checkPath(img)) {
      try {
        const { height, width } = await getWidthHeight(img);
        const resizedImage = sharp(img).resize({
          width: Math.round(width * newDim),
          height: Math.round(height * newDim),
        });
        await resizedImage.toFile(getDest(dest, img, operation));
        return resizedImage.toBuffer();
      } catch (err) {
        return handleError(err);
      }
    } else {
      return handleError(
        new Error(
          log("error", `The ${img} you provided does not seem to exist.`)
        )
      );
    }
  }
};

module.exports = resizeImage;
