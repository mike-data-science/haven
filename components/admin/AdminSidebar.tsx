"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  Heart,
  Home,
  Inbox,
  Image,
  MapPin,
  MessageCircle,
  MessageSquare,
  Package,
  ShieldCheck,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { adminEntities } from "@/lib/admin";

const navItems = [
  { slug: "dashboard", label: "Dashboard", subtitle: "Overview & stats", icon: Home },
  { slug: "categories", label: "Categories", subtitle: "Manage categories", icon: Tag },
  { slug: "properties", label: "Properties", subtitle: "Manage listings", icon: Home },
  { slug: "users", label: "Users", subtitle: "Manage users", icon: Users },
  { slug: "items", label: "Items", subtitle: "Store items", icon: Package },
  { slug: "appointments", label: "Appointments", subtitle: "Booking schedule", icon: CalendarCheck },
  { slug: "messages", label: "Messages", subtitle: "Inbox messages", icon: MessageSquare },
  { slug: "inquiries", label: "Inquiries", subtitle: "Customer questions", icon: Inbox },
  { slug: "reviews", label: "Reviews", subtitle: "Ratings & feedback", icon: Star },
  { slug: "locations", label: "Locations", subtitle: "Geographic data", icon: MapPin },
  { slug: "roles", label: "Roles", subtitle: "Permissions", icon: ShieldCheck },
  { slug: "favorites", label: "Favorites", subtitle: "Saved favorites", icon: Heart },
  { slug: "conversations", label: "Conversations", subtitle: "Chat threads", icon: MessageCircle },
  { slug: "images", label: "Images", subtitle: "Media assets", icon: Image },
];

export default function AdminSidebar({ role }: { role: string }) {
  const pathname = usePathname() || "";
  
  // Filter out CRUD routes for non-ADMIN users, except properties
  const visibleItems = navItems.filter(item => 
    item.slug === "dashboard" || role === "ADMIN" || item.slug === "properties"
  );

  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-100">
      <div className="border-b border-slate-800 px-6 py-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          {role === 'ADMIN' ? 'Admin Panel' : 'Dashboard'}
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Real Estate</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          {role === 'ADMIN' ? 'A beautiful place to manage your data tables.' : 'Welcome back! Here is your overview.'}
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          {visibleItems.map((item) => {
            const isActive =
              item.slug === "dashboard"
                ? pathname === "/dashboard" || pathname === "/dashboard/"
                : pathname.startsWith(`/dashboard/${item.slug}`);
            const Icon = item.icon;

            return (
              <Link
                key={item.slug}
                href={item.slug === "dashboard" ? "/dashboard" : `/dashboard/${item.slug}`}
                className={`group flex items-center gap-4 rounded-3xl border px-4 py-4 text-sm transition ${
                  isActive
                    ? "border-cyan-500 bg-cyan-500/10 text-white shadow-lg"
                    : "border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900/70 hover:text-white"
                }`}
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-800 text-slate-300 transition group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium leading-tight">{item.label}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
