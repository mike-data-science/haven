"use client";

import Link from 'next/link';
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const { userId } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 py-2 px-4 md:py-6 md:px-10">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 md:px-5 md:py-4 border border-line shadow-sm">
        <Link href="/" className="font-serif text-[28px] font-bold tracking-[-0.5px] text-ink flex items-center gap-1.5 no-underline">
          <span className="text-navy">⌂</span> Haven
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/listings" className="font-sans text-[15px] font-bold text-navy transition-colors hover:text-navy">Properties</Link>
          <Link href="/agents" className="font-sans text-[15px] font-bold text-slate transition-colors hover:text-navy">Agents</Link>
          <Link href="/about" className="font-sans text-[15px] font-bold text-slate transition-colors hover:text-navy">About</Link>
          <Link href="/contact" className="font-sans text-[15px] font-bold text-slate transition-colors hover:text-navy">Contact</Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {!userId ? (
            <SignInButton mode="modal">
              <button className="bg-[#0B3D91] text-white font-sans text-[14px] font-bold py-[11px] px-6 rounded-[10px] cursor-pointer transition-transform hover:-translate-y-[2px] shadow-sm">
                Sign in
              </button>
            </SignInButton>
          ) : (
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Dashboard"
                  labelIcon={<DashboardIcon />}
                  href="/dashboard"
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden p-2 text-slate-700 hover:text-navy transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[80px] left-4 right-4 bg-white rounded-2xl border border-line shadow-lg p-6 flex flex-col gap-6 animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/listings" className="font-sans text-[16px] font-bold text-navy">Properties</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/agents" className="font-sans text-[16px] font-bold text-slate">Agents</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/about" className="font-sans text-[16px] font-bold text-slate">About</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/contact" className="font-sans text-[16px] font-bold text-slate">Contact</Link>
          </div>
          
          <div className="border-t border-slate-100 pt-6">
            {!userId ? (
              <SignInButton mode="modal">
                <button className="w-full bg-[#0B3D91] text-white font-sans text-[16px] font-bold py-3 px-6 rounded-[10px] cursor-pointer shadow-sm">
                  Sign in
                </button>
              </SignInButton>
            ) : (
              <div className="flex items-center gap-4">
                <UserButton afterSignOutUrl="/">
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="Dashboard"
                      labelIcon={<DashboardIcon />}
                      href="/dashboard"
                    />
                  </UserButton.MenuItems>
                </UserButton>
                <Link href="/dashboard" className="font-sans font-bold text-slate-700">Go to Dashboard</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function DashboardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </svg>
  );
}
