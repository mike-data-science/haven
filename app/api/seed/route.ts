import { NextResponse } from "next/server";
import { initializeDB } from "@/lib/db";
import { Property } from "@/entities/Property";
import { Image } from "@/entities/Image";
import { User } from "@/entities/User";
import { Category } from "@/entities/Category";
import { Favorite } from "@/entities/Favorite";
import { Inquiry } from "@/entities/Inquiry";
import { Message } from "@/entities/Message";
import { Review } from "@/entities/Rewiew";
import { Appointment } from "@/entities/Appointment";
import { Conversation } from "@/entities/Conversation";

export async function GET() {
  try {
    const db = await initializeDB();

    // 1. Delete all existing data in proper dependency order
    await db.getRepository(Appointment).query('TRUNCATE TABLE "appointment" CASCADE');
    await db.getRepository(Message).query('TRUNCATE TABLE "message" CASCADE');
    await db.getRepository(Conversation).query('TRUNCATE TABLE "conversation" CASCADE');
    await db.getRepository(Inquiry).query('TRUNCATE TABLE "inquiry" CASCADE');
    await db.getRepository(Review).query('TRUNCATE TABLE "review" CASCADE');
    await db.getRepository(Favorite).query('TRUNCATE TABLE "favorite" CASCADE');
    await db.getRepository(Image).query('TRUNCATE TABLE "image" CASCADE');
    await db.getRepository(Property).query('TRUNCATE TABLE "property" CASCADE');
    await db.getRepository(User).query('TRUNCATE TABLE "user" CASCADE');
    await db.getRepository(Category).query('TRUNCATE TABLE "category" CASCADE');

    // 2. Create Categories
    const houseCat = await db.getRepository(Category).save({ name: "House", slug: "house" });
    const apartmentCat = await db.getRepository(Category).save({ name: "Apartment", slug: "apartment" });
    const condoCat = await db.getRepository(Category).save({ name: "Condo", slug: "condo" });

    // 3. Create Agents
    const agent1 = await db.getRepository(User).save({
      name: "Alexandru Rusu",
      email: "alexandru.rusu@example.md",
      password: "password123", // Assuming hashed in a real app, plaintext here is fine for seeding
      role: "AGENT",
      title: "Senior Real Estate Agent",
      phone: "+373 60 123 456",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    });

    const agent2 = await db.getRepository(User).save({
      name: "Maria Ceban",
      email: "maria.ceban@example.md",
      password: "password123",
      role: "AGENT",
      title: "Luxury Property Specialist",
      phone: "+373 69 987 654",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
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
        user: agent1,
        category: apartmentCat,
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
        user: agent2,
        category: houseCat,
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
        user: agent1,
        category: apartmentCat,
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
        user: agent2,
        category: condoCat,
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
      const property = await db.getRepository(Property).save(propertyData);
      
      for (let i = 0; i < images.length; i++) {
        await db.getRepository(Image).save({
          url: images[i],
          alt: `${property.title} - Image ${i + 1}`,
          order: i,
          property: property
        });
      }
    }

    return NextResponse.json({ message: "Database seeded successfully with Chisinau properties!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
