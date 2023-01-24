const { getWidthHeight } = require("./getWidthHeight");
const { resizeImage } = require("./resizeImage");
const Jimp = require("jimp");
const path = require("path");
const { dirPath } = require("../../dir");

const createWhiteSpaceImage = (width, height) => {
  return new Jimp(width, height, "white");
};

const createResizedImage = async (img, size) => {
  await resizeImage(img, false, size, "whitespace");
  return path.join(dirPath, "files", "whitespace", path.parse(img).base);
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
    path.join(dirPath, "files", "whitespace", path.parse(img).base)
  );
};

const whiteSpace = async (img, size) => {
  const { width, height } = await getWidthHeight(img);
  const backgroundImage = createWhiteSpaceImage(width, height);
  const image = await createResizedImage(img, size);
  const resizedImage = await Jimp.read(image);

  createImageComposite(backgroundImage, resizedImage, width, height, img);
};

module.exports = { whiteSpace };
