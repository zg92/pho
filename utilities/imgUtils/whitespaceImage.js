const getWidthHeight = require("./getWidthHeight");
const resizeImage = require("./resizeImage");
const Jimp = require("jimp");
const path = require("path");
const handleError = require("../errUtils/errorHandler");
const config = require('../logUtils/log');
const getConfig = config().get('baseDir')


const createWhiteSpaceImage = (width, height) => {
  return new Jimp(width, height, "white");
};

const createResizedImage = async (img, size) => {
  await resizeImage(img, false, size, "bordered");
  return path.join(getConfig, "phofiles", "bordered", path.parse(img).base);
};

const createImageComposite = (
  backgroundImage,
  resizedImage,
  width,
  height,
  img
) => {
  const x = (width - resizedImage.bitmap.width) / 2;
  const y = (height - resizedImage.bitmap.height) / 2;

  backgroundImage.composite(resizedImage, x, y);
  return backgroundImage.writeAsync(
    path.join(getConfig, "phofiles", "bordered", path.parse(img).base)
  );
};

const whiteSpace = async (img, size, ig) => {
  try {

    let { width, height } = await getWidthHeight(img);

    ig === true ? size = 1.0 : size
    ig === true && height > width ? width = width * 1.2 : width

    const backgroundImage = createWhiteSpaceImage(width, height);
    const image = await createResizedImage(img, size);
    const resizedImage = await Jimp.read(image);
    await createImageComposite(
      backgroundImage,
      resizedImage,
      width,
      height,
      img,
      ig
    );
  } catch (err) {
    return handleError(err);
  }
};

module.exports = whiteSpace;
