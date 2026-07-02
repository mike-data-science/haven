export interface Product {
  id: number;
  title: string;
  price: number;
}

export const COLORS = {
  navy: "#0B3D91",       // deep blue — headlines, primary CTA
  blue: "#2B7FFF",       // mid blue — links, accents, active states
  paleBlue: "#EAF2FF",   // tinted backgrounds
  gold: "#C49A3C",       // warm accent — prices, highlights
  ink: "#1A1A18",        // warm near-black text
  slate: "#6B7280",      // secondary/muted text
  warm: "#FAFAF8",       // warm off-white section background
  card: "#FFFFFF",       // card surface
  line: "#E8E5DF",       // warm hairline borders
  white: "#FFFFFF",
};

export const LISTINGS = [
  {
    id: 1,
    title: "Harbor View Residence",
    location: "1063 N Ocean Blvd, Seattle, WA",
    price: 389750,
    beds: 4,
    baths: 3,
    sqft: 264,
    yearBuilt: 2021,
    type: "House",
    tag: "For Sale",
    description: "A sun-filled four-bedroom home with harbor views from the main living level. Recently renovated kitchen, private deck, and a two-car garage. Walking distance to the waterfront trail and neighborhood cafes.",
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=700&auto=format&fit=crop",
    ],
    agent: { name: "Maya Rodriguez", role: "Senior Agent, Seattle", phone: "(206) 555-0148", email: "maya@havenrealty.com", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop" },
    pin: { top: "22%", left: "38%" },
  },
  {
    id: 2,
    title: "Aureo Glass House",
    location: "Malibu, CA",
    price: 1250000,
    beds: 5,
    baths: 4,
    sqft: 383,
    type: "House",
    tag: "For Sale",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    agent: { name: "Daniel Kessler", role: "Luxury Specialist, LA", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
    pin: { top: "48%", left: "62%" },
  },
  {
    id: 3,
    title: "Cedarbrook Cottage",
    location: "Portland, OR",
    price: 560250,
    beds: 3,
    baths: 2,
    sqft: 184,
    type: "Apartment",
    tag: "For Sale",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
    agent: { name: "Aisha Brooks", role: "Buyer's Agent, Austin", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
    pin: { top: "65%", left: "30%" },
  },
  {
    id: 4,
    title: "Lakeside Minimalist",
    location: "Austin, TX",
    price: 778300,
    beds: 4,
    baths: 3,
    sqft: 287,
    type: "House",
    tag: "For Sale",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop",
    agent: { name: "Maya Rodriguez", role: "Senior Agent, Seattle", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop" },
    pin: { top: "35%", left: "78%" },
  },
  {
    id: 5,
    title: "Birchwood Studio Loft",
    location: "Denver, CO",
    price: 245900,
    beds: 1,
    baths: 1,
    sqft: 71,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop",
    agent: { name: "Daniel Kessler", role: "Luxury Specialist, LA", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
    pin: { top: "55%", left: "20%" },
  },
  {
    id: 6,
    title: "Maplecourt Townhome",
    location: "Raleigh, NC",
    price: 412000,
    beds: 3,
    baths: 2,
    sqft: 200,
    type: "Condo",
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=800&auto=format&fit=crop",
    agent: { name: "Aisha Brooks", role: "Buyer's Agent, Austin", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
    pin: { top: "15%", left: "55%" },
  },
];

export const AGENTS = [
  { id: 1, name: "Maya Rodriguez", role: "Senior Agent, Seattle", deals: 142, listings: 18, image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop" },
  { id: 2, name: "Daniel Kessler", role: "Luxury Specialist, LA", deals: 98, listings: 11, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
  { id: 3, name: "Aisha Brooks", role: "Buyer's Agent, Austin", deals: 76, listings: 9, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
];

export const TYPE_COUNTS = [
  { type: "House", count: 142 },
  { type: "Apartment", count: 98 },
  { type: "Condo", count: 54 },
  { type: "Commercial", count: 21 },
];

export const TOUR_DATES = [
  { label: "Sat", day: "13", month: "Jan" },
  { label: "Sun", day: "14", month: "Jan" },
  { label: "Mon", day: "15", month: "Jan" },
];

export const TOUR_TIMES = ["9:00 am", "11:00 am", "1:00 pm", "3:00 pm", "5:00 pm"];

export function formatPrice(n: number | string) {
  if (typeof n === 'string') return n; // Keep strings intact (like "$389,750")
  return `$${n.toLocaleString()}`;
}
