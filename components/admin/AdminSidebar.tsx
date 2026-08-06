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
  const [adminOpen, setAdminOpen] = useState(true);

  return (
    <div className="flex h-full flex-col bg-[#18181b] text-slate-300">
      {/* Profile Section */}
      <div className="flex flex-col items-center pt-8 pb-5 border-b border-slate-800/50">
        <div className="relative mb-2">
          <Image
            src={user.avatarUrl || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop"}
            alt={user.name}
            width={72}
            height={72}
            className="rounded-full object-cover border-[2px] border-slate-800"
            unoptimized
          />
        </div>
        <h2 className="text-white font-semibold text-sm">{user.name}</h2>
        <p className="text-xs text-slate-500 mt-1">{user.title || "Real Estate Builders"}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col overflow-hidden px-3 py-3">
        {/* Fixed Top Navigation Items */}
        <div className="shrink-0 space-y-1">
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
                className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#27272a] text-white border-l-4 border-l-[var(--theme-accent)]"
                    : "text-slate-400 hover:bg-[#27272a]/50 hover:text-slate-200 border-l-4 border-l-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`} />
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
        <div className="mt-4 px-1.5 shrink-0">
          <Link
            href="/dashboard/properties/new"
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-[var(--theme-accent)] hover:opacity-90 text-white rounded-xl text-xs font-semibold transition-opacity shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            Create Property
          </Link>
        </div>

        {/* Verification Queue (Admin/Mod Only) */}
        {(user.role === "ADMIN" || user.role === "MODERATOR") && (
          <div className="mt-3 px-1.5 shrink-0">
            <Link
              href="/dashboard/admin/queue"
              className={`flex items-center justify-between rounded-xl px-3 py-2 font-semibold text-xs transition-all shadow-sm ${pathname === "/dashboard/admin/queue" ? "bg-amber-500 text-white shadow-amber-500/20" : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30"}`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Verification Queue</span>
              </div>
              {pendingCount > 0 && (
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${pathname === "/dashboard/admin/queue" ? "bg-white text-amber-600" : "bg-amber-500 text-slate-900"}`}>
                  {pendingCount}
                </span>
              )}
            </Link>
          </div>
        )}

        {/* Admin Section - Only THIS section scrolls and looks super cool */}
        {user.role === "ADMIN" && (
          <div className="mt-3 border-t border-slate-800/80 pt-2.5 flex flex-col flex-1 min-h-0">
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="group flex w-full items-center justify-between rounded-xl border border-slate-800/80 bg-gradient-to-r from-[#222226] to-[#1a1a1f] px-2.5 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-300 shadow-sm transition-all hover:border-slate-700 hover:text-white shrink-0"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                  <ShieldCheck className="h-3 w-3" />
                </div>
                <span>Admin Control</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-md border border-slate-700/60 bg-[#111114] px-1.5 py-0.5 font-mono text-[9px] font-semibold text-slate-400 group-hover:text-white">
                  {oldAdminItems.length}
                </span>
                <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${adminOpen ? "rotate-180 text-white" : ""}`} />
              </div>
            </button>
            
            {adminOpen && (
              <div className="mt-2 flex-1 overflow-y-auto pr-1 space-y-1 [scrollbar-width:thin] [scrollbar-color:#334155_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700 hover:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-transparent">
                {oldAdminItems.map((item) => {
                  const isActive = pathname.startsWith(`/dashboard/${item.slug}`);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.slug}
                      href={`/dashboard/${item.slug}`}
                      className={`group relative flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-[var(--theme-accent)]/20 via-[var(--theme-accent)]/10 to-transparent text-white border border-[var(--theme-accent)]/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                          : "text-slate-400 hover:bg-[#27272a]/40 hover:text-slate-200 hover:translate-x-1 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-3.5 w-3.5 transition-colors ${isActive ? "text-[var(--theme-accent)]" : "text-slate-500 group-hover:text-slate-300"}`} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--theme-accent)] shadow-[0_0_8px_var(--theme-accent)] animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Footer Links */}
      <div className="border-t border-slate-800/50 p-3 space-y-1">
        <Link
          href="/dashboard/support"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 hover:bg-[#27272a]/50 hover:text-slate-200 transition-all"
        >
          <HelpCircle className="h-4 w-4 text-slate-500" />
          Help & Support
        </Link>
        <SignOutButton>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 transition-all">
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
