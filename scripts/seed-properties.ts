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
  console.log('Starting property seed...');

  // 1. Get or create a User to own the properties
  let user = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!user) {
    user = await prisma.user.findFirst();
  }
  if (!user) {
    console.error('No users found in the database. Please sign up at least one user before seeding.');
    return;
  }
  console.log(`Using User ID ${user.id} as the property owner.`);

  // 2. Get or create a default Category
  let category = await prisma.category.findFirst({ where: { name: 'Apartment' } });
  if (!category) {
    category = await prisma.category.create({
      data: { name: 'Apartment', slug: 'apartment' }
    });
  }

  // 3. Define paths
  const propertiesDir = path.join(process.cwd(), 'lib', 'properties');
  const publicPropertiesDir = path.join(process.cwd(), 'public', 'properties');

  // Ensure public/properties directory exists
  try {
    await fs.mkdir(publicPropertiesDir, { recursive: true });
  } catch (err) {
    // Ignore if exists
  }

  // Read all folders in lib/properties
  const folders = await fs.readdir(propertiesDir);

  let successCount = 0;

  for (const folderName of folders) {
    const folderPath = path.join(propertiesDir, folderName);
    const stats = await fs.stat(folderPath);

    if (!stats.isDirectory()) continue;

    const detailsPath = path.join(folderPath, 'details.json');
    try {
      // Read JSON
      const detailsJson = await fs.readFile(detailsPath, 'utf-8');
      const details = JSON.parse(detailsJson);

      // Extract fields (with fallbacks/cleaning)
      const price = parseFloat(details.price) || 0;
      const rooms = parseInt(details.rooms) || 1;
      const area = parseFloat(details.area_sqm?.replace(/[^\d.]/g, '')) || 0;
      const floor = parseInt(details.floor) || 1;
      const city = details.city || 'Chișinău';
      const address = details.location_text || details.district || 'Unknown Location';
      const title = details.title || 'Untitled Property';
      const description = details.description || '';
      
      const latitude = details.latitude ? parseFloat(details.latitude) : null;
      const longitude = details.longitude ? parseFloat(details.longitude) : null;

      // Create property
      const property = await prisma.property.create({
        data: {
          title,
          description,
          price,
          city,
          address,
          rooms,
          area,
          floor,
          bathrooms: 1, // Defaulting to 1 as it's not strictly in JSON
          yearBuilt: 2010, // Default
          status: 'APPROVED',
          latitude,
          longitude,
          userId: user.id,
          categoryId: category.id,
        }
      });

      console.log(`Created Property ID ${property.id}: ${title}`);

      // Now copy images to public/properties/[id]
      const destImageDir = path.join(publicPropertiesDir, property.id.toString());
      await fs.mkdir(destImageDir, { recursive: true });

      const filesInFolder = await fs.readdir(folderPath);
      const imageFiles = filesInFolder.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));

      let order = 0;
      for (const imgFile of imageFiles) {
        const srcImg = path.join(folderPath, imgFile);
        const destImg = path.join(destImageDir, imgFile);
        
        await fs.copyFile(srcImg, destImg);

        const publicUrl = `/properties/${property.id}/${imgFile}`;
        
        await prisma.image.create({
          data: {
            url: publicUrl,
            alt: `${title} image`,
            order: order++,
            propertyId: property.id
          }
        });
      }
      
      successCount++;
    } catch (err) {
      console.error(`Error processing folder ${folderName}:`, err);
    }
  }

  console.log(`\n✅ Seeding complete! Successfully seeded ${successCount} properties.`);
  console.log(`To make these images work in production, ensure you run:\n git add public/properties\n git commit -m "Add seeded images"\n git push`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
