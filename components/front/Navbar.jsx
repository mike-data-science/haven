"use client";

import Link from 'next/link';
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const { userId } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 w-full z-[200] transition-all duration-500 ${isScrolled ? 'py-1.5 px-3' : 'py-3 px-3 md:py-5 md:px-6'}`}>
      <div className={`max-w-263 mx-auto flex justify-between items-center px-4 py-2 md:px-5 md:py-2 relative transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(11,61,145,0.12)] rounded-full' : 'bg-transparent border border-transparent shadow-none rounded-none'}`}>
        <div className="flex-1 flex justify-start">
          <Link href="/" className="font-serif text-[15px] font-bold tracking-[0px] text-[#1A1A18] flex items-center gap-1.5 no-underline group">
            <span className="text-[#2B7FFF] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">⌂</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0B3D91] to-[#1A1A18]">Haven</span>
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center items-center gap-8">
          <Link href="/listings" className="font-sans text-[10px] font-bold text-[#1A1A18] transition-colors hover:text-[#2B7FFF]">Properties</Link>
          <Link href="/agents" className="font-sans text-[10px] font-bold text-[#6B7280] transition-colors hover:text-[#2B7FFF]">Agents</Link>
          <Link href="/about" className="font-sans text-[10px] font-bold text-[#6B7280] transition-colors hover:text-[#2B7FFF]">About</Link>
          <Link href="/contact" className="font-sans text-[10px] font-bold text-[#6B7280] transition-colors hover:text-[#2B7FFF]">Contact</Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-3">
          {!userId ? (
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-[#0B3D91] to-[#1e58bd] text-white font-sans text-[8px] font-bold py-1.5 px-5 rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_16px_rgba(11,61,145,0.3)] border-none">
                Sign in
              </button>
            </SignInButton>
          ) : (
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonPopoverCard: "scale-[0.75] origin-top-right",
                }
              }}
            >
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
          className="md:hidden p-1.5 text-slate-700 hover:text-[#0B3D91] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-17 left-3 right-3 bg-white/85 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_32px_64px_rgba(11,61,145,0.15)] p-5 flex flex-col gap-5 animate-in slide-in-from-top-3 z-50">
          <div className="flex flex-col gap-3">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/listings" className="font-sans text-[11px] font-bold text-[#1A1A18]">Properties</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/agents" className="font-sans text-[11px] font-bold text-[#6B7280]">Agents</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/about" className="font-sans text-[11px] font-bold text-[#6B7280]">About</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/contact" className="font-sans text-[11px] font-bold text-[#6B7280]">Contact</Link>
          </div>
          
          <div className="border-t border-slate-200/60 pt-5">
            {!userId ? (
              <SignInButton mode="modal">
                <button className="w-full bg-gradient-to-r from-[#0B3D91] to-[#1e58bd] text-white font-sans text-[9px] font-bold py-2 px-5 rounded-[9px] cursor-pointer shadow-[0_8px_24px_rgba(11,61,145,0.2)] border-none">
                  Sign in
                </button>
              </SignInButton>
            ) : (
              <div className="flex items-center gap-3">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonPopoverCard: "scale-[0.75] origin-top-right",
                    }
                  }}
                >
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
      className="w-3 h-3"
    >
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </svg>
  );
}
