const fs = require('fs');
const Jimp = require('jimp');

const baseLayerPath = './base.png';
const scoreLayerPath = './value.png';
const numbersFolderPath = './numbers';
const outputFolderPath = './output';

function getRandomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function getRandomNumberImage() {
  const numberFiles = fs.readdirSync(numbersFolderPath);
  const randomIndex = Math.floor(Math.random() * numberFiles.length);
  return numberFiles[randomIndex];
}

async function generateImage(backgroundHexColor, baseLayerPath, numberImagePath, outputFilePath) {
  const baseLayer = await Jimp.read(baseLayerPath);
  const scoreLayer = await Jimp.read(scoreLayerPath);
  const numberImage = await Jimp.read(`${numbersFolderPath}/${numberImagePath}`);

  const imageWidth = baseLayer.getWidth();
  const imageHeight = baseLayer.getHeight();

  const image = new Jimp(imageWidth, imageHeight, backgroundHexColor);
  image.composite(baseLayer, 0, 0);
  image.composite(scoreLayer, 0, 0);
  image.composite(numberImage, 0, 0);

  await image.writeAsync(outputFilePath);
}

async function generateRandomImages(numImages) {
  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath);
  }

  for (let i = 0; i < numImages; i++) {
    const backgroundHexColor = getRandomHexColor();
    const numberImagePath = getRandomNumberImage();
    const outputFilePath = `${outputFolderPath}/image_${i + 1}.png`;

    await generateImage(backgroundHexColor, baseLayerPath, numberImagePath, outputFilePath);
    console.log(`Generated image ${i + 1}/${numImages}`);
  }
}

const numImages = 10; // Number of images to generate
generateRandomImages(numImages)
  .then(() => console.log('Image generation complete.'))
  .catch((error) => console.error('An error occurred:', error));
