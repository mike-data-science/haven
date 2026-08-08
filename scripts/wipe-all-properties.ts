import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting full database wipe of all properties...');

  console.log('Truncating the Property table and resetting the ID sequence to 1...');
  
  // TRUNCATE TABLE with RESTART IDENTITY resets the auto-increment IDs to 1.
  // CASCADE automatically deletes all rows in child tables (Image, Appointment, etc).
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Property" RESTART IDENTITY CASCADE;`);

  console.log('Successfully wiped all properties and reset the ID sequence!');
  console.log('The database is now completely empty of properties and ready for a fresh seed starting at ID 1.');
}

main()
  .catch(e => {
    console.error('Error during wipe:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
