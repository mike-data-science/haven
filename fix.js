const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix broken syntax like [3px].5 or [3px].5.5
  content = content.replace(/([pm][xytrbl]?-|gap-|w-|h-|top-|bottom-|left-|right-)\[(\d+)px\](\.\d+)+/g, (match, prefix, px, decimals) => {
    // If it was p-[3px].5, the original integer was 1 (since 1 * 0.75 * 4 = 3)
    const originalInt = Math.round(parseInt(px, 10) / 3);
    // Return original class, e.g. p-1.5
    return `${prefix}${originalInt}${decimals.replace(/\.5\.5/g, '.5')}`; // Handle the weird double decimal if it happened
  });

  // Revert [Xpx] back to original
  content = content.replace(/([pm][xytrbl]?-|gap-|w-|h-|top-|bottom-|left-|right-)\[(\d+)px\]/g, (match, prefix, px) => {
    const originalInt = Math.round(parseInt(px, 10) / 3);
    return `${prefix}${originalInt}`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed corrupted syntax in: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx')) {
      fixFile(fullPath);
    }
  }
}

console.log('Scanning for corrupted Tailwind classes...');
walkDir(componentsDir);
console.log('Fix complete! You can now start Next.js.');
