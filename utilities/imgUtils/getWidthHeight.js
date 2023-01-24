const { getExif } = require("./getExif");

const getWidthHeight = async (img) => {
  const { imageSize } = await getExif(img, "all");
  return imageSize;
};

module.exports = { getWidthHeight };
