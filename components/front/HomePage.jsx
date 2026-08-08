"use client";

import { useState, useRef, useEffect } from "react";
import { useFontTheme } from "@/components/shared/FontProvider";
import Link from 'next/link';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { formatPrice } from "@/lib/data";
import { PropertyCard } from "./PropertyCard";
import { ContactAgentButton } from "./ContactAgentModal";

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

  const { fontStyle, setFontStyle, pillWidth, setPillWidth, themeColor, setThemeColor, cardStyle, setCardStyle } = useFontTheme();

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
    <section className={`relative z-[100] w-full min-h-94 h-auto flex flex-col items-center justify-center text-center pt-21 pb-9 ${themeColor === 'solid-blue' ? 'bg-[#0052cc]' : ''}`}>
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

function PopularProperties({ properties }) {
  return (
    <section id="properties" className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-9 pb-24">
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

function Agents({ agents }) {
  return (
    <section id="agents" className="relative bg-gradient-to-b from-[#FAFAF8] via-[#F3F7FF]/50 to-[#FAFAF8] py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#EAF2FF] to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 text-center md:text-left">
          <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-bold text-[#1A1A18] tracking-[-0.5px] leading-[1.1] m-0">
            Meet our top agents
          </h2>
          <a href="/agents" className="group font-sans text-sm font-bold text-[#0B3D91] hover:text-[#2B7FFF] transition-all flex items-center gap-2 mx-auto md:mx-0 py-2 px-5 rounded-full bg-white hover:bg-blue-50/70 border border-slate-200/80 shadow-sm">
            See all agents
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {agents.map((a) => (
            <article
              key={a.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-[#E8E5DF]/80 hover:border-[#2B7FFF]/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(11,61,145,0.12)] flex flex-col justify-between"
            >
              <div>
                {/* Full-bleed Tall Image Container with Verified Badge on Right */}
                <div className="relative w-full h-72 overflow-hidden bg-gradient-to-b from-[#F2F6FE] to-white border-b border-[#F0F2F7]">
                  <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-md text-[#0B3D91] font-sans text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm border border-blue-100 flex items-center gap-1">
                    <span className="text-[#2B7FFF]">★</span> Verified
                  </div>
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#EAF2FF] flex items-center justify-center text-[#0B3D91] font-serif font-bold text-3xl">
                      {a.name?.charAt(0) || "A"}
                    </div>
                  )}
                </div>

                {/* Minimal Elegant Agent Header */}
                <div className="p-6 text-left">
                  <h3 className="font-serif text-xl font-bold text-[#1A1A18] mb-1 group-hover:text-[#0B3D91] transition-colors">
                    {a.name}
                  </h3>
                  <p className="font-sans text-xs font-semibold text-[#6B7280] uppercase tracking-wider line-clamp-1">
                    {a.role}
                  </p>
                </div>
              </div>

              {/* Single Minimal Contact CTA */}
              <div className="px-6 pb-6 pt-0">
                <ContactAgentButton agent={a} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvancedSearchPromo() {
  const { themeColor } = useFontTheme() || { themeColor: 'light-gradient' };

  return (
    <section className={`w-full relative overflow-hidden flex flex-col items-center justify-center py-10 md:py-14 ${themeColor === 'solid-blue' ? 'bg-[#0052cc]' : 'bg-gradient-to-br from-[#EAF2FF] via-[#FAFAF8] to-[#E6F0FF]'}`}>
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
          Vă vom ajuta să găsiți cazare conform nevoilor dumneavoastră.
        </h2>
        <p className={`font-sans text-base sm:text-lg max-w-2xl mx-auto leading-[1.6] mb-8 font-normal ${themeColor === 'solid-blue' ? 'text-blue-100' : 'text-[#4A5568]'}`}>
          Explorați proprietăți verificate, cu prețuri transparente și agenți dedicați gata să vă ghideze la fiecare pas.
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
      <PopularProperties properties={properties} />
      <AdvancedSearchPromo />
      <Agents agents={agents} />
      <Footer />
    </div>
  );
}
