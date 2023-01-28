const getWidthHeight = require("./getWidthHeight");
const resizeImage = require("./resizeImage");
const sharp = require("sharp");
const path = require("path");
const handleError = require("../errUtils/errorHandler");
const config = require("../logUtils/log");
const { onlyJpgFilter } = require("../pathUtils/imgExtCheck");
const getConfig = config().get("baseDir");

const createWhiteSpaceImage = async (width, height) => {
  return sharp({
    create: {
      width: Math.round(width),
      height: Math.round(height),
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  });
};

const createImageComposite = async (
  backgroundImage,
  resizedImage,
  width,
  height,
  img
) => {
  const { width: resizedWidth, height: resizedHeight } = await sharp(
    resizedImage
  ).metadata();

  const x = (width - resizedWidth) / 2;
  const y = (height - resizedHeight) / 2;

  backgroundImage
    .composite([
      {
        input: resizedImage,
        left: Math.round(x),
        top: Math.round(y),
      },
    ])
    .toFile(path.join(getConfig, "phofiles", "bordered", path.parse(img).base));
};

const whiteSpace = async (img, size, ig) => {
  if (onlyJpgFilter(img)) {
    try {
      let { width, height } = await getWidthHeight(img);

      ig === true ? (size = 1) : size;
      ig === true && height > width ? (width = width * 1.2) : width;

      const backgroundImage = await createWhiteSpaceImage(width, height);
      const resizedImage = await resizeImage(img, false, size, "bordered");

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
  }
};

module.exports = whiteSpace;
