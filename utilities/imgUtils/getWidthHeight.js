const { getExif } = require("./getExif");

const getWidthHeight = (img) => {
  const { imageSize } = getExif(img, "all");
  return imageSize;
};

module.exports = { getWidthHeight };
