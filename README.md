# Crypto Card Image and Metadata Generator

This project is designed to generate unique NFT card images and corresponding metadata for the Crypto Card Arena project, which was submitted to the Chainlink Spring 2023 Hackathon. The tool combines different image layers and attributes to create unique cards for the NFT collection.

## Features

- **Image Generation**: Combines a base layer, score layer, and number pattern images with a random background color to create unique NFT cards.
- **Metadata Creation**: Generates JSON metadata for each NFT card with attributes including background color, number, and calculated score.
- **Customizable**: Easily adjust the number of images to generate, and configure attributes used for scoring and metadata.

## Configuration
- baseURI: Base URI for the image URL in the metadata.
- baseLayerPath: Path to the base image layer.
- scoreLayerPath: Path to the score image layer.
- numbersFolderPath: Path to the directory containing number pattern images.
- outputFolderPath: Path to the directory where generated images will be saved.
- numImages: Number of images to generate.

## Usage
1. Install Dependencies

```shell
npm i
```
2. Run the Script

```shell
node index.js
```
