"use client";

import React from "react";
import { Search, Sun, BellRing, ChevronDown, Map, List, BarChart3, Users, Settings, Grid2x2 } from "lucide-react";
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

  // Determine page title based on pathname
  let pageTitle = "Map View";
  if (pathname?.startsWith("/v2/listings")) pageTitle = "Listings";
  else if (pathname?.startsWith("/v2/owners")) pageTitle = "Owners";

  return (
    <>
      {/* =========================================
          DESKTOP NAVBAR (Hidden on mobile)
          ========================================= */}
      <div className="hidden lg:flex absolute top-6 left-0 right-0 z-[1000] justify-center px-6 pointer-events-none">
        <div className="flex items-center justify-between w-full max-w-[1400px]">
          {/* Logo */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-xl text-black">
              H
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-800">Haven</span>
          </div>

          {/* Center Nav */}
          <nav className="bg-[#111] p-1.5 rounded-[32px] flex items-center gap-1 pointer-events-auto shadow-xl border border-white/10">
            {navLinks.map((link) => {
              const Icon = link.icon;
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
              <div className="flex flex-col items-start">
                <span className="text-xs font-semibold text-gray-900 leading-tight">Mike Admin</span>
                <span className="text-[10px] text-gray-500">Manager</span>
              </div>
              <ChevronDown size={14} className="text-gray-500 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================
          MOBILE TOP HEADER (Hidden on desktop)
          ========================================= */}
      <div className="lg:hidden absolute top-6 left-0 right-0 z-[1000] px-6 pointer-events-none flex flex-col gap-6">
        {/* Top Row: Sun/Settings, Avatar/Bell */}
        <div className="flex justify-between items-center w-full pointer-events-auto">
          <button className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-100">
            <Sun size={26} className="text-gray-700"/>
          </button>
          <div className="flex items-center gap-3">
            <button className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center relative border border-gray-100">
              <BellRing size={26} className="text-gray-700"/>
              <span className="absolute top-3 right-3 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-sm border border-gray-100 bg-white">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className="w-full h-full object-cover p-0.5 rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Bottom Row: Subtitle, Title, Grid Button */}
        <div className="flex justify-between items-end w-full pointer-events-auto">
          <div className="flex flex-col">
            <span className="text-gray-500 text-[15px] font-medium tracking-wide mb-1">Haven Workspace</span>
            <h1 className="text-[32px] font-bold text-gray-900 tracking-tight leading-none">{pageTitle}</h1>
          </div>
          <button className="w-14 h-14 bg-[#111] rounded-full shadow-lg flex items-center justify-center text-white">
            <Grid2x2 size={26} />
          </button>
        </div>
      </div>

      {/* =========================================
          MOBILE BOTTOM NAV (Hidden on desktop)
          ========================================= */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto">
        <nav className="bg-black/40 backdrop-blur-xl p-2 rounded-full flex items-center gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.25)] border border-white/20">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.href === "/v2" ? pathname === "/v2" : pathname?.startsWith(link.href);
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`w-16 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#E1F036] text-black shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={24} className={isActive ? "fill-black/5" : ""} />
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  );
}
