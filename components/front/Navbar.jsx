"use client";

import Link from 'next/link';
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useFontTheme } from '../shared/FontProvider';

export function Navbar() {
  const { userId } = useAuth();
  const { themeColor } = useFontTheme() || {};
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pillMaxWidthClass = '!max-w-[1240px]';
  const baseMaxWidthClass = 'max-w-[1240px]';
  const pillPaddingClass = isScrolled ? '!px-6 sm:!px-8 md:!px-8 lg:!px-8 xl:!px-8' : '';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isSolidBlue = themeColor === 'solid-blue';
  
  // Dynamic text colors based on scroll state and theme
  const logoColorClass = (isSolidBlue && !isScrolled && !isMobileMenuOpen) ? "text-white" : "text-[#4388FF]";
  const linkColorClass = (isSolidBlue && !isScrolled && !isMobileMenuOpen) ? "text-blue-100 hover:text-white" : "text-[#6B7280] hover:text-[#2B7FFF]";
  const toggleColorClass = (isSolidBlue && !isScrolled && !isMobileMenuOpen) ? "text-white" : "text-slate-700";
  
  return (
    <nav className={`fixed top-0 w-full z-[200] transition-all duration-500 ${isScrolled ? 'py-1.5 px-3' : 'py-3 md:py-5'}`}>
      <div className={`w-full ${baseMaxWidthClass} mx-auto flex justify-between items-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-2 md:py-2 relative z-[210] transition-all duration-500 ${(isScrolled && !isMobileMenuOpen) ? `bg-white/80 backdrop-blur-xl border border-[#E4EEFF]/90 shadow-[0_8px_32px_rgba(11,61,145,0.12)] rounded-full ${pillMaxWidthClass}` : 'bg-transparent border border-transparent shadow-none rounded-none'} ${(!isMobileMenuOpen && pillPaddingClass) ? pillPaddingClass : ''}`}>
        <div className="flex-1 flex justify-start">
          <Link href="/" className="font-serif text-xl font-bold tracking-[0px] text-[#1A1A18] flex items-center no-underline group">
            <span className={`transition-colors duration-300 ${logoColorClass}`}>Haven</span>
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center items-center gap-8">
          <Link href="/" className={`font-sans text-sm font-bold transition-colors duration-300 ${linkColorClass}`}>Home</Link>
          <Link href="/listings" className={`font-sans text-sm font-bold transition-colors duration-300 ${linkColorClass}`}>Listings</Link>
          <Link href="/agents" className={`font-sans text-sm font-bold transition-colors duration-300 ${linkColorClass}`}>Agents</Link>
          <Link href="/about" className={`font-sans text-sm font-bold transition-colors duration-300 ${linkColorClass}`}>About</Link>
          <Link href="/contact" className={`font-sans text-sm font-bold transition-colors duration-300 ${linkColorClass}`}>Contact</Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-3">
          {!userId ? (
            <SignInButton mode="modal" fallbackRedirectUrl="/dashboard" forceRedirectUrl="/dashboard">
              <button className="bg-gradient-to-r from-[#1E65FF] to-[#1455E1] text-white font-sans text-sm font-bold py-2 px-6 rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_16px_rgba(11,61,145,0.3)] border-none">
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
          className={`md:hidden p-1.5 hover:text-[#1E65FF] transition-colors ${toggleColorClass}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 pt-24 pb-10 px-6 bg-white z-[190] h-[100dvh] overflow-y-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col items-center justify-center gap-8 flex-1 pb-10">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="font-sans text-2xl font-bold text-[#1A1A18] transition-colors hover:text-[#1E65FF]">Home</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/listings" className="font-sans text-2xl font-bold text-[#1A1A18] transition-colors hover:text-[#1E65FF]">Market</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/agents" className="font-sans text-2xl font-bold text-[#1A1A18] transition-colors hover:text-[#1E65FF]">Agents</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/about" className="font-sans text-2xl font-bold text-[#1A1A18] transition-colors hover:text-[#1E65FF]">About</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/contact" className="font-sans text-2xl font-bold text-[#1A1A18] transition-colors hover:text-[#1E65FF]">Contact</Link>
          </div>
          
          <div className="border-t border-slate-100 pt-8 pb-4 w-full flex flex-col items-center justify-center">
            {!userId ? (
              <SignInButton mode="modal" fallbackRedirectUrl="/dashboard" forceRedirectUrl="/dashboard">
                <button className="w-full max-w-[280px] bg-gradient-to-r from-[#1E65FF] to-[#1455E1] text-white font-sans text-base font-bold py-3.5 px-6 rounded-full cursor-pointer shadow-[0_8px_24px_rgba(11,61,145,0.2)] border-none">
                  Sign in
                </button>
              </SignInButton>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="scale-110">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonPopoverCard: "origin-top",
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
                </div>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/dashboard" className="font-sans text-lg font-bold text-[#1A1A18] hover:text-[#1E65FF]">
                  Go to Dashboard
                </Link>
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
