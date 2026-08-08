import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import fs from 'fs/promises';
import path from 'path';

const pool = new Pool({ connectionString: process.env.DATABASE_URL || process.env.STORAGE_POSTGRES_URL || process.env.POSTGRES_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Preparing seed...');

  const rootDir = process.cwd();
  const libPropertiesDir = path.join(rootDir, 'lib', 'properties');
  const publicPropertiesDir = path.join(rootDir, 'public', 'properties');

  // 1. Handle a1 to a7
  console.log('Checking a1 to a7 folders...');
  for (let i = 1; i <= 7; i++) {
    const folderName = `a${i}`;
    const srcFolder = path.join(rootDir, folderName);
    const destFolder = path.join(libPropertiesDir, folderName);

    try {
      const stats = await fs.stat(srcFolder);
      if (stats.isDirectory()) {
        console.log(`Moving ${folderName} to lib/properties...`);
        // Ensure dest exists
        await fs.mkdir(destFolder, { recursive: true });
        
        // Move all files
        const files = await fs.readdir(srcFolder);
        for (const file of files) {
          await fs.rename(path.join(srcFolder, file), path.join(destFolder, file));
        }
        
        // Write a generic details.json if it doesn't exist
        const detailsPath = path.join(destFolder, 'details.json');
        try {
          await fs.access(detailsPath);
        } catch {
          const mockDetails = {
            title: `Modern Apartment ${i}`,
            description: "Beautiful new apartment recently added to the seed.",
            price: Math.floor(Math.random() * 50000 + 100000).toString(),
            rooms: (Math.floor(Math.random() * 3) + 1).toString(),
            area_sqm: (Math.floor(Math.random() * 50) + 40).toString(),
            floor: (Math.floor(Math.random() * 10) + 1).toString(),
          };
          await fs.writeFile(detailsPath, JSON.stringify(mockDetails, null, 2));
          console.log(`Generated details.json for ${folderName}`);
        }
        
        // Remove old folder
        await fs.rmdir(srcFolder).catch(() => {});
      }
    } catch (e) {
      // Folder doesn't exist or already moved
    }
  }

  // 2. Extract the last created apartment
  console.log('Extracting the last created apartment from the DB...');
  const lastProperty = await prisma.property.findFirst({
    orderBy: { createdAt: 'desc' },
    include: { images: true }
  });

  if (lastProperty) {
    const exportFolder = path.join(libPropertiesDir, 'latest_created');
    await fs.mkdir(exportFolder, { recursive: true });

    const exportDetails = {
      title: lastProperty.title,
      description: lastProperty.description,
      price: lastProperty.price.toString(),
      rooms: lastProperty.rooms.toString(),
      area_sqm: lastProperty.area.toString(),
      floor: lastProperty.floor.toString(),
    };

    await fs.writeFile(path.join(exportFolder, 'details.json'), JSON.stringify(exportDetails, null, 2));

    // Copy images from public
    let imgCount = 0;
    for (const img of lastProperty.images) {
      const imgName = path.basename(img.url);
      const srcPath = path.join(publicPropertiesDir, lastProperty.id.toString(), imgName);
      const destPath = path.join(exportFolder, imgName);
      
      try {
        await fs.copyFile(srcPath, destPath);
        imgCount++;
      } catch (err) {
        console.warn(`Could not copy image ${srcPath}:`, err.message);
      }
    }
    console.log(`Successfully extracted latest property "${lastProperty.title}" and ${imgCount} images to lib/properties/latest_created`);
  } else {
    console.log('No properties found in the DB to extract.');
  }

  console.log('Preparation complete. You can now run the seed-properties script!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
