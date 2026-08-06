const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const properties = await prisma.property.findMany({
    include: { images: true },
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  console.log(JSON.stringify(properties, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
