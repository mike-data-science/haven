import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    // 1. Delete all existing data in proper dependency order using raw SQL
    // so we can use CASCADE safely. (PostgreSQL syntax)
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Appointment" CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Message" CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Conversation" CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Inquiry" CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Review" CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Favorite" CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Image" CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Property" CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "User" CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Category" CASCADE');

    // 2. Create Categories
    const houseCat = await prisma.category.create({ data: { name: "House", slug: "house" } });
    const apartmentCat = await prisma.category.create({ data: { name: "Apartment", slug: "apartment" } });
    const condoCat = await prisma.category.create({ data: { name: "Condo", slug: "condo" } });

    // 3. Create Agents
    const agent1 = await prisma.user.create({
      data: {
        clerkId: "mock_clerk_id_agent1",
        name: "Alexandru Rusu",
        email: "alexandru.rusu@example.md",
        role: "AGENT",
        title: "Senior Real Estate Agent, Chișinău",
        phone: "+373 60 123 456",
        avatarUrl: "/agents/agent1.png",
      }
    });

    const agent2 = await prisma.user.create({
      data: {
        clerkId: "mock_clerk_id_agent2",
        name: "Maria Ceban",
        email: "maria.ceban@example.md",
        role: "AGENT",
        title: "Luxury Property Specialist, Chișinău",
        phone: "+373 69 987 654",
        avatarUrl: "/agents/agent2.png",
      }
    });

    const agent3 = await prisma.user.create({
      data: {
        clerkId: "mock_clerk_id_agent3",
        name: "Victor Munteanu",
        email: "victor.munteanu@example.md",
        role: "AGENT",
        title: "Investment Consultant, Chișinău",
        phone: "+373 68 234 567",
        avatarUrl: "/agents/agent3.png",
      }
    });

    const agent4 = await prisma.user.create({
      data: {
        clerkId: "mock_clerk_id_agent4",
        name: "Elena Rotaru",
        email: "elena.rotaru@example.md",
        role: "AGENT",
        title: "Residential Sales Director, Chișinău",
        phone: "+373 67 345 678",
        avatarUrl: "/agents/agent4.png",
      }
    });

    // 4. Create Properties in Chisinau
    const propertiesData = [
      {
        title: "Modern Apartment in Botanica",
        description: "A beautiful, newly renovated 2-bedroom apartment situated in the heart of the Botanica sector. Close to parks, shopping centers, and public transport. Features a modern kitchen, spacious living room, and a balcony with a great view.",
        price: 85000,
        city: "Chisinau",
        address: "bd. Dacia 25",
        rooms: 2,
        bathrooms: 1,
        area: 65,
        floor: 4,
        yearBuilt: 2015,
        isPublished: true,
        userId: agent1.id,
        categoryId: apartmentCat.id,
        latitude: 46.9749,
        longitude: 28.8596,
        pinTop: "70%",
        pinLeft: "60%",
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1e52d15461?w=800&q=80",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
          "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80",
        ]
      },
      {
        title: "Luxury House in Telecentru",
        description: "Spacious family house located in the quiet and green Telecentru neighborhood. This house offers 4 bedrooms, a large garden, a private garage, and high-end finishes throughout. Perfect for a large family looking for comfort and privacy.",
        price: 245000,
        city: "Chisinau",
        address: "str. Pietrarilor 10",
        rooms: 4,
        bathrooms: 3,
        area: 210,
        floor: 2,
        yearBuilt: 2020,
        isPublished: true,
        userId: agent2.id,
        categoryId: houseCat.id,
        latitude: 46.9934,
        longitude: 28.8145,
        pinTop: "50%",
        pinLeft: "45%",
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
          "https://images.unsplash.com/photo-1600607687931-cebf1a51500e?w=800&q=80",
          "https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=800&q=80",
        ]
      },
      {
        title: "Cozy Studio in Riscani",
        description: "Perfect starter studio apartment in Riscani. Fully furnished, modern appliances, and a smart layout making the most of the space. Walking distance to cafes, restaurants, and the local park.",
        price: 52000,
        city: "Chisinau",
        address: "bd. Moscova 12/1",
        rooms: 1,
        bathrooms: 1,
        area: 40,
        floor: 8,
        yearBuilt: 2018,
        isPublished: true,
        userId: agent1.id,
        categoryId: apartmentCat.id,
        latitude: 47.0425,
        longitude: 28.8643,
        pinTop: "20%",
        pinLeft: "55%",
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
        ]
      },
      {
        title: "Premium Condo in City Center",
        description: "Experience luxury living in the very center of Chisinau. This premium condo boasts panoramic city views, 24/7 concierge service, underground parking, and exquisite interior design.",
        price: 185000,
        city: "Chisinau",
        address: "str. Puskin 44",
        rooms: 3,
        bathrooms: 2,
        area: 115,
        floor: 12,
        yearBuilt: 2022,
        isPublished: true,
        userId: agent2.id,
        categoryId: condoCat.id,
        latitude: 47.0245,
        longitude: 28.8322,
        pinTop: "40%",
        pinLeft: "50%",
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80",
          "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
          "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
        ]
      }
    ];

    for (const pData of propertiesData) {
      const { images, ...propertyData } = pData;
      const property = await prisma.property.create({ data: propertyData });
      
      for (let i = 0; i < images.length; i++) {
        await prisma.image.create({
          data: {
            url: images[i],
            alt: `${property.title} - Image ${i + 1}`,
            order: i,
            propertyId: property.id
          }
        });
      }
    }

    return NextResponse.json({ message: "Database seeded successfully with Chisinau properties!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
