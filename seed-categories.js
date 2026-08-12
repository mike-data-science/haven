const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: 'Apartment', slug: 'apartment', icon: '/prop_apt_1786370381611.png' },
    { name: 'House', slug: 'house', icon: '/prop_house_1786370408922.png' },
    { name: 'Land', slug: 'land', icon: '/prop_land_1786370435215.png' },
    { name: 'Commercial', slug: 'commercial', icon: '/prop_commercial_1786370451322.png' },
    { name: 'Residential', slug: 'residential', icon: '/prop_residential_1786370470652.png' }
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: { slug: cat.slug },
      create: { name: cat.name, slug: cat.slug }
    });
  }

  const allCats = await prisma.category.findMany();
  console.log(allCats);
}

main().catch(console.error).finally(() => prisma.$disconnect());
