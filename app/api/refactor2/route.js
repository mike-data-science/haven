import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const componentsDir = path.join(process.cwd(), 'components');
  const appDir = path.join(process.cwd(), 'app');
  const logs = [];

  const textMap = {
    '9xl': '7xl',
    '8xl': '6xl',
    '7xl': '5xl',
    '6xl': '4xl',
    '5xl': '4xl',
    '4xl': '3xl',
    '3xl': '2xl',
    '2xl': 'xl',
    'xl': 'lg',
    'lg': 'base',
    'base': 'sm',
    'sm': 'xs'
  };

  const validSteps = new Set([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96]);

  function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // 1. Revert previous [Xrem] back to 75% pixels.
    // e.g. [87.5rem] -> 87.5 * 16 * 0.75 = 1050px.
    content = content.replace(/\[(-?\d+(?:\.\d+)?)rem\]/g, (match, p1) => {
      const rem = parseFloat(p1);
      const px = Math.round(rem * 16 * 0.75);
      return `[${px}_TMP_PX]`;
    });

    // 2. Downscale existing explicit [Xpx] by 0.75
    content = content.replace(/\[(-?\d+(?:\.\d+)?)px\]/g, (match, p1) => {
      const px = parseFloat(p1);
      const newPx = Math.round(px * 0.75);
      return `[${newPx}_TMP_PX]`;
    });

    // 3. Downscale standard spacing utilities
    content = content.replace(/\b([pm][xytrbl]?-|gap-|w-|h-|top-|bottom-|left-|right-)(\d+)\b/g, (match, prefix, numStr) => {
      const num = parseInt(numStr, 10);
      const scaledNum = num * 0.75;
      if (validSteps.has(scaledNum)) {
        return `${prefix}${scaledNum}`;
      } else {
        // Fallback to explicit pixel value (scaledNum * 4)
        return `${prefix}[${Math.round(scaledNum * 4)}_TMP_PX]`;
      }
    });

    // 4. Downscale text sizes
    content = content.replace(/\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/g, (match, size) => {
      if (textMap[size]) {
        return `text-${textMap[size]}`;
      }
      return match;
    });

    // Clean up temporary markers
    content = content.replace(/_TMP_PX/g, 'px');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      logs.push(`Downscaled Tailwind classes in: ${filePath}`);
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
        processFile(fullPath);
      }
    }
  }

  walkDir(componentsDir);
  walkDir(appDir);

  return NextResponse.json({ success: true, logs });
}
