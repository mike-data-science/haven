import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  Heart,
  Home,
  Image,
  Inbox,
  MapPin,
  MessageCircle,
  MessageSquare,
  Package,
  ShieldCheck,
  Star,
  Tag,
  Users,
} from "lucide-react";

export type FieldType = "text" | "textarea" | "number" | "email" | "date" | "checkbox" | "select" | "map";

export interface AdminField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
}

export interface AdminEntity {
  slug: string;
  label: string;
  description: string;
  icon: LucideIcon;
  fields: AdminField[];
  exampleFields: Array<{ name: string; example: string }>;
}

export const adminEntities: AdminEntity[] = [
  {
    slug: "categories",
    label: "Categories",
    description: "Organize property categories and display names.",
    icon: Tag,
    fields: [
      { name: "name", label: "Name", type: "text", placeholder: "Ocean View" },
      { name: "slug", label: "Slug", type: "text", placeholder: "ocean-view" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Luxury homes near the coast." },
    ],
    exampleFields: [
      { name: "name", example: "Ocean View" },
      { name: "slug", example: "ocean-view" },
      { name: "description", example: "Luxury homes near the coast." },
    ],
  },
  {
    slug: "properties",
    label: "Properties",
    description: "Manage property listings, details, and publishing status.",
    icon: Home,
    fields: [
      { name: "title", label: "Title", type: "text", placeholder: "Modern 3BR Condo" },
      { name: "description", label: "Description", type: "textarea", placeholder: "A premium property in the city." },
      { name: "price", label: "Price", type: "number", placeholder: "120000" },
      { name: "city", label: "City", type: "text", placeholder: "Chisinau" },
      { name: "address", label: "Address", type: "text", placeholder: "Strada Mihai Eminescu 12" },
      { name: "rooms", label: "Rooms", type: "number", placeholder: "3" },
      { name: "bathrooms", label: "Bathrooms", type: "number", placeholder: "2" },
      { name: "area", label: "Area (sqm)", type: "number", placeholder: "115" },
      { name: "floor", label: "Floor", type: "number", placeholder: "2" },
      { name: "yearBuilt", label: "Year Built", type: "number", placeholder: "2021" },
      { name: "status", label: "Status", type: "select", options: ["DRAFT", "PENDING", "APPROVED", "REJECTED", "ARCHIVED"] },
      { name: "userId", label: "User ID", type: "text", placeholder: "3" },
      { name: "categoryId", label: "Category ID", type: "text", placeholder: "1" },
      { name: "location", label: "Map Location", type: "map" },
    ],
    exampleFields: [
      { name: "title", example: "Modern 3BR Condo" },
      { name: "price", example: "120000" },
      { name: "city", example: "Chisinau" },
      { name: "status", example: "PENDING" },
    ],
  },
  {
    slug: "users",
    label: "Users",
    description: "Manage registered user accounts and roles.",
    icon: Users,
    fields: [
      { name: "name", label: "Name", type: "text", placeholder: "Olga Pop" },
      { name: "email", label: "Email", type: "email", placeholder: "olga@example.com" },
      { name: "role", label: "Role", type: "select", options: ["USER", "ADMIN", "AGENT"] },
    ],
    exampleFields: [
      { name: "name", example: "Olga Pop" },
      { name: "email", example: "olga@example.com" },
      { name: "role", example: "ADMIN" },
    ],
  },
  {
    slug: "items",
    label: "Items",
    description: "Manage store items and product listings.",
    icon: Package,
    fields: [
      { name: "title", label: "Title", type: "text", placeholder: "Swimming Pool Add-on" },
      { name: "price", label: "Price", type: "number", placeholder: "450" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Extra feature for premium listings." },
    ],
    exampleFields: [
      { name: "title", example: "Swimming Pool Add-on" },
      { name: "price", example: "450" },
      { name: "description", example: "Extra feature for premium listings." },
    ],
  },
  {
    slug: "appointments",
    label: "Appointments",
    description: "Track viewing appointments and meetings.",
    icon: CalendarCheck,
    fields: [
      { name: "visitDate", label: "Visit Date", type: "date" },
      { name: "status", label: "Status", type: "select", options: ["PENDING", "CONFIRMED", "CANCELLED"] },
      { name: "notes", label: "Notes", type: "textarea", placeholder: "Confirm with the agent." },
      { name: "userId", label: "User ID", type: "text", placeholder: "5" },
      { name: "propertyId", label: "Property ID", type: "text", placeholder: "10" },
    ],
    exampleFields: [
      { name: "visitDate", example: "2026-07-01" },
      { name: "status", example: "PENDING" },
      { name: "propertyId", example: "12" },
    ],
  },
  {
    slug: "conversations",
    label: "Conversations",
    description: "Review conversation threads and messages.",
    icon: MessageCircle,
    fields: [
      { name: "userId", label: "User ID", type: "text", placeholder: "3" },
      { name: "propertyId", label: "Property ID", type: "text", placeholder: "8" },
    ],
    exampleFields: [
      { name: "userId", example: "4" },
      { name: "propertyId", example: "8" },
      { name: "createdAt", example: "2026-06-13" },
    ],
  },
  {
    slug: "favorites",
    label: "Favorites",
    description: "Manage saved favorites and wishlist items.",
    icon: Heart,
    fields: [
      { name: "userId", label: "User ID", type: "text", placeholder: "3" },
      { name: "propertyId", label: "Property ID", type: "text", placeholder: "8" },
    ],
    exampleFields: [
      { name: "userId", example: "3" },
      { name: "propertyId", example: "8" },
      { name: "createdAt", example: "2026-06-12" },
    ],
  },
  {
    slug: "inquiries",
    label: "Inquiries",
    description: "Manage incoming customer inquiries.",
    icon: Inbox,
    fields: [
      { name: "name", label: "Name", type: "text", placeholder: "Mircea Anton" },
      { name: "email", label: "Email", type: "email", placeholder: "mircea@example.com" },
      { name: "phone", label: "Phone", type: "text", placeholder: "+373 60 123 456" },
      { name: "message", label: "Message", type: "textarea", placeholder: "Can I schedule a viewing?" },
      { name: "userId", label: "User ID", type: "text", placeholder: "7" },
      { name: "propertyId", label: "Property ID", type: "text", placeholder: "5" },
    ],
    exampleFields: [
      { name: "name", example: "Mircea Anton" },
      { name: "email", example: "mircea@example.com" },
      { name: "message", example: "Can I schedule a viewing?" },
    ],
  },

  {
    slug: "messages",
    label: "Messages",
    description: "Review inbox messages and user replies.",
    icon: MessageSquare,
    fields: [
      { name: "content", label: "Content", type: "textarea", placeholder: "Message text" },
      { name: "conversationId", label: "Conversation ID", type: "text", placeholder: "13" },
      { name: "senderId", label: "Sender ID", type: "text", placeholder: "4" },
    ],
    exampleFields: [
      { name: "content", example: "Question about the listing" },
      { name: "conversationId", example: "7" },
      { name: "senderId", example: "4" },
    ],
  },
  {
    slug: "reviews",
    label: "Reviews",
    description: "Moderate reviews and rating feedback.",
    icon: Star,
    fields: [
      { name: "rating", label: "Rating", type: "number", placeholder: "5" },
      { name: "comment", label: "Comment", type: "textarea", placeholder: "Great property!" },
      { name: "userId", label: "User ID", type: "text", placeholder: "2" },
      { name: "propertyId", label: "Property ID", type: "text", placeholder: "12" },
    ],
    exampleFields: [
      { name: "rating", example: "5" },
      { name: "comment", example: "Great property!" },
      { name: "userId", example: "2" },
    ],
  },
  {
    slug: "roles",
    label: "Roles",
    description: "Set user roles and permission levels.",
    icon: ShieldCheck,
    fields: [
      { name: "name", label: "Role name", type: "text", placeholder: "ADMIN" },
    ],
    exampleFields: [
      { name: "name", example: "admin" },
    ],
  },
  {
    slug: "images",
    label: "Images",
    description: "Manage uploaded image assets and galleries.",
    icon: Image,
    fields: [
      { name: "url", label: "URL", type: "text", placeholder: "https://example.com/image.jpg" },
      { name: "alt", label: "Alt text", type: "text", placeholder: "Property exterior" },
      { name: "order", label: "Order", type: "number", placeholder: "1" },
      { name: "propertyId", label: "Property ID", type: "text", placeholder: "12" },
    ],
    exampleFields: [
      { name: "url", example: "https://example.com/image.jpg" },
      { name: "alt", example: "Property exterior" },
      { name: "propertyId", example: "12" },
    ],
  },
];

export function getAdminEntity(slug: string) {
  return adminEntities.find((entity) => entity.slug === slug);
}
