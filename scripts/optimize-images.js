const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public');
const OUTPUT_DIR = INPUT_DIR;

const supportedFormats = ['.jpg', '.jpeg', '.png'];

function walkDir(dir, fileCallback) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      walkDir(fullPath, fileCallback);
    } else {
      fileCallback(fullPath);
    }
  });
}

function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!supportedFormats.includes(ext)) return;

  const fileName = path.basename(filePath, ext);
  const dirName = path.dirname(filePath);

  const outputWebp = path.join(dirName, `${fileName}.webp`);
  const outputAvif = path.join(dirName, `${fileName}.avif`);

  sharp(filePath)
    .resize({ width: 1920 })
    .toFormat('webp', { quality: 75 })
    .toFile(outputWebp, err => {
      if (err) console.error('WebP Error:', err);
    });

  sharp(filePath)
    .resize({ width: 1920 })
    .toFormat('avif', { quality: 50 })
    .toFile(outputAvif, err => {
      if (err) console.error('AVIF Error:', err);
    });
}

walkDir(INPUT_DIR, optimizeImage);
