import { z } from "zod";
import { Role, PropertyStatus } from "@prisma/client";

// Core schemas
export const appointmentSchema = z.object({
  visitDate: z.coerce.date(),
  status: z.string().max(50).optional(),
  notes: z.string().max(2000).optional().nullable(),
  userId: z.coerce.number().int().positive(),
  propertyId: z.coerce.number().int().positive(),
});

export const categorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and hyphens"),
});

export const conversationSchema = z.object({
  userId: z.coerce.number().int().positive(),
  propertyId: z.coerce.number().int().positive().optional().nullable(),
});

export const favoriteSchema = z.object({
  userId: z.coerce.number().int().positive(),
  propertyId: z.coerce.number().int().positive(),
});

export const imageSchema = z.object({
  url: z.string().url().max(500),
  alt: z.string().max(200).optional().nullable(),
  order: z.coerce.number().int().min(0).optional(),
  propertyId: z.coerce.number().int().positive(),
});

export const inquirySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional(),
  message: z.string().min(1).max(5000),
  userId: z.coerce.number().int().positive().optional().nullable(),
  propertyId: z.coerce.number().int().positive(),
});

export const messageSchema = z.object({
  content: z.string().min(1).max(10000),
  conversationId: z.coerce.number().int().positive(),
  senderId: z.coerce.number().int().positive(),
});

export const propertySchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(10000),
  price: z.coerce.number().positive(),
  city: z.string().min(1).max(100),
  address: z.string().min(1).max(255),
  rooms: z.coerce.number().int().min(0).max(100),
  bathrooms: z.coerce.number().int().min(0).max(100),
  area: z.coerce.number().positive(),
  floor: z.coerce.number().int().min(0).max(200),
  yearBuilt: z.coerce.number().int().min(1800).max(new Date().getFullYear() + 5),
  status: z.nativeEnum(PropertyStatus).optional(),
  categoryId: z.coerce.number().int().positive().optional().nullable(),
  latitude: z.coerce.number().min(-90).max(90).optional().nullable(),
  longitude: z.coerce.number().min(-180).max(180).optional().nullable(),
  pinTop: z.string().max(20).optional().nullable(),
  pinLeft: z.string().max(20).optional().nullable(),
});

export const reviewSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(1).max(5000),
  userId: z.coerce.number().int().positive(),
  propertyId: z.coerce.number().int().positive(),
});

export const userSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(255),
  clerkId: z.string().max(255),
  avatarUrl: z.string().url().max(500).optional().nullable(),
  phone: z.string().max(30).optional().nullable(),
  title: z.string().max(200).optional().nullable(),
  role: z.nativeEnum(Role).optional(),
});
