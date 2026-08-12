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
import { submitContactForm } from "@/app/actions/contact";

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

  const { fontStyle, setFontStyle, pillWidth, setPillWidth, themeColor, setThemeColor, cardStyle, setCardStyle, propertyTypeStyle, setPropertyTypeStyle, promoStyle, setPromoStyle } = useFontTheme();

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
    <section className="relative z-[100] w-full flex flex-col items-center justify-center text-center pt-24 md:pt-32 pb-12 md:pb-16 bg-[#FAFAF8]">
      {/* Dynamic Animated Background (Soft White/Light Blue) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[30%] h-[40%] bg-[#F0F4F8] rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[40%] h-[50%] bg-[#EAF2FF] rounded-full blur-[120px]"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center mt-0 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        


        <div className={`w-full relative transition-all duration-700 flex flex-col items-center ${
          themeColor === 'solid-blue' 
            ? 'bg-[#1E65FF] shadow-[0_20px_60px_rgba(30,101,255,0.2)] border-transparent rounded-[40px] md:rounded-[48px] p-8 md:p-16 lg:p-20 overflow-hidden' 
            : 'bg-transparent border-none rounded-none p-0 overflow-visible'
        }`}>
          {/* Layout Toggle Menu inside Hero */}
          <div className={`absolute z-[60] ${themeColor === 'solid-blue' ? 'top-4 right-4 md:top-8 md:right-8' : 'top-0 right-0 md:top-[-20px] md:right-4'}`} ref={menuRef}>
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className={`p-2 md:p-3 backdrop-blur-md rounded-full shadow-sm transition-all border ${
                themeColor === 'solid-blue'
                  ? 'bg-white/10 hover:bg-white text-white hover:text-[#1E65FF] border-white/20'
                  : 'bg-white/80 hover:bg-white text-slate-500 hover:text-[#1E65FF] border-slate-200'
              }`}
              title="Search Settings"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute top-[120%] right-0 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-[70] min-w-44 animate-in fade-in zoom-in-95 origin-top-right text-left text-slate-800">
                <p className="font-sans text-[9px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">Font Style</p>
                <button onClick={() => { setFontStyle('modern'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${fontStyle === 'modern' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Modern (Jakarta) {fontStyle === 'modern' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
                <button onClick={() => { setFontStyle('minimalist'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${fontStyle === 'minimalist' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Minimalist {fontStyle === 'minimalist' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
                <button onClick={() => { setFontStyle('elegant'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${fontStyle === 'elegant' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Elegant (Manrope) {fontStyle === 'elegant' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
                <button onClick={() => { setFontStyle('sora'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${fontStyle === 'sora' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Futuristic (Sora) {fontStyle === 'sora' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
                <button onClick={() => { setFontStyle('outfit'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${fontStyle === 'outfit' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Friendly (Outfit) {fontStyle === 'outfit' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
                <button onClick={() => { setFontStyle('dm-sans'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${fontStyle === 'dm-sans' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Balanced (DM Sans) {fontStyle === 'dm-sans' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
                <button onClick={() => { setFontStyle('urbanist'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${fontStyle === 'urbanist' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Modern (Urbanist) {fontStyle === 'urbanist' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
                <button onClick={() => { setFontStyle('space-grotesk'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${fontStyle === 'space-grotesk' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Brand (Space Grotesk) {fontStyle === 'space-grotesk' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
                
                <div className="h-px bg-slate-100 my-2 mx-1"></div>
                <p className="font-sans text-[9px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">Hero Theme</p>
                <button onClick={() => { setThemeColor('light-gradient'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${themeColor === 'light-gradient' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Light Gradient {themeColor === 'light-gradient' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
                <button onClick={() => { setThemeColor('solid-blue'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${themeColor === 'solid-blue' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Solid Blue {themeColor === 'solid-blue' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
                
                <div className="h-px bg-slate-100 my-2 mx-1"></div>
                <p className="font-sans text-[9px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">Property Cards</p>
                <button onClick={() => { setPropertyTypeStyle('modern'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${propertyTypeStyle === 'modern' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Modern Compact {propertyTypeStyle === 'modern' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
                <button onClick={() => { setPropertyTypeStyle('photo'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${propertyTypeStyle === 'photo' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Photo Realistic {propertyTypeStyle === 'photo' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>

                <div className="h-px bg-slate-100 my-2 mx-1"></div>
                <p className="font-sans text-[9px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">Promo Section</p>
                <button onClick={() => { setPromoStyle('full'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${promoStyle === 'full' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Full Width Split {promoStyle === 'full' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>

                <button onClick={() => { setPromoStyle('centered'); setMenuOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl font-sans text-[11px] font-semibold transition-colors flex items-center justify-between ${promoStyle === 'centered' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  Classic Centered {promoStyle === 'centered' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
              </div>
            )}
          </div>

          {/* Dynamic Background Elements */}
          {themeColor === 'solid-blue' ? (
            <>
              <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-white/5 rounded-l-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-[60px] pointer-events-none"></div>
            </>
          ) : (
            <>
              <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] bg-blue-50 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-slate-50 rounded-full blur-[60px] pointer-events-none"></div>
            </>
          )}

          {themeColor === 'solid-blue' ? (
            <>
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.5px] mb-6 max-w-4xl mx-auto text-center relative z-10 transition-colors duration-700 text-white">
                We'll help you find the perfect property for your needs.
              </h1>
              <p className="font-sans text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-center leading-[1.6] mb-12 font-medium relative z-10 transition-colors duration-700 text-white/90">
                Explore verified properties, with transparent pricing and dedicated agents ready to guide you at every step.
              </p>
            </>
          ) : (
            <>
              <h1 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.5px] mb-5 drop-shadow-sm text-[#1A1A18] md:whitespace-nowrap text-center relative z-10">
                Find your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1E65FF] to-[#4388FF]">Haven.</span>
              </h1>
              <p className="font-sans text-base sm:text-lg text-[#4A5568] max-w-2xl mx-auto text-center leading-[1.6] mb-8 font-medium md:whitespace-nowrap relative z-10">
                Browse curated houses, condos, and apartments from agents who actually answer the phone.
              </p>
            </>
          )}

        {!isMounted ? (
          <div className={`flex flex-col bg-white/95 backdrop-blur-xl p-1.5 w-full relative z-20 ${
            themeColor === 'solid-blue'
              ? 'rounded-[14px] lg:rounded-full shadow-[0_40px_100px_-10px_rgba(11,61,145,0.4)] border border-white/80'
              : 'rounded-[14px] lg:rounded-[9px] shadow-[0_40px_100px_-10px_rgba(11,61,145,0.3)] border border-white/80'
          }`}>
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
          <form action="/listings" method="GET" className={`flex flex-col backdrop-blur-xl p-1.5 rounded-[14px] w-full relative z-20 transition-all duration-500 border ${
            themeColor === 'solid-blue'
              ? 'lg:rounded-full bg-white/70 shadow-[0_40px_100px_-10px_rgba(11,61,145,0.4)] border-white/80 hover:shadow-[0_50px_120px_-10px_rgba(11,61,145,0.5)]'
              : 'lg:rounded-[9px] bg-white/95 shadow-[0_40px_100px_-10px_rgba(11,61,145,0.3)] border-white/80 hover:shadow-[0_40px_110px_-10px_rgba(11,61,145,0.35)]'
          }`}>
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
                  <input type="number" min="0" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }} name="minPrice" placeholder="Price from" className="w-full border-none bg-transparent font-sans text-xs sm:text-sm font-normal text-[#1A1A18] outline-none placeholder:text-slate-500 placeholder:font-normal min-w-0" />
                  <span className="text-slate-400 font-normal">-</span>
                  <input type="number" min="0" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }} name="maxPrice" placeholder="Price to" className="w-full border-none bg-transparent font-sans text-xs sm:text-sm font-normal text-[#1A1A18] outline-none placeholder:text-slate-500 placeholder:font-normal min-w-0" />
                  <span className="font-sans text-xs sm:text-sm font-normal text-[#1A1A18] ml-1">€</span>
                </div>
              </div>

              {/* Search Button */}
              <div className="col-span-2 lg:col-span-1 flex justify-center mt-2 lg:mt-0 p-1.5 lg:p-0">
                <button type="submit" className="w-full lg:w-auto bg-gradient-to-r from-[#1E65FF] to-[#1455E1] text-white font-sans text-sm sm:text-base font-normal py-2.5 px-8 rounded-[9px] lg:rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.02] h-11 lg:h-full lg:ml-1.5 shrink-0 shadow-[0_8px_24px_rgba(11,61,145,0.4)]">
                  Search
                </button>
              </div>
            </div>
          </form>
        )}
        </div>
      </div>
    </section>
  );
}

function PropertyTypes({ categories = [] }) {
  const { propertyTypeStyle } = useFontTheme();
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const defaultTypes = [
    { name: "Apartments", slug: "apartment", icon: "/prop_apt_1786370381611.png" },
    { name: "Houses & Villas", slug: "house", icon: "/prop_house_1786370408922.png" },
    { name: "Land", slug: "land", icon: "/prop_land_1786370435215.png" },
    { name: "Commercial", slug: "commercial", icon: "/prop_commercial_1786370451322.png" },
    { name: "Residential", slug: "residential", icon: "/prop_residential_1786370470652.png" },
  ];

  const typesMap = new Map();
  defaultTypes.forEach(t => typesMap.set(t.slug, { ...t, count: 0 }));

  categories.forEach(cat => {
    if (typesMap.has(cat.slug)) {
      typesMap.get(cat.slug).count = cat._count?.properties || 0;
    } else {
      typesMap.set(cat.slug, {
        name: cat.name,
        slug: cat.slug,
        count: cat._count?.properties || 0,
        icon: "/prop_apt_1786370381611.png" // fallback for unknown types
      });
    }
  });

  const types = Array.from(typesMap.values());

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
                href={`/listings?type=${type.slug}`} 
                onClick={handleClick}
                draggable={false}
                key={i} 
                className="group relative flex-none w-[320px] md:w-[360px] h-[200px] md:h-[240px] bg-[#F5F5F5] rounded-[24px] md:rounded-[32px] p-6 hover:shadow-md transition-all duration-300 snap-center overflow-hidden flex justify-between !cursor-[inherit]"
              >
                <div className="flex flex-col justify-between relative z-10 w-[55%]">
                  <span className="font-sans font-bold text-[#1A1A18] text-lg md:text-xl leading-tight block select-none self-start">{type.name}</span> 
                  
                  {type.count !== undefined && (
                    <div className="mt-auto font-black text-4xl text-[#E8E8E8] transition-all group-hover:text-[#1E65FF]" style={{ textShadow: '1px 1px 2px rgba(255,255,255,1), -1px -1px 2px rgba(0,0,0,0.08)' }}>
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
            href={`/listings?type=${type.slug}`} 
            onClick={handleClick}
            draggable={false}
            key={i} 
            className="group relative flex-none w-[320px] md:w-[360px] h-[200px] md:h-[240px] bg-white rounded-[24px] md:rounded-[32px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-[#E8E5DF]/60 hover:shadow-[0_12px_40px_rgba(11,61,145,0.08)] transition-all duration-300 snap-center overflow-hidden flex flex-col justify-between !cursor-[inherit]"
          >
            <span className="font-sans font-semibold text-[#1A1A18] text-xl md:text-2xl max-w-[140px] md:max-w-[160px] whitespace-normal leading-tight block select-none self-start z-10 relative">{type.name}</span> 
            
            {type.count !== undefined && (
              <div className="mt-auto z-10 relative font-black text-5xl md:text-6xl text-[#F0F0F0] transition-all group-hover:text-[#1E65FF]" style={{ textShadow: '1px 1px 2px rgba(255,255,255,1), -1px -1px 3px rgba(0,0,0,0.1)' }}>
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
        <a href="/listings" className="hidden md:flex group font-sans text-sm font-bold text-[#1E65FF] hover:text-[#2B7FFF] transition-all items-center gap-2 py-2 px-5 rounded-full bg-white hover:bg-blue-50/70 border border-slate-200/80 shadow-sm">
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
        <a href="/listings" className="group font-sans text-sm font-bold text-[#1E65FF] hover:text-[#2B7FFF] transition-all flex items-center justify-center gap-2 py-3 w-full rounded-full bg-white border border-[#E8E5DF] shadow-sm">
          View all listings 
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { 
      title: "Buying", 
      description: "We find the perfect home for you.", 
      image: "/services/buying.jpg", // We will use a placeholder or image styling for the bottom right
      type: "tall"
    },
    { 
      title: "Selling", 
      description: "We sell quickly at the best price.", 
      image: "/services/selling.jpg", 
      type: "tall"
    },
    { title: "Renting", description: "We find reliable tenants.", type: "small" },
    { title: "Consulting", description: "Expert market analysis.", type: "small" },
    { title: "Valuation", description: "Precise market valuations.", type: "small" },
    { title: "Management", description: "We take care of worries.", type: "small" },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-[#FAFAF8]">
      <div className="mb-10 md:mb-16 text-center">
        <span className="text-[#1E65FF] font-sans font-bold text-sm tracking-wider uppercase mb-3 block">Haven 3D Interactive Real Estate Concept</span>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1A18] tracking-[-0.5px] leading-[1.1] m-0">
          Our Services
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        
        {/* Left Side: 2 Tall Cards */}
        <div className="flex flex-col sm:flex-row gap-5 lg:w-1/2">
          {services.filter(s => s.type === "tall").map((service, i) => (
            <div key={i} className="group relative w-full sm:w-1/2 bg-white rounded-[32px] p-8 h-[400px] lg:h-[480px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer border border-slate-100/50">
              <div className="z-20 relative">
                <h3 className="font-sans font-semibold text-[#1A1A18] text-xl mb-2">
                  {service.title}
                </h3>
                <p className="font-sans text-[#6B7280] text-sm leading-snug font-medium max-w-[180px]">
                  {service.description}
                </p>
              </div>
              


              {/* Bottom Right Illustration (Mockup placeholder using gradients/shapes) */}
              <div className="absolute -bottom-8 -right-8 w-[250px] h-[250px] rounded-tl-[100px] bg-gradient-to-tr from-slate-100 to-slate-50 group-hover:scale-105 transition-transform duration-700 flex items-center justify-center opacity-80">
                {i === 0 ? (
                  <svg className="w-32 h-32 text-slate-300 ml-8 mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                ) : (
                  <svg className="w-32 h-32 text-slate-300 ml-8 mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: 2x2 Grid of Small Cards */}
        <div className="grid grid-cols-2 gap-5 lg:w-1/2">
          {services.filter(s => s.type === "small").map((service, i) => (
            <div key={i} className="group relative bg-white rounded-[32px] p-6 h-[190px] lg:h-[230px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer border border-slate-100/50">
              <div className="z-20 relative">
                <h3 className="font-sans font-semibold text-[#1A1A18] text-base lg:text-lg mb-1">
                  {service.title}
                </h3>
                <p className="font-sans text-[#6B7280] text-[12px] lg:text-[13px] leading-snug font-medium max-w-[140px]">
                  {service.description}
                </p>
              </div>
              


              {/* Bottom Right Icon/Illustration */}
              <div className="absolute -bottom-6 -right-6 w-[120px] h-[120px] rounded-tl-[60px] bg-slate-50 group-hover:bg-blue-50/50 group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
                <span className="font-serif font-bold text-5xl text-slate-200 group-hover:text-[#1E65FF]/20 transition-colors duration-500 ml-4 mb-4">{service.title.charAt(0)}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function Features() {
  const features = [
    {
      title: "Local Market Knowledge",
      description: "We know the neighborhoods, the schools, and the hidden gems. Get the inside scoop before you buy.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
          <line x1="9" y1="3" x2="9" y2="18"></line>
          <line x1="15" y1="6" x2="15" y2="21"></line>
        </svg>
      ),
      color: "bg-blue-50 text-[#1E65FF]",
      border: "border-blue-100",
      glow: "bg-blue-400"
    },
    {
      title: "Honest Pricing",
      description: "No hidden fees or surprise costs. See real transaction histories and exactly what properties are worth.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
          <line x1="12" y1="18" x2="12" y2="6"></line>
        </svg>
      ),
      color: "bg-emerald-50 text-emerald-600",
      border: "border-emerald-100",
      glow: "bg-emerald-400"
    },
    {
      title: "Vetted Agents",
      description: "Work with top-rated local agents who have a proven track record of closing deals quickly and fairly.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M9 12l2 2 4-4"></path>
        </svg>
      ),
      color: "bg-purple-50 text-purple-600",
      border: "border-purple-100",
      glow: "bg-purple-400"
    }
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-slate-50/50 rounded-bl-full blur-[100px] pointer-events-none"></div>
      
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1A18] tracking-tight leading-tight mb-4">
          Why Choose Haven
        </h2>
        <p className="font-sans text-[#6B7280] text-lg">
          We bring transparency and trust to every step of your real estate journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        {features.map((feat, i) => (
          <div key={i} className="group relative bg-white rounded-[32px] p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-slate-200 transition-all duration-500 flex flex-col overflow-hidden">
            
            {/* Hover glow effect behind the card content */}
            <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full ${feat.glow} opacity-0 group-hover:opacity-10 blur-[40px] transition-all duration-700`}></div>
            
            <div className={`w-16 h-16 rounded-2xl ${feat.color} border ${feat.border} flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out`}>
              {feat.icon}
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-[#1A1A18] mb-4 relative z-10">
              {feat.title}
            </h3>
            
            <p className="font-sans text-[#6B7280] text-base leading-relaxed relative z-10">
              {feat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AgentRecruitmentBanner() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 md:py-16">
      <div className="w-full bg-[#1E65FF] rounded-[32px] md:rounded-[40px] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(30,101,255,0.2)]">
        
        {/* Background Decorative Elements (Subtle) */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 rounded-l-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="flex-1 text-left relative z-10 mb-8 md:mb-0 max-w-xl">
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-white tracking-tight leading-[1.1] mb-4">
            List your property<br/>on Haven today
          </h2>
          <p className="font-sans text-white/90 text-sm md:text-base mb-8 max-w-md font-medium leading-relaxed">
            Reach thousands of potential buyers and renters. Create an account in seconds to start listing your properties on our premium platform.
          </p>
          <SignInButton mode="modal" fallbackRedirectUrl="/dashboard" forceRedirectUrl="/dashboard">
            <button className="bg-white text-[#1E65FF] font-sans text-sm font-bold py-3.5 px-8 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 border-none cursor-pointer flex items-center gap-2">
              Create a property listing
              <span className="text-xl leading-none">→</span>
            </button>
          </SignInButton>
        </div>

        <div className="flex-1 relative z-10 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[400px]">
             {/* Simple App UI Mockup (Clean White Bento) */}
             <div className="w-full aspect-[4/3] bg-[#FAFAF8] rounded-[24px] shadow-2xl p-4 flex flex-col gap-3 relative transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <div className="w-full flex justify-between items-center mb-2">
                  <div className="w-24 h-4 bg-slate-200 rounded-full"></div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                </div>
                <div className="w-full h-32 bg-slate-200 rounded-[16px] overflow-hidden relative">
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-700">Premium Listing</div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 h-16 bg-slate-100 rounded-[12px]"></div>
                  <div className="flex-1 h-16 bg-slate-100 rounded-[12px]"></div>
                </div>
             </div>
             
             {/* Floating UI Elements */}
             <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white rounded-2xl shadow-xl p-3 flex flex-col justify-center items-center gap-2 transform rotate-12">
               <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg">✓</div>
               <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Agents({ agents }) {
  if (!agents || agents.length === 0) return null;

  return (
    <section id="agents" className="relative bg-[#FAFAF8] py-16 md:py-24 overflow-hidden border-t border-slate-100">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Copy & Overlapping Avatars */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-[#1E65FF] font-sans font-bold text-sm tracking-wider uppercase mb-4 block">Dedicated Experts</span>
          <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-bold text-[#1A1A18] tracking-[-1px] leading-[1.05] mb-6">
            Meet the agents<br className="hidden md:block"/>ready to guide you.
          </h2>
          <p className="font-sans text-[#6B7280] text-base md:text-lg mb-8 max-w-md leading-relaxed font-medium">
            Our certified professionals are committed to transparency, excellence, and finding you the perfect property.
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              {agents.slice(0, 4).map((a, i) => (
                <img 
                  key={a.id} 
                  src={a.image || "https://placehold.co/150x150/e2e8f0/64748b?text=Agent"} 
                  alt={a.name}
                  className="w-14 h-14 rounded-full border-[3px] border-[#FAFAF8] object-cover shadow-sm relative transition-transform duration-300 hover:scale-110 hover:z-20 cursor-pointer"
                  style={{ zIndex: 10 - i }}
                />
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[#1A1A18]">
                <span className="font-bold text-lg">{agents.length}+</span>
                <span className="font-sans font-medium text-sm">Agents</span>
              </div>
              <span className="text-xs text-[#6B7280] font-sans">Ready to help you</span>
            </div>
          </div>
        </div>

        {/* Right Side: Featured Agent / Testimonial Card */}
        <div className="flex-1 w-full max-w-lg">
          <div className="w-full bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-slate-100/50 relative">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#F0F4F8] rounded-full flex items-center justify-center pointer-events-none">
              <span className="text-4xl">❝</span>
            </div>
            <p className="font-serif text-xl md:text-2xl text-[#1A1A18] leading-snug italic mb-8 relative z-10">
              "We believe finding a home should be a seamless, transparent, and enjoyable experience. We're with you every step of the way."
            </p>
            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
              <img 
                src={agents[0].image || "https://placehold.co/150x150/e2e8f0/64748b?text=Agent"} 
                alt={agents[0].name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-sans font-bold text-[#1A1A18]">{agents[0].name}</h4>
                <p className="font-sans text-xs text-[#6B7280]">Lead Agent at Haven</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function AdvancedSearchPromo() {
  const { themeColor, promoStyle } = useFontTheme() || { themeColor: 'light-gradient', promoStyle: 'full' };


  if (promoStyle === 'centered') {
    return (
      <section className={`w-full py-16 md:py-24 relative overflow-hidden ${themeColor === 'solid-blue' ? 'bg-[#0052cc]' : 'bg-[#FAFAF8]'}`}>
        <style>{`
          @keyframes floatA { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
          @keyframes floatB { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
          @keyframes floatC { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
          @keyframes floatD { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
          .bubble-a{animation:floatA 3.2s ease-in-out infinite}
          .bubble-b{animation:floatB 3.8s ease-in-out infinite 0.6s}
          .bubble-c{animation:floatC 3s ease-in-out infinite 1.1s}
          .bubble-d{animation:floatD 4s ease-in-out infinite 0.3s}
        `}</style>
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10 flex flex-col items-center text-center">
          <span className={`font-sans font-bold text-sm tracking-wider uppercase mb-4 block ${themeColor === 'solid-blue' ? 'text-blue-200' : 'text-[#1E65FF]'}`}>
            Intelligent Search
          </span>
          <h2 className={`font-serif text-[clamp(32px,5vw,64px)] font-bold tracking-tight leading-[1.05] mb-6 max-w-4xl mx-auto ${themeColor === 'solid-blue' ? 'text-white' : 'text-[#1A1A18]'}`}>
            We'll help you find the perfect property for your needs.
          </h2>
          <p className={`font-sans text-base md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto ${themeColor === 'solid-blue' ? 'text-blue-50' : 'text-[#6B7280] font-medium'}`}>
            Explore verified properties, with transparent pricing and dedicated agents ready to guide you at every step.
          </p>
          <button className={`px-8 py-4 rounded-xl font-bold text-sm transition-all mb-16 ${themeColor === 'solid-blue' ? 'bg-white text-[#0052cc] hover:bg-slate-50' : 'bg-[#1E65FF] text-white hover:bg-[#1455E1] shadow-lg shadow-blue-500/25 hover:-translate-y-0.5'}`}>
            Explore Properties
          </button>
          
          {/* Image with floating bubbles */}
          <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center mt-4 min-h-[380px] md:min-h-[480px]">
            {themeColor !== 'solid-blue' && (
              <div className="absolute inset-0 bg-[#1E65FF]/5 rounded-full blur-[100px] -z-10"></div>
            )}
            <img
              src="/promo_3d.png"
              alt="Haven 3D Interactive Real Estate Concept"
              className="w-full h-auto object-contain transition-transform duration-700 hover:-translate-y-2 hover:scale-[1.02] relative z-10"
            />
            {/* Bubble: Bed — top left, tail bottom-right */}
            <div className="bubble-a absolute top-[12%] left-[8%] md:top-[14%] md:left-[12%] z-20">
              <div className="relative bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.11)] px-5 py-4 flex flex-col items-center gap-1.5 border border-slate-100 min-w-[86px]">
                <span className="text-4xl">🛏️</span>
                <span className="font-sans text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Bedroom</span>
                <div className="absolute -bottom-4 right-5 w-0 h-0 border-l-[14px] border-l-transparent border-t-[16px] border-t-white border-r-[5px] border-r-transparent"></div>
              </div>
            </div>
            {/* Bubble: Sofa — top right, tail bottom-left */}
            <div className="bubble-b absolute top-[12%] right-[8%] md:top-[14%] md:right-[12%] z-20">
              <div className="relative bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.11)] px-5 py-4 flex flex-col items-center gap-1.5 border border-slate-100 min-w-[86px]">
                <span className="text-4xl">🛋️</span>
                <span className="font-sans text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Living</span>
                <div className="absolute -bottom-4 left-5 w-0 h-0 border-r-[14px] border-r-transparent border-t-[16px] border-t-white border-l-[5px] border-l-transparent"></div>
              </div>
            </div>
            {/* Bubble: Bathroom — bottom left, tail top-right */}
            <div className="bubble-c absolute bottom-[14%] left-[8%] md:bottom-[16%] md:left-[12%] z-20">
              <div className="relative bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.11)] px-5 py-4 flex flex-col items-center gap-1.5 border border-slate-100 min-w-[86px]">
                <span className="text-4xl">🛁</span>
                <span className="font-sans text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Bathroom</span>
                <div className="absolute -top-4 right-5 w-0 h-0 border-l-[14px] border-l-transparent border-b-[16px] border-b-white border-r-[5px] border-r-transparent"></div>
              </div>
            </div>
            {/* Bubble: Toilet — bottom right, tail top-left */}
            <div className="bubble-d absolute bottom-[14%] right-[8%] md:bottom-[16%] md:right-[12%] z-20">
              <div className="relative bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.11)] px-5 py-4 flex flex-col items-center gap-1.5 border border-slate-100 min-w-[86px]">
                <span className="text-4xl">🚽</span>
                <span className="font-sans text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Toilet</span>
                <div className="absolute -top-4 left-5 w-0 h-0 border-r-[14px] border-r-transparent border-b-[16px] border-b-white border-l-[5px] border-l-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default: 'full'
  return (
    <section className={`w-full py-16 md:py-24 relative overflow-hidden ${themeColor === 'solid-blue' ? 'bg-[#0052cc]' : 'bg-[#FAFAF8]'}`}>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes floatD { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
        .bubble-a{animation:floatA 3.2s ease-in-out infinite}
        .bubble-b{animation:floatB 3.8s ease-in-out infinite 0.6s}
        .bubble-c{animation:floatC 3s ease-in-out infinite 1.1s}
        .bubble-d{animation:floatD 4s ease-in-out infinite 0.3s}
      `}</style>
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <span className={`font-sans font-bold text-sm tracking-wider uppercase mb-4 block ${themeColor === 'solid-blue' ? 'text-blue-200' : 'text-[#1E65FF]'}`}>
            Intelligent Search
          </span>
          <h2 className={`font-serif text-[clamp(32px,4vw,52px)] font-bold tracking-tight leading-[1.05] mb-6 ${themeColor === 'solid-blue' ? 'text-white' : 'text-[#1A1A18]'}`}>
            We'll help you find the perfect property for your needs.
          </h2>
          <p className={`font-sans text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 ${themeColor === 'solid-blue' ? 'text-blue-50' : 'text-[#6B7280] font-medium'}`}>
            Explore verified properties, with transparent pricing and dedicated agents ready to guide you at every step.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button className={`px-8 py-4 rounded-xl font-bold text-sm transition-all ${themeColor === 'solid-blue' ? 'bg-white text-[#0052cc] hover:bg-slate-50' : 'bg-[#1E65FF] text-white hover:bg-[#1455E1] shadow-lg shadow-blue-500/25 hover:-translate-y-0.5'}`}>
              Explore Properties
            </button>
          </div>
        </div>

        {/* 3D Illustration with floating icon bubbles */}
        <div className="flex-1 relative w-full flex items-center justify-center min-h-[340px] md:min-h-[460px]">
          {themeColor !== 'solid-blue' && (
            <div className="absolute inset-0 bg-[#1E65FF]/5 rounded-full blur-[80px] -z-10"></div>
          )}
          <img
            src="/promo_3d.png"
            alt="Haven 3D Interactive Real Estate Concept"
            className="w-full max-w-[520px] h-auto object-contain transition-transform duration-700 hover:-translate-y-2 hover:scale-[1.02] relative z-10"
          />

          {/* Bubble: Bed — top left, tail bottom-right */}
          <div className="bubble-a absolute top-[10%] left-[6%] z-20">
            <div className="relative bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.11)] px-5 py-4 flex flex-col items-center gap-1.5 border border-slate-100 min-w-[86px]">
              <span className="text-4xl">🛏️</span>
              <span className="font-sans text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Bedroom</span>
              <div className="absolute -bottom-4 right-5 w-0 h-0 border-l-[14px] border-l-transparent border-t-[16px] border-t-white border-r-[5px] border-r-transparent"></div>
            </div>
          </div>

          {/* Bubble: Sofa — top right, tail bottom-left */}
          <div className="bubble-b absolute top-[14%] right-[6%] z-20">
            <div className="relative bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.11)] px-5 py-4 flex flex-col items-center gap-1.5 border border-slate-100 min-w-[86px]">
              <span className="text-4xl">🛋️</span>
              <span className="font-sans text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Living</span>
              <div className="absolute -bottom-4 left-5 w-0 h-0 border-r-[14px] border-r-transparent border-t-[16px] border-t-white border-l-[5px] border-l-transparent"></div>
            </div>
          </div>

          {/* Bubble: Bathroom — bottom left, tail top-right */}
          <div className="bubble-c absolute bottom-[14%] left-[6%] z-20">
            <div className="relative bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.11)] px-5 py-4 flex flex-col items-center gap-1.5 border border-slate-100 min-w-[86px]">
              <span className="text-4xl">🛁</span>
              <span className="font-sans text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Bathroom</span>
              <div className="absolute -top-4 right-5 w-0 h-0 border-l-[14px] border-l-transparent border-b-[16px] border-b-white border-r-[5px] border-r-transparent"></div>
            </div>
          </div>

          {/* Bubble: Toilet — bottom right, tail top-left */}
          <div className="bubble-d absolute bottom-[10%] right-[6%] z-20">
            <div className="relative bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.11)] px-5 py-4 flex flex-col items-center gap-1.5 border border-slate-100 min-w-[86px]">
              <span className="text-4xl">🚽</span>
              <span className="font-sans text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Toilet</span>
              <div className="absolute -top-4 left-5 w-0 h-0 border-r-[14px] border-r-transparent border-b-[16px] border-b-white border-l-[5px] border-l-transparent"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.target);
    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus("success");
      e.target.reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error || "An error occurred");
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-24 border-t border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 rounded-l-full blur-[100px] pointer-events-none"></div>
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Side: Contact Info */}
        <div className="flex-1 flex flex-col items-start text-left">
          <span className="text-[#1E65FF] font-sans font-bold text-sm tracking-wider uppercase mb-4 block">Get in Touch</span>
          <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-bold text-[#1A1A18] tracking-[-1px] leading-[1.05] mb-6">
            Let's talk about<br/>your next property.
          </h2>
          <p className="font-sans text-[#6B7280] text-base md:text-lg mb-12 max-w-md leading-relaxed font-medium">
            Whether you're looking to buy, sell, or rent, our team of experts is ready to assist you. Drop us a line and we'll get back to you shortly.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F0F4F8] flex items-center justify-center text-[#1E65FF]">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div>
                <p className="font-sans text-[#6B7280] text-sm mb-0.5">Call Us</p>
                <p className="font-sans font-bold text-[#1A1A18]">+373 60 123 456</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F0F4F8] flex items-center justify-center text-[#1E65FF]">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <p className="font-sans text-[#6B7280] text-sm mb-0.5">Email Us</p>
                <p className="font-sans font-bold text-[#1A1A18]">hello@haven.md</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="flex-1 w-full max-w-lg">
          <form onSubmit={handleSubmit} className="w-full bg-[#FAFAF8] rounded-[32px] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-5">
            {status === "success" && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-medium mb-2 border border-green-200">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium mb-2 border border-red-200">
                {errorMsg}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-sans text-sm font-semibold text-[#1A1A18]">First Name</label>
                <input required name="firstName" type="text" placeholder="John" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-sans text-sm text-[#1A1A18] outline-none focus:border-[#1E65FF] transition-colors" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-sans text-sm font-semibold text-[#1A1A18]">Last Name</label>
                <input required name="lastName" type="text" placeholder="Doe" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-sans text-sm text-[#1A1A18] outline-none focus:border-[#1E65FF] transition-colors" />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-sans text-sm font-semibold text-[#1A1A18]">Email Address</label>
              <input required name="email" type="email" placeholder="john@example.com" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-sans text-sm text-[#1A1A18] outline-none focus:border-[#1E65FF] transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-sm font-semibold text-[#1A1A18]">Message</label>
              <textarea required name="message" placeholder="How can we help you?" rows="4" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-sans text-sm text-[#1A1A18] outline-none focus:border-[#1E65FF] transition-colors resize-none"></textarea>
            </div>
            
            <button disabled={status === "loading"} type="submit" className="w-full bg-[#1E65FF] text-white font-sans font-bold text-sm py-4 rounded-xl shadow-[0_4px_14px_rgba(30,101,255,0.3)] hover:shadow-[0_8px_24px_rgba(30,101,255,0.4)] transition-all mt-2 border-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default function HomePage({ properties, agents, categories }) {
  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroGradient />
      <PropertyTypes categories={categories} />
      <PopularProperties properties={properties} />
      <AdvancedSearchPromo />
      <Services />
      <Features />
      <AgentRecruitmentBanner />
      <Agents agents={agents} />
      <ContactForm />
      <Footer />
    </div>
  );
}
