"use client";

import { useState, useRef, useEffect } from "react";
import { useFontTheme } from "@/components/shared/FontProvider";
import Link from 'next/link';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { formatPrice } from "@/lib/data";
import { PropertyCard } from './PropertyCard';
import AgentCard from './AgentCard';
import { ContactAgentButton } from "./ContactAgentModal";
import { SignInButton } from "@clerk/nextjs";

function ModernSelect({ id, label, options, defaultValue, isLast, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className={`flex-[0.8] px-1.5 sm:px-3 py-2 flex items-center border-[#E8E5DF] relative ${isOpen ? 'z-[100]' : 'z-10'} ${className ? className : `border-b lg:border-b-0 ${isLast ? '' : 'lg:border-r'}`}`} ref={ref}>
      <div 
        className="relative w-full cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 truncate">
          {label && <span className="font-sans text-xs sm:text-sm font-normal text-slate-500 whitespace-nowrap">{label}:</span>}
          <span className="font-sans text-sm sm:text-base font-normal text-[#1A1A18] whitespace-nowrap">
            {selectedOption.label}
          </span>
        </div>
        <div className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ml-1`}>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+12px)] left-0 min-w-41 w-full bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top">
          {options.map((o) => (
            <div 
              key={o.value} 
              className={`px-3 py-2 text-xs sm:text-sm cursor-pointer transition-colors select-none flex items-center justify-between ${o.value === value ? 'bg-blue-50/50 text-blue-700 font-normal' : 'text-slate-700 hover:bg-slate-50'}`}
              onClick={() => { setValue(o.value); setIsOpen(false); }}
            >
              {o.label}
              {o.value === value && (
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Hidden native select for form submission compatibility */}
      <select id={id} name={id} value={value} onChange={(e) => setValue(e.target.value)} className="hidden">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function HeroGradient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const { fontStyle, setFontStyle, pillWidth, setPillWidth, themeColor, setThemeColor, cardStyle, setCardStyle, propertyTypeStyle, setPropertyTypeStyle } = useFontTheme();

  useEffect(() => {
    setIsMounted(true);
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className={`relative z-[100] w-full min-h-94 h-auto flex flex-col items-center justify-center text-center pt-16 md:pt-21 pb-6 md:pb-9 ${themeColor === 'solid-blue' ? 'bg-[#0052cc]' : ''}`}>
      {/* Dynamic Animated Background */}
      {themeColor === 'solid-blue' ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[0%] left-[-10%] w-[40%] h-[50%] bg-white/10 rounded-full blur-[68px] mix-blend-overlay animate-pulse"></div>
          <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-blue-300/10 rounded-full blur-[68px] mix-blend-overlay"></div>
          <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 bg-gradient-to-t from-[#FAFAF8] to-transparent pointer-events-none"></div>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#EAF2FF] via-[#FAFAF8] to-[#E6F0FF] overflow-hidden">
          <div className="absolute top-[0%] left-[-10%] w-[40%] h-[50%] bg-blue-300/30 rounded-full blur-[68px] mix-blend-multiply animate-pulse"></div>
          <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/20 rounded-full blur-[68px] mix-blend-multiply"></div>
          {/* Seamless bottom transition overlay so the bottom right blends smoothly into the page without any straight line */}
          <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent pointer-events-none"></div>
        </div>
      )}
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center mt-0 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        
        {/* Layout Toggle Menu */}
        <div className="w-full flex justify-end mb-3 relative" ref={menuRef}>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="p-1.5 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-full shadow-sm text-slate-600 transition-all border border-white/80"
            title="Search Settings"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute top-[110%] right-0 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50 min-w-38 animate-in fade-in zoom-in-95 origin-top-right text-left">
              <p className="font-sans text-[7px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1.5">Font Style</p>
              <button 
                onClick={() => { setFontStyle('modern'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${fontStyle === 'modern' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Modern (Jakarta/Inter)
                {fontStyle === 'modern' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <button 
                onClick={() => { setFontStyle('minimalist'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${fontStyle === 'minimalist' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Minimalist
                {fontStyle === 'minimalist' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <button 
                onClick={() => { setFontStyle('elegant'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${fontStyle === 'elegant' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Elegant Luxury (Manrope)
                {fontStyle === 'elegant' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <button 
                onClick={() => { setFontStyle('sora'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${fontStyle === 'sora' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Futuristic Clean (Sora)
                {fontStyle === 'sora' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <button 
                onClick={() => { setFontStyle('outfit'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${fontStyle === 'outfit' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Friendly (Outfit)
                {fontStyle === 'outfit' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <button 
                onClick={() => { setFontStyle('dm-sans'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${fontStyle === 'dm-sans' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Balanced (DM Sans)
                {fontStyle === 'dm-sans' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <button 
                onClick={() => { setFontStyle('urbanist'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${fontStyle === 'urbanist' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Modern (Urbanist)
                {fontStyle === 'urbanist' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <button 
                onClick={() => { setFontStyle('space-grotesk'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${fontStyle === 'space-grotesk' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Branding (Space Grotesk)
                {fontStyle === 'space-grotesk' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>

              <div className="h-px bg-slate-100 my-1.5 mx-1"></div>
              
              <p className="font-sans text-[7px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1.5">Hero Theme</p>
              <button 
                onClick={() => { setThemeColor('light-gradient'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${themeColor === 'light-gradient' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Light Gradient
                {themeColor === 'light-gradient' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <button 
                onClick={() => { setThemeColor('solid-blue'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${themeColor === 'solid-blue' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Solid Blue
                {themeColor === 'solid-blue' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <div className="h-px bg-slate-100 my-1.5 mx-1"></div>
              
              <p className="font-sans text-[7px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1.5">Property Cards</p>
              <button 
                onClick={() => { setPropertyTypeStyle('modern'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${propertyTypeStyle === 'modern' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Modern Compact
                {propertyTypeStyle === 'modern' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <button 
                onClick={() => { setPropertyTypeStyle('photo'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${propertyTypeStyle === 'photo' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Photo Realistic (Wide)
                {propertyTypeStyle === 'photo' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
            </div>
          )}
        </div>

        <h1 className={`font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.5px] mb-5 drop-shadow-sm ${themeColor === 'solid-blue' ? 'text-white' : 'text-[#1A1A18]'}`}>
          Find your <span className={themeColor === 'solid-blue' ? '' : 'bg-clip-text text-transparent bg-gradient-to-r from-[#0B3D91] to-[#4388FF]'}>Haven.</span>
        </h1>
        <p className={`font-sans text-base sm:text-lg max-w-2xl leading-[1.6] mb-6 ${fontStyle === 'modern' ? 'font-normal' : 'font-medium'} ${themeColor === 'solid-blue' ? 'text-blue-100' : 'text-[#4A5568]'}`}>
          Browse curated houses, condos, and apartments from agents who actually answer the phone.
        </p>

        {!isMounted ? (
          <div className="flex flex-col bg-white/95 backdrop-blur-xl p-1.5 rounded-[14px] lg:rounded-[9px] shadow-[0_40px_100px_-10px_rgba(11,61,145,0.3)] border border-white/80 w-full relative z-20">
            <div className="grid grid-cols-2 lg:flex lg:flex-row w-full items-stretch animate-pulse">
              <div className="flex-[0.8] px-1.5 sm:px-3 py-2 flex items-center border-b border-r lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-5 bg-slate-100 rounded"></div>
              </div>
              <div className="flex-[0.8] px-1.5 sm:px-3 py-2 flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-5 bg-slate-100 rounded"></div>
              </div>
              <div className="flex-[0.8] px-1.5 sm:px-3 py-2 flex items-center border-b border-r lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-5 bg-slate-100 rounded"></div>
              </div>
              <div className="flex-[0.8] px-1.5 sm:px-3 py-2 flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-5 bg-slate-100 rounded"></div>
              </div>
              <div className="col-span-2 lg:col-span-1 flex-[1.4] px-3 py-2 flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
                <div className="w-full h-5 bg-slate-100 rounded"></div>
              </div>
              <div className="col-span-2 lg:col-span-1 flex justify-center mt-2 lg:mt-0 p-1.5 lg:p-0">
                <div className="w-full lg:w-23 bg-slate-200 h-10 lg:h-full lg:ml-1.5 rounded-[9px] lg:rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          /* CLASSIC LAYOUT: Single pill, Region before Price */
          <form action="/listings" method="GET" className="flex flex-col bg-white/70 backdrop-blur-xl p-1.5 rounded-[14px] lg:rounded-full shadow-[0_40px_100px_-10px_rgba(11,61,145,0.4)] border border-white/80 w-full relative z-20 transition-all duration-300 hover:shadow-[0_50px_120px_-10px_rgba(11,61,145,0.5)]">
            <div className="grid grid-cols-2 lg:flex lg:flex-row w-full items-stretch">
              <ModernSelect 
                id="transaction" 
                defaultValue="buy" 
                options={[{ value: 'buy', label: 'Buy' }, { value: 'sell', label: 'Sell' }, { value: 'rent', label: 'Rent' }]} 
                className="border-b lg:border-b-0 lg:border-r border-slate-300/50"
              />
              
              <ModernSelect 
                id="type" 
                defaultValue="apartment" 
                options={[
                  { value: 'apartment', label: 'Apartment' }, 
                  { value: 'house', label: 'House' }, 
                  { value: 'land', label: 'Land' }, 
                  { value: 'commercial', label: 'Commercial' }
                ]} 
                className="border-b lg:border-b-0 lg:border-r border-slate-300/50"
              />

              <ModernSelect 
                id="rooms" 
                defaultValue="1" 
                options={[
                  { value: '1', label: '1+ Rooms' }, 
                  { value: '2', label: '2+ Rooms' }, 
                  { value: '3', label: '3+ Rooms' }, 
                  { value: '4', label: '4+ Rooms' }
                ]} 
                className="border-b border-r lg:border-b-0 lg:border-r border-slate-300/50"
              />

              <ModernSelect 
                id="region" 
                defaultValue="any" 
                options={[
                  { value: 'any', label: 'Chișinău (All)' }, 
                  { value: 'centru', label: 'Chișinău, Centru' }, 
                  { value: 'botanica', label: 'Chișinău, Botanica' }, 
                  { value: 'buiucani', label: 'Chișinău, Buiucani' }, 
                  { value: 'ciocana', label: 'Chișinău, Ciocana' }, 
                  { value: 'riscani', label: 'Chișinău, Rîșcani' }, 
                  { value: 'telecentru', label: 'Chișinău, Telecentru' }, 
                  { value: 'posta-veche', label: 'Chișinău, Poșta Veche' }
                ]} 
                className="border-b lg:border-b-0 lg:border-r border-slate-300/50"
              />

              {/* Price From-To */}
              <div className="col-span-2 lg:col-span-1 flex-[1.4] px-3 py-2 flex items-center border-b lg:border-b-0 lg:border-r border-slate-300/50">
                <div className="flex items-center gap-1.5 w-full">
                  <input type="number" name="minPrice" placeholder="Price from" className="w-full border-none bg-transparent font-sans text-xs sm:text-sm font-normal text-[#1A1A18] outline-none placeholder:text-slate-500 placeholder:font-normal min-w-0" />
                  <span className="text-slate-400 font-normal">-</span>
                  <input type="number" name="maxPrice" placeholder="Price to" className="w-full border-none bg-transparent font-sans text-xs sm:text-sm font-normal text-[#1A1A18] outline-none placeholder:text-slate-500 placeholder:font-normal min-w-0" />
                  <span className="font-sans text-xs sm:text-sm font-normal text-[#1A1A18] ml-1">€</span>
                </div>
              </div>

              {/* Search Button */}
              <div className="col-span-2 lg:col-span-1 flex justify-center mt-2 lg:mt-0 p-1.5 lg:p-0">
                <button type="submit" className="w-full lg:w-auto bg-gradient-to-r from-[#0B3D91] to-[#1e58bd] text-white font-sans text-sm sm:text-base font-normal py-2.5 px-8 rounded-[9px] lg:rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.02] h-11 lg:h-full lg:ml-1.5 shrink-0 shadow-[0_8px_24px_rgba(11,61,145,0.4)]">
                  Search
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function PropertyTypes() {
  const { propertyTypeStyle } = useFontTheme();
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const types = [
    { name: "Apartments", count: 71, icon: "/prop_apt_1786370381611.png" },
    { name: "Houses & Villas", count: 12, icon: "/prop_house_1786370408922.png" },
    { name: "Land", count: 20, icon: "/prop_land_1786370435215.png" },
    { name: "Commercial", count: 7, icon: "/prop_commercial_1786370451322.png" },
    { name: "Residential", count: 3, icon: "/prop_residential_1786370470652.png" },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleClick = (e) => {
    // If we dragged more than a few pixels, prevent click
    if (Math.abs(scrollLeft - scrollContainerRef.current.scrollLeft) > 5) {
      e.preventDefault();
    }
  };

  const isPhoto = propertyTypeStyle === 'photo';

  if (!isPhoto) {
    return (
      <section className="w-full pt-10 pb-6 md:pb-8 relative z-20 -mt-8">
        <div className="w-full relative [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-5 md:gap-6 overflow-x-auto px-4 sm:px-8 md:px-12 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'} w-full`}
          >
            {types.map((type, i) => (
              <Link 
                href={`/listings?type=${type.name.toLowerCase()}`} 
                onClick={handleClick}
                draggable={false}
                key={i} 
                className="group relative flex-none w-[320px] md:w-[360px] h-[200px] md:h-[240px] bg-[#F5F5F5] rounded-[24px] md:rounded-[32px] p-6 hover:shadow-md transition-all duration-300 snap-center overflow-hidden flex justify-between !cursor-[inherit]"
              >
                <div className="flex flex-col justify-between relative z-10 w-[55%]">
                  <span className="font-sans font-bold text-[#1A1A18] text-lg md:text-xl leading-tight block select-none self-start">{type.name}</span> 
                  
                  {type.count !== undefined && (
                    <div className="mt-auto font-black text-4xl text-[#E8E8E8] transition-all group-hover:text-[#0B3D91]" style={{ textShadow: '1px 1px 2px rgba(255,255,255,1), -1px -1px 2px rgba(0,0,0,0.08)' }}>
                      {type.count}
                    </div>
                  )}
                </div>

                <div className="absolute top-0 right-0 h-full w-[50%] pointer-events-none select-none">
                  <img 
                    src={type.icon} 
                    alt={type.name} 
                    draggable={false}
                    className="w-full h-full object-cover object-left mix-blend-multiply opacity-95 group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-10 pb-6 md:pb-8 relative z-20 -mt-8 overflow-hidden">
      {/* Full bleed right trick: negative margin on the right side only */}
      <div 
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-5 md:gap-6 overflow-x-auto pb-6 pr-[calc(50vw-50%)] mr-[calc(-50vw+50%)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}`}
      >
        {types.map((type, i) => (
          <Link 
            href={`/listings?type=${type.name.toLowerCase()}`} 
            onClick={handleClick}
            draggable={false}
            key={i} 
            className="group relative flex-none w-[320px] md:w-[360px] h-[200px] md:h-[240px] bg-white rounded-[24px] md:rounded-[32px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-[#E8E5DF]/60 hover:shadow-[0_12px_40px_rgba(11,61,145,0.08)] transition-all duration-300 snap-center overflow-hidden flex flex-col justify-between !cursor-[inherit]"
          >
            <span className="font-sans font-semibold text-[#1A1A18] text-xl md:text-2xl max-w-[140px] md:max-w-[160px] whitespace-normal leading-tight block select-none self-start z-10 relative">{type.name}</span> 
            
            {type.count !== undefined && (
              <div className="mt-auto z-10 relative font-black text-5xl md:text-6xl text-[#F0F0F0] transition-all group-hover:text-[#0B3D91]" style={{ textShadow: '1px 1px 2px rgba(255,255,255,1), -1px -1px 3px rgba(0,0,0,0.1)' }}>
                {type.count}
              </div>
            )}

            <img 
              src={type.icon} 
              alt={type.name} 
              draggable={false}
              className="absolute top-0 right-0 h-full w-auto min-w-[50%] object-cover object-right group-hover:scale-105 transition-transform duration-700 pointer-events-none mix-blend-multiply opacity-90 select-none" 
            />
            {/* Fade gradient overlay for the photo style to blend image with card */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none select-none"></div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PopularProperties({ properties }) {
  return (
    <section id="properties" className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-6 md:pt-9 pb-12 md:pb-24">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-9 gap-4">
        <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-bold text-[#1A1A18] tracking-[-0.5px] leading-[1.1] m-0 text-center md:text-left w-full md:w-auto">
          Popular properties
        </h2>
        <a href="/listings" className="hidden md:flex group font-sans text-sm font-bold text-[#0B3D91] hover:text-[#2B7FFF] transition-all items-center gap-2 py-2 px-5 rounded-full bg-white hover:bg-blue-50/70 border border-slate-200/80 shadow-sm">
          View all listings 
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-6">
        {properties.map((p) => (
          <PropertyCard key={p.id} listing={p} />
        ))}
      </div>
      
      <div className="md:hidden mt-8 flex justify-center">
        <a href="/listings" className="group font-sans text-sm font-bold text-[#0B3D91] hover:text-[#2B7FFF] transition-all flex items-center justify-center gap-2 py-3 w-full rounded-full bg-white border border-[#E8E5DF] shadow-sm">
          View all listings 
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}

function Services() {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselItems = [
    { image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600", title: "The best choice", subtitle: "For your future" },
    { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600", title: "Modern Design", subtitle: "Absolute comfort" },
    { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600", title: "Premium Locations", subtitle: "In the heart of nature" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const services = [
    { title: "Buying", description: "We find the perfect home for you.", icon: "https://placehold.co/150x150/f8f9fa/333?text=B" },
    { title: "Selling", description: "We sell quickly at the best price.", icon: "https://placehold.co/150x150/f8f9fa/333?text=S" },
    { title: "Renting", description: "We find reliable tenants for you.", icon: "https://placehold.co/150x150/f8f9fa/333?text=R" },
    { title: "Consulting", description: "Expert market analysis and advice.", icon: "https://placehold.co/150x150/f8f9fa/333?text=C" },
    { title: "Valuation", description: "Precise and realistic market valuations.", icon: "https://placehold.co/150x150/f8f9fa/333?text=V" },
    { title: "Management", description: "We take care of all property worries.", icon: "https://placehold.co/150x150/f8f9fa/333?text=M" },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-[#FAFAF8]">
      <div className="mb-8 md:mb-10">
        <h2 className="font-serif text-[clamp(28px,3vw,36px)] font-bold text-[#1A1A18] tracking-[-0.5px] leading-[1.1] m-0">
          Our Services
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-5">
        
        {/* Left Side: 3x2 Grid of Small Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, i) => (
            <div key={i} className="group relative bg-white rounded-2xl p-5 h-[160px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-[#E8E5DF]/50 hover:shadow-[0_8px_30px_rgba(11,61,145,0.08)] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer">
              <div className="z-10">
                <h3 className="font-sans font-semibold text-[#1A1A18] text-[16px] mb-1">
                  {service.title}
                </h3>
                <p className="font-sans text-[#6B7280] text-[13px] leading-snug font-medium max-w-[180px]">
                  {service.description}
                </p>
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-[100px] h-[100px] bg-[#F0F4F8] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <span className="font-serif font-bold text-4xl text-[#0B3D91] opacity-40">{service.icon.slice(-1)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Tall Carousel Promo Banner */}
        <div className="lg:col-span-1 h-full min-h-[340px] rounded-2xl relative overflow-hidden group shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          {carouselItems.map((item, i) => (
            <div 
              key={i} 
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === activeSlide ? 1 : 0 }}
            >
              <img src={item.image} alt={item.title} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] ease-linear ${i === activeSlide ? 'scale-110' : 'scale-100'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2F57] via-[#0F2F57]/50 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white z-10 mt-16">
                <h3 className="font-sans text-2xl font-bold mb-2 drop-shadow-lg">{item.title}</h3>
                <p className="font-sans text-[11px] font-bold tracking-widest uppercase opacity-90">{item.subtitle}</p>
              </div>
            </div>
          ))}

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
            {carouselItems.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setActiveSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === activeSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
              ></div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function AgentRecruitmentBanner() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10">
      <div className="w-full bg-gradient-to-br from-[#0B3D91] via-[#1a55b3] to-[#2B7FFF] rounded-[32px] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(11,61,145,0.3)]">
        
        {/* Background Decorative Elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

        <div className="flex-1 text-left relative z-10 mb-8 md:mb-0 max-w-xl">
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-white tracking-tight leading-[1.1] mb-4">
            List your property<br/>on Haven today
          </h2>
          <p className="font-sans text-blue-100 text-sm md:text-base mb-8 max-w-md font-medium leading-relaxed">
            Reach thousands of potential buyers and renters. Create an account in seconds to start listing your properties on our premium platform.
          </p>
          <SignInButton mode="modal" fallbackRedirectUrl="/dashboard" forceRedirectUrl="/dashboard">
            <button className="bg-white text-[#0B3D91] font-sans text-sm font-bold py-3 px-8 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 border-none cursor-pointer">
              Create an property
            </button>
          </SignInButton>
        </div>

        <div className="flex-1 relative z-10 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[500px]">
             {/* Tablet Mockup Placeholder */}
             <div className="w-full aspect-[4/3] bg-[#0f172a] rounded-3xl border-8 border-[#080c17] shadow-2xl overflow-hidden relative rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="w-full h-8 bg-[#1e293b] flex items-center px-4 gap-2 border-b border-[#334155]">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
               </div>
               <div className="p-4 bg-[#f8fafc] h-full">
                  <div className="flex gap-4 items-center mb-4 border-b pb-4 border-[#e2e8f0]">
                    <div className="w-16 h-16 rounded-full bg-[#cbd5e1]"></div>
                    <div>
                      <div className="w-32 h-4 bg-[#cbd5e1] rounded mb-2"></div>
                      <div className="w-20 h-3 bg-[#e2e8f0] rounded"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-24 bg-[#e2e8f0] rounded-lg"></div>
                    <div className="h-24 bg-[#e2e8f0] rounded-lg"></div>
                    <div className="h-24 bg-[#e2e8f0] rounded-lg"></div>
                  </div>
               </div>
             </div>
             
             {/* Floating Coffee Cup */}
             <img src="https://placehold.co/100x100/f8f9fa/333?text=Haven" alt="Haven" className="absolute -right-8 -top-8 w-24 h-24 rounded-full shadow-xl border-4 border-white rotate-12" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Agents({ agents }) {
  if (!agents || agents.length === 0) return null;

  return (
    <section id="agents" className="relative bg-[#FAFAF8] py-12 md:py-24">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10 text-center">
        <h2 className="font-serif text-[clamp(28px,3vw,36px)] font-bold text-[#1A1A18] tracking-[-0.5px] leading-[1.1] mb-12">
          Our top agents
        </h2>

        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {agents.map((a) => (
            <AgentCard key={a.id} agent={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvancedSearchPromo() {
  const { themeColor } = useFontTheme() || { themeColor: 'light-gradient' };

  return (
    <section className={`w-full relative overflow-hidden flex flex-col items-center justify-center py-8 md:py-14 ${themeColor === 'solid-blue' ? 'bg-[#0052cc]' : 'bg-gradient-to-br from-[#EAF2FF] via-[#FAFAF8] to-[#E6F0FF]'}`}>
      {/* Dynamic Background matching Hero background color */}
      {themeColor === 'solid-blue' ? null : (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[0%] left-[-10%] w-[40%] h-[50%] bg-blue-300/30 rounded-full blur-[68px] mix-blend-multiply animate-pulse"></div>
          <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/20 rounded-full blur-[68px] mix-blend-multiply"></div>
          <div className="absolute top-0 left-0 right-0 h-10 sm:h-12 bg-gradient-to-b from-[#FAFAF8] to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-12 bg-gradient-to-t from-[#FAFAF8] to-transparent pointer-events-none"></div>
        </div>
      )}

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10 flex flex-col items-center text-center pt-6 md:pt-10">
        <h2 className={`font-serif text-[clamp(32px,4vw,48px)] font-bold leading-[1.15] mb-4 max-w-4xl mx-auto ${themeColor === 'solid-blue' ? 'text-white' : 'text-[#1A1A18]'}`}>
          We'll help you find the perfect property for your needs.
        </h2>
        <p className={`font-sans text-base sm:text-lg max-w-2xl mx-auto leading-[1.6] mb-8 font-normal ${themeColor === 'solid-blue' ? 'text-blue-100' : 'text-[#4A5568]'}`}>
          Explore verified properties, with transparent pricing and dedicated agents ready to guide you at every step.
        </p>

        {/* 3D Illustration Container */}
        <div className="w-full mt-2 relative flex items-center justify-center">
          <img
            src="/promo_3d.png"
            alt="Haven 3D Interactive Real Estate Concept"
            className="w-full max-w-4xl h-auto max-h-[55vh] object-contain object-center relative z-0 transition-transform duration-700 hover:scale-[1.01]"
          />
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ properties, agents }) {
  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen">
      <Navbar />
      <HeroGradient />
      <PropertyTypes />
      <PopularProperties properties={properties} />
      <AdvancedSearchPromo />
      <Services />
      <AgentRecruitmentBanner />
      <Agents agents={agents} />
      <Footer />
    </div>
  );
}
