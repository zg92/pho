const { checkPath } = require("../pathUtils/checkPath");
const { getWidthHeight } = require("./getWidthHeight");
const { getDest } = require("../pathUtils/getDest");
const path = require("path");
const { handleError } = require("../errUtil/errorHandler");
const Jimp = require("jimp");

const resizeImage = async (img, dest, newDim, operation) => {
  if (checkPath(img)) {
    try {
      const { width, height } = await getWidthHeight(img);
      const resizeImage = await Jimp.read(img);
      resizeImage.resize(width * newDim, height * newDim);
      await resizeImage.writeAsync(getDest(dest, img, operation));
      console.log(
        `Image ${
          path.parse(img).base
        } has been ${operation} and has been saved in ${getDest(
          dest,
          img,
          operation
        )}`
      );
      return;
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
