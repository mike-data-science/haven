import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const componentsDir = path.join(process.cwd(), 'components');
  const appDir = path.join(process.cwd(), 'app');
  const logs = [];

  function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regex to find arbitrary pixel values like [17px], [1400px], [-10px]
    // Tailwind uses `[-10px]` or `-top-[10px]`.
    const regex = /\[(-?\d+(?:\.\d+)?)px\]/g;
    
    let changed = false;
    const newContent = content.replace(regex, (match, p1) => {
      const px = parseFloat(p1);
      const rem = px / 16;
      changed = true;
      return `[${rem}rem]`;
    });

    if (changed) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      logs.push(`Converted px to rem in: ${filePath}`);
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
