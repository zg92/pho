const { checkPath } = require("../pathUtils/checkPath");
const sharp = require("sharp");
const { getWidthHeight } = require("./getWidthHeight");
const { getDest } = require("../pathUtils/getDest");
const path = require("path");
const { handleError } = require("../errUtil/errorHandler");

const resizeImage = async (img, dest, newDim, operation) => {
  if (checkPath(img)) {
    try {
      const widthHeight = await getWidthHeight(img);
      const output = sharp(img)
        .resize(null, Math.round(widthHeight.width * newDim, 0))
        .toFile(getDest(dest, img, operation));
      console.log(
        `Image ${
          path.parse(img).base
        } has been ${operation} and has been saved in ${getDest(
          dest,
          img,
          operation
        )}`
      );
      return output;
    } catch (err) {
      return handleError(err);
    }
  } else {
    return handleError(
      new Error("The image you provided does not seem to exist.")
    );
  }
};

module.exports = { resizeImage };
