const { getWidthHeight } = require("./getWidthHeight");
const { resizeImage } = require("./resizeImage");
const Jimp = require("jimp");
const path = require("path");
const { dirPath } = require("../pathUtils/dir");
const { handleError } = require("../errUtils/errorHandler");

const runImageChecks = (ig, height, width) => {
  if (ig === true) {
    size = 1.0;
  }

  if (height > width) {
    width = width * 1.2;
  }
};

const createWhiteSpaceImage = (width, height) => {
  return new Jimp(width, height, "white");
};

const createResizedImage = async (img, size) => {
  await resizeImage(img, false, size, "whitespaced");
  return path.join(dirPath, "files", "whitespaced", path.parse(img).base);
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
    path.join(dirPath, "files", "whitespaced", path.parse(img).base)
  );
};

const whiteSpace = async (img, size, ig) => {
  try {
    const { width, height } = await getWidthHeight(img);
    runImageChecks(ig, height, width);
    const backgroundImage = createWhiteSpaceImage(width, height, ig);
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

module.exports = { whiteSpace };
