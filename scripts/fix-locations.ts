import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { config } from 'dotenv';

config({ path: '.env.local' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL || process.env.STORAGE_POSTGRES_URL || process.env.POSTGRES_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const CHISINAU_SECTORS = [
  { name: 'Centru', lat: 47.0245, lng: 28.8322 },
  { name: 'Botanica', lat: 46.9749, lng: 28.8617 },
  { name: 'Buiucani', lat: 47.0278, lng: 28.7906 },
  { name: 'Rîșcani', lat: 47.0450, lng: 28.8575 },
  { name: 'Ciocana', lat: 47.0506, lng: 28.8839 },
  { name: 'Telecentru', lat: 46.9930, lng: 28.8055 },
  { name: 'Poșta Veche', lat: 47.0550, lng: 28.8350 }
];

async function main() {
  console.log('Fetching all properties to update locations...');
  const properties = await prisma.property.findMany();

  for (const property of properties) {
    const randomSector = CHISINAU_SECTORS[Math.floor(Math.random() * CHISINAU_SECTORS.length)];
    const latOffset = (Math.random() - 0.5) * 0.02;
    const lngOffset = (Math.random() - 0.5) * 0.02;

    await prisma.property.update({
      where: { id: property.id },
      data: {
        city: 'Chișinău',
        address: randomSector.name,
        latitude: randomSector.lat + latOffset,
        longitude: randomSector.lng + lngOffset,
      }
    });
  }

  console.log(`Successfully updated locations for ${properties.length} properties.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
