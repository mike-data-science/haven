import "reflect-metadata";
import { DataSource } from "typeorm";
import { Appointment } from "../entities/Appointment";
import { Category } from "../entities/Category";
import { Conversation } from "../entities/Conversation";
import { Favorite } from "../entities/Favorite";
import { Image } from "../entities/Image";
import { Inquiry } from "../entities/Inquiry";
import { Message } from "../entities/Message";
import { Property } from "../entities/Property";
import { Review } from "../entities/Rewiew";
import { Role } from "../entities/Role";
import { User } from "../entities/User";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "15432",
  database: "real_estate",
  synchronize: true,
  entities: [
    Appointment,
    Category,
    Conversation,
    Favorite,
    Image,
    Inquiry,
    Message,
    Property,
    Review,
    Role,
    User,
  ],
});

async function seed() {
  await AppDataSource.initialize();
  console.log("Database connected.");

  // Clear all data
  console.log("Clearing existing data...");
  await AppDataSource.getRepository(Image).delete({});
  await AppDataSource.getRepository(Property).delete({});
  await AppDataSource.getRepository(User).delete({});
  await AppDataSource.getRepository(Category).delete({});

  // 1. Create Categories
  console.log("Creating categories...");
  const categoryRepo = AppDataSource.getRepository(Category);
  const houseCat = await categoryRepo.save({ name: "House", slug: "house" });
  const apartmentCat = await categoryRepo.save({ name: "Apartment", slug: "apartment" });
  const condoCat = await categoryRepo.save({ name: "Condo", slug: "condo" });

  // 2. Create Agents
  console.log("Creating agents...");
  const userRepo = AppDataSource.getRepository(User);
  const agent1 = await userRepo.save({
    name: "Alexandru Rusu",
    email: "alexandru.rusu@example.md",
    password: "password123", // Assuming hashed in a real app, plaintext here is fine for seeding
    role: "AGENT",
    title: "Senior Real Estate Agent, Chișinău",
    phone: "+373 60 123 456",
    avatarUrl: "/agents/agent1.png",
  });

  const agent2 = await userRepo.save({
    name: "Maria Ceban",
    email: "maria.ceban@example.md",
    password: "password123",
    role: "AGENT",
    title: "Luxury Property Specialist, Chișinău",
    phone: "+373 69 987 654",
    avatarUrl: "/agents/agent2.png",
  });

  const agent3 = await userRepo.save({
    name: "Victor Munteanu",
    email: "victor.munteanu@example.md",
    password: "password123",
    role: "AGENT",
    title: "Investment Consultant, Chișinău",
    phone: "+373 68 234 567",
    avatarUrl: "/agents/agent3.png",
  });

  const agent4 = await userRepo.save({
    name: "Elena Rotaru",
    email: "elena.rotaru@example.md",
    password: "password123",
    role: "AGENT",
    title: "Residential Sales Director, Chișinău",
    phone: "+373 67 345 678",
    avatarUrl: "/agents/agent4.png",
  });

  // 3. Create Properties in Chisinau
  console.log("Creating properties...");
  const propertyRepo = AppDataSource.getRepository(Property);
  const imageRepo = AppDataSource.getRepository(Image);

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
    const property = await propertyRepo.save(propertyData);
    
    for (let i = 0; i < images.length; i++) {
      await imageRepo.save({
        url: images[i],
        alt: `${property.title} - Image ${i + 1}`,
        order: i,
        property: property
      });
    }
  }

  console.log("Database seeded successfully with properties from Chisinau!");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
