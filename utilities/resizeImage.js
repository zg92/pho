const { checkPath } = require("./checkPath");
const sharp = require("sharp");
const { getWidthHeight } = require("./getWidthHeight");
const { getDest } = require("./getDest");
const path = require("path");

const resizeImage = async (img, dest, newDim, operation) => {
  if (checkPath(img)) {
    try {
      const widthHeight = getWidthHeight(img);
      sharp(img)
        .resize(null, Math.round(widthHeight.width * newDim, 0))
        .toFile(getDest(dest, img, operation), (err, info) => {
          if (!err) {
            console.log(
              `Image ${
                path.parse(img).base
              } has been ${operation} and has been saved in ${getDest(
                dest,
                img,
                operation
              )} `
            );
          } else {
            console.log(err);
          }
        });
    } catch (err) {
      console.log("Compressor error:", err.message);
    }
  } else {
    console.log("The image you provided does not seem to exist.");
  }
};

module.exports = { resizeImage };
