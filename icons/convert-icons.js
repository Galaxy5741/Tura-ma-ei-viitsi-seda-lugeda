#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple conversion by renaming - Chrome can handle JPG
const icons = [
  { src: '16x16.jpg', dest: 'icon16.png' },
  { src: '48x48.jpg', dest: 'icon48.png' },
  { src: '128x128.jpg', dest: 'icon128.png' }
];

console.log('🎨 Converting icons...\n');

icons.forEach(({ src, dest }) => {
  const srcPath = path.join(__dirname, src);
  const destPath = path.join(__dirname, dest);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Created ${dest}`);
  } else {
    console.log(`✗ Source file not found: ${src}`);
  }
});

console.log('\n🎉 Done! Extension icons are ready!');
console.log('\nNext steps:');
console.log('1. Go to chrome://extensions/');
console.log('2. Find "Quick Summarizer"');
console.log('3. Click the reload icon ↻');
console.log('4. Your ADHD icons will appear!');
