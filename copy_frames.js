const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/Rohit/.gemini/antigravity/brain/e3ce870c-266d-46c1-8f64-a9600c97d2a7/.user_uploaded';
const targetDir = 'C:/Users/Rohit/.gemini/antigravity/scratch/bkin/public/frames';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = [
  'media_1789721056930.jpg',
  'media_1789721056931.jpg',
  'media_1789721056944.jpg',
  'media_1789721057119.jpg',
  'media_1789721057167.jpg'
];

files.forEach((file, idx) => {
  const padded = String(idx + 1).padStart(3, '0');
  const target = path.join(targetDir, `frame_${padded}.jpg`);
  fs.copyFileSync(path.join(srcDir, file), target);
  console.log(`Copied ${file} -> frame_${padded}.jpg`);
});

console.log('Finished copying frames successfully.');
