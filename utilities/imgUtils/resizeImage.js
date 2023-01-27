const checkPath = require("../pathUtils/checkPath");
const getWidthHeight = require("./getWidthHeight");
const getDest = require("../pathUtils/getDest");
const handleError = require("../errUtils/errorHandler");
const sharp = require("sharp");

const resizeImage = async (img, dest, newDim, operation) => {
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
      new Error("The image you provided does not seem to exist.")
    );
  }
};

module.exports = resizeImage;
