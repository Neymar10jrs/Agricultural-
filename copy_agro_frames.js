const fs = require('fs');
const path = require('path');

const srcDir = 'C:/bob/Agro';
const destDir = path.join(__dirname, 'public', 'agro-animation');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Get and sort files numerically
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));

// Natural numerical sort (e.g. ezgif-frame-001.jpg, ezgif-frame-002.jpg)
files.sort((a, b) => {
  const numA = parseInt(a.replace(/[^0-9]/g, ''), 10);
  const numB = parseInt(b.replace(/[^0-9]/g, ''), 10);
  return numA - numB;
});

console.log(`Found ${files.length} frames in ${srcDir}. Starting copy to ${destDir}...`);

let copiedCount = 0;
for (const file of files) {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  fs.copyFileSync(srcFile, destFile);
  copiedCount++;
}

console.log(`Successfully copied ${copiedCount} animation frames.`);
const destFiles = fs.readdirSync(destDir);
console.log(`Destination public/agro-animation contains ${destFiles.length} files.`);
console.log(`First file: ${destFiles[0]}, Last file: ${destFiles[destFiles.length - 1]}`);
