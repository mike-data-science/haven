"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function DashboardMobileMenu({ sidebar }: { sidebar: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden shrink-0">
      {/* Mobile Dashboard Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <Link href="/" className="font-serif text-lg font-bold tracking-tight text-[#1A1A18] no-underline">
          Haven <span className="text-[#0B3D91]">Dashboard</span>
        </Link>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-1.5 text-slate-700 hover:text-[#0B3D91] transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Fullscreen Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[300] bg-[#18181b] flex flex-col h-[100dvh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-end p-4 shrink-0">
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div 
            className="flex-1 overflow-y-auto"
            onClick={(e) => {
              // Close menu if a link is clicked
              if ((e.target as HTMLElement).closest('a')) {
                setIsOpen(false);
              }
            }}
          >
            {sidebar}
          </div>
        </div>
      )}
    </div>
  );
}
