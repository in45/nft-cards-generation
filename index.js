const fs = require('fs');
const Jimp = require('jimp');
const baseURI = 'https://example.com/images/';
const baseLayerPath = './base.png';
const scoreLayerPath = './value.png';
const numbersFolderPath = './numbers';
const outputFolderPath = './images';
const numImages = 1; // Number of images to generate

// Helper function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate a random hex color
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


async function generateImage(backgroundHexColor, baseLayerPath, numberImagePath, outputFilePath) {
  const baseLayer = await Jimp.read(baseLayerPath);
  const scoreLayer = await Jimp.read(scoreLayerPath);
  const numberImage = await Jimp.read(`${numberImagePath}`);

  const imageWidth = baseLayer.getWidth();
  const imageHeight = baseLayer.getHeight();

  const image = new Jimp(imageWidth, imageHeight, backgroundHexColor);
  image.composite(baseLayer, 0, 0);
  image.composite(scoreLayer, 0, 0);
  image.composite(numberImage, 0, 0);

  await image.writeAsync(outputFilePath);
}

// Calculate the score based on the provided attributes
function calculateScore(backgroundColor, number, numberPattern) {
  // Extract the red, green, and blue components from the background color
  const red = parseInt(backgroundColor.substr(1, 2), 16);
  const green = parseInt(backgroundColor.substr(3, 2), 16);
  const blue = parseInt(backgroundColor.substr(5, 2), 16);

  // Calculate the average color value
  const averageColor = (red + green + blue) / 3;

  // Calculate the score based on the average color, number, and numberPattern
  const score = Math.round(averageColor) + number * numberPattern;

  // Clamp the score between 1 and 200
  return Math.min(Math.max(score, 1), 200);
}

async function generateRandomImages(numNFTs) {
  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath);
  }

  for (let tokenId = 1; tokenId <= numNFTs; tokenId++) {
    const backgroundColor = getRandomColor();
    const number = getRandomNumber(1, 12);
    const numberPattern = getRandomNumber(1, 5);
    const numberImagePath = `patterns/${numberPattern}/${number}.png`;
    const outputFilePath = `${outputFolderPath}/image_${tokenId}.png`;
    const score = calculateScore(backgroundColor, number, numberPattern);

    await generateImage(backgroundColor, baseLayerPath, numberImagePath, outputFilePath);
    console.log(`Generated image ${tokenId}/${numImages}`);
      const metadata = {
    name : `CryptoCard N~${tokenId}`,
    description : `Default Description for NFT Card number ${tokenId}`,
    external_url: "https://website.io/",
    image: `${baseURI}${tokenId}`,
    attributes: {
      backgroundColor,
      number,
      numberPattern,
      score,
    },
  };

  const json = JSON.stringify(metadata, null, 2);
  fs.writeFileSync(`./metadata/card_${tokenId}.json`, json);

  console.log(`Generated metadata for NFT ${tokenId}`);
  }
}

generateRandomImages(numImages)
  .then(() => console.log('Image generation complete.'))
  .catch((error) => console.error('An error occurred:', error));
