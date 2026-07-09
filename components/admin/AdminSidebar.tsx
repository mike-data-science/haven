"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { User } from "@prisma/client";
import {
  Home,
  Compass,
  Inbox,
  Wallet,
  BarChart2,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  ChevronDown,
  ChevronUp,
  Tag,
  Users,
  Package,
  CalendarCheck,
  MessageSquare,
  Star,
  MapPin,
  ShieldCheck,
  Heart,
  MessageCircle,
  Image as ImageIcon
} from "lucide-react";
import { useState } from "react";

const newNavItems = [
  { slug: "dashboard", label: "Dashboard", icon: Home },
  { slug: "my-properties", label: "My Properties", icon: Home },
  { slug: "discover", label: "Discover", icon: Compass },
  { slug: "inbox", label: "Inbox", icon: Inbox, badge: 3 },
  { slug: "analytics", label: "Analytics", icon: BarChart2 },
  { slug: "notifications", label: "Notifications", icon: Bell, badge: 5 },
  { slug: "settings", label: "Settings", icon: Settings },
];

const oldAdminItems = [
  { slug: "categories", label: "Categories", icon: Tag },
  { slug: "properties", label: "Properties", icon: Home },
  { slug: "users", label: "Users", icon: Users },
  { slug: "items", label: "Items", icon: Package },
  { slug: "appointments", label: "Appointments", icon: CalendarCheck },
  { slug: "messages", label: "Messages", icon: MessageSquare },
  { slug: "inquiries", label: "Inquiries", icon: Inbox },
  { slug: "reviews", label: "Reviews", icon: Star },
  { slug: "locations", label: "Locations", icon: MapPin },
  { slug: "roles", label: "Roles", icon: ShieldCheck },
  { slug: "favorites", label: "Favorites", icon: Heart },
  { slug: "conversations", label: "Conversations", icon: MessageCircle },
  { slug: "images", label: "Images", icon: ImageIcon },
];

export default function AdminSidebar({ user, pendingCount = 0 }: { user: User, pendingCount?: number }) {
  const pathname = usePathname() || "";
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="flex h-full flex-col bg-[#18181b] text-slate-300">
      {/* Profile Section */}
      <div className="flex flex-col items-center pt-10 pb-6 border-b border-slate-800/50">
        <div className="relative mb-3">
          <Image
            src={user.avatarUrl || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop"}
            alt={user.name}
            width={72}
            height={72}
            className="rounded-full object-cover border-[3px] border-slate-800"
            unoptimized
          />
        </div>
        <h2 className="text-white font-semibold text-lg">{user.name}</h2>
        <p className="text-xs text-slate-500 mt-1">{user.title || "Real Estate Builders"}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="space-y-1">
          {newNavItems.map((item) => {
            const isActive =
              item.slug === "dashboard"
                ? pathname === "/dashboard" || pathname === "/dashboard/"
                : pathname.startsWith(`/dashboard/${item.slug}`);
            const Icon = item.icon;

            return (
              <Link
                key={item.slug}
                href={item.slug === "dashboard" ? "/dashboard" : `/dashboard/${item.slug}`}
                className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#27272a] text-white border-l-4 border-l-[var(--theme-accent)]"
                    : "text-slate-400 hover:bg-[#27272a]/50 hover:text-slate-200 border-l-4 border-l-transparent"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${isActive ? "bg-[var(--theme-accent)] text-white" : "bg-slate-800 text-slate-400"}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Create Property Action */}
        <div className="mt-8 px-2">
          <Link
            href="/dashboard/properties/new"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--theme-accent)] hover:opacity-90 text-white rounded-xl text-sm font-semibold transition-opacity"
          >
            <Plus className="h-4 w-4" />
            Create Property
          </Link>
        </div>

        {/* Verification Queue (Admin/Mod Only) */}
        {(user.role === "ADMIN" || user.role === "MODERATOR") && (
          <div className="mt-8 px-4">
            <Link
              href="/dashboard/admin/queue"
              className={`flex items-center justify-between rounded-xl px-4 py-3 font-semibold text-sm transition-all ${pathname === "/dashboard/admin/queue" ? "bg-amber-500 text-white" : "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/20"}`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5" />
                <span>Verification Queue</span>
              </div>
              {pendingCount > 0 && (
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${pathname === "/dashboard/admin/queue" ? "bg-white text-amber-600" : "bg-amber-500 text-slate-900"}`}>
                  {pendingCount}
                </span>
              )}
            </Link>
          </div>
        )}

        {/* Admin Section */}
        {user.role === "ADMIN" && (
          <div className="mt-8 border-t border-slate-800/50 pt-4">
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="flex w-full items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300"
            >
              <span>Admin Management</span>
              {adminOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {adminOpen && (
              <div className="mt-2 space-y-1">
                {oldAdminItems.map((item) => {
                  const isActive = pathname.startsWith(`/dashboard/${item.slug}`);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.slug}
                      href={`/dashboard/${item.slug}`}
                      className={`group flex items-center gap-4 rounded-xl px-4 py-2.5 text-sm transition-all ${
                        isActive
                          ? "bg-slate-800 text-white"
                          : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Footer Links */}
      <div className="border-t border-slate-800/50 p-4 space-y-1">
        <Link
          href="/dashboard/support"
          className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-[#27272a]/50 hover:text-slate-200 transition-all"
        >
          <HelpCircle className="h-5 w-5 text-slate-500" />
          Help & Support
        </Link>
        <SignOutButton>
          <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all">
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
