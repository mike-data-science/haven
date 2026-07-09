"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Appointment_1 = require("../entities/Appointment");
const Category_1 = require("../entities/Category");
const Conversation_1 = require("../entities/Conversation");
const Favorite_1 = require("../entities/Favorite");
const Image_1 = require("../entities/Image");
const Inquiry_1 = require("../entities/Inquiry");
const Message_1 = require("../entities/Message");
const Property_1 = require("../entities/Property");
const Rewiew_1 = require("../entities/Rewiew");
const Role_1 = require("../entities/Role");
const User_1 = require("../entities/User");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "15432",
    database: "real_estate",
    synchronize: false,
    entities: [
        Appointment_1.Appointment, Category_1.Category, Conversation_1.Conversation, Favorite_1.Favorite, Image_1.Image,
        Inquiry_1.Inquiry, Message_1.Message, Property_1.Property, Rewiew_1.Review, Role_1.Role, User_1.User
    ],
});
async function run() {
    await AppDataSource.initialize();
    const propertyRepo = AppDataSource.getRepository(Property_1.Property);
    const userRepo = AppDataSource.getRepository(User_1.User);
    const categoryRepo = AppDataSource.getRepository(Category_1.Category);
    // Fallback to agent 1 if exists, or create a mock one
    let agent = await userRepo.findOne({ where: { email: "alexandru.rusu@example.md" } });
    if (!agent) {
        agent = await userRepo.save({
            name: "Alexandru Rusu",
            email: "alexandru.rusu@example.md",
            password: "password123",
            role: "AGENT",
        });
    }
    let cat = await categoryRepo.findOne({ where: { slug: "apartment" } });
    if (!cat) {
        cat = await categoryRepo.save({ name: "Apartment", slug: "apartment" });
    }
    console.log("Generating realistic data for Chișinău...");
    const mockImages = [
        "https://images.unsplash.com/photo-1502672260266-1c1e52d15461?w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ];
    const locations = [
        { street: "bd. Ștefan cel Mare și Sfînt", lat: 47.026859, lon: 28.830156 },
        { street: "str. Pușkin", lat: 47.022934, lon: 28.835150 },
        { street: "bd. Dacia (Botanica)", lat: 46.975487, lon: 28.859664 },
        { street: "bd. Moscova (Rîșcani)", lat: 47.050518, lon: 28.859424 },
        { street: "str. Alba Iulia (Buiucani)", lat: 47.037145, lon: 28.784400 },
        { street: "bd. Mircea cel Bătrîn (Ciocana)", lat: 47.042106, lon: 28.887258 },
        { street: "str. Vasile Alecsandri", lat: 47.014264, lon: 28.825126 },
        { street: "str. Mihai Eminescu", lat: 47.019554, lon: 28.831518 },
        { street: "str. Ismail", lat: 47.022137, lon: 28.847522 },
        { street: "bd. Decebal (Botanica)", lat: 46.992211, lon: 28.853245 }
    ];
    let count = 0;
    for (let i = 0; i < 30; i++) {
        const loc = locations[Math.floor(Math.random() * locations.length)];
        // add small random offset to lat/lon so they aren't exactly on top of each other
        const lat = loc.lat + (Math.random() - 0.5) * 0.01;
        const lon = loc.lon + (Math.random() - 0.5) * 0.01;
        const street = loc.street;
        const housenumber = Math.floor(Math.random() * 100) + 1;
        const address = `${street} ${housenumber}`;
        const rooms = Math.floor(Math.random() * 3) + 1;
        const area = rooms * 25 + Math.floor(Math.random() * 20);
        const price = area * (1000 + Math.floor(Math.random() * 500));
        const property = await propertyRepo.save({
            title: `${rooms}-Room Apartment on ${street}`,
            description: `Modern apartment located at ${address}. Features include great views, updated appliances, and easy access to public transport.`,
            price: price,
            city: "Chișinău",
            address: address,
            rooms: rooms,
            bathrooms: 1,
            area: area,
            floor: Math.floor(Math.random() * 9) + 1,
            yearBuilt: 1980 + Math.floor(Math.random() * 40),
            isPublished: true,
            user: agent,
            category: cat,
            latitude: lat,
            longitude: lon,
        });
        const imageRepo = AppDataSource.getRepository(Image_1.Image);
        await imageRepo.save({
            url: mockImages[Math.floor(Math.random() * mockImages.length)],
            alt: property.title,
            order: 0,
            property: property
        });
        count++;
    }
    console.log(`Successfully saved ${count} mock properties from Republica Moldova to the database!`);
    process.exit(0);
}
run();
