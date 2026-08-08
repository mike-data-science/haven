import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting cleanup...');

  // The IDs to delete are from 291 to 349
  const range = { gte: 291, lte: 349 };

  // Manually delete child records first to avoid foreign key violations
  console.log('Deleting associated images...');
  await prisma.image.deleteMany({ where: { propertyId: range } });
  
  console.log('Deleting associated moderation history...');
  await prisma.propertyModerationHistory.deleteMany({ where: { propertyId: range } });
  
  console.log('Deleting associated appointments and favorites...');
  await prisma.appointment.deleteMany({ where: { propertyId: range } });
  await prisma.favorite.deleteMany({ where: { propertyId: range } });
  await prisma.inquiry.deleteMany({ where: { propertyId: range } });
  await prisma.review.deleteMany({ where: { propertyId: range } });

  console.log('Deleting the properties...');
  const result = await prisma.property.deleteMany({
    where: { id: range }
  });

  console.log(`Successfully deleted ${result.count} properties from the database.`);
}

main()
  .catch(e => {
    console.error('Error during cleanup:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
