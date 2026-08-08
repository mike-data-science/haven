"use client";

import React from "react";
import { Search, Sun, BellRing, ChevronDown, Map, List, BarChart3, Users, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Map View", href: "/v2", icon: Map },
  { name: "Listings", href: "/v2/listings", icon: List },
  { name: "Owners", href: "/v2/owners", icon: Users },
  { name: "Market", href: "#", icon: BarChart3 },
  { name: "Management", href: "#", icon: Settings },
];

export default function V2Navbar() {
  const pathname = usePathname();

  return (
    <div className="absolute top-6 left-0 right-0 z-[1000] flex justify-center px-6 pointer-events-none">
      <div className="flex items-center justify-between w-full max-w-[1400px]">
        {/* Logo */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-xl text-black">
            H
          </div>
          <span className="font-bold text-2xl tracking-tight text-gray-800 hidden md:block">Haven</span>
        </div>

        {/* Center Nav */}
        <nav className="bg-[#111] p-1.5 rounded-[32px] flex items-center gap-1 pointer-events-auto shadow-xl border border-white/10">
          {navLinks.map((link) => {
            const Icon = link.icon;
            // Exact match for /v2, otherwise prefix match
            const isActive = link.href === "/v2" ? pathname === "/v2" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[24px] text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? "bg-[#E1F036] text-black shadow-lg" 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={16} className={isActive ? "text-black" : "text-gray-400"} />
                <span className="hidden lg:inline">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Nav */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button className="w-11 h-11 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow-sm transition-colors border border-gray-200/50">
            <Search size={20} />
          </button>
          <button className="w-11 h-11 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow-sm transition-colors border border-gray-200/50">
            <Sun size={20} />
          </button>
          <button className="w-11 h-11 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow-sm transition-colors border border-gray-200/50 relative">
            <BellRing size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center gap-3 bg-white/80 backdrop-blur-md pl-1.5 pr-4 py-1.5 rounded-full hover:bg-white shadow-sm transition-colors border border-gray-200/50">
            <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-xs font-semibold text-gray-900 leading-tight">Mike Admin</span>
              <span className="text-[10px] text-gray-500">Manager</span>
            </div>
            <ChevronDown size={14} className="text-gray-500 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
