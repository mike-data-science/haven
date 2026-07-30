"use client";

import { useState, useRef, useEffect } from "react";
import { useFontTheme } from "@/components/shared/FontProvider";
import Link from 'next/link';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { formatPrice } from "../../lib/data";
import { PropertyCard } from "./PropertyCard";

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
          {label && <span className="font-sans text-xs sm:text-sm font-medium text-slate-500 whitespace-nowrap">{label}:</span>}
          <span className="font-sans text-sm sm:text-base font-bold text-[#1A1A18] whitespace-nowrap">
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
              className={`px-3 py-2 text-xs sm:text-sm cursor-pointer transition-colors select-none flex items-center justify-between ${o.value === value ? 'bg-blue-50/50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
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
  const [layoutType, setLayoutType] = useState('modern'); // 'modern' or 'classic'
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const { fontStyle, setFontStyle } = useFontTheme();

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
    <section className="relative z-[100] w-full min-h-94 h-auto flex flex-col items-center justify-center text-center px-4 pt-21 pb-9">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#EAF2FF] via-[#FAFAF8] to-[#E6F0FF] overflow-hidden">
        <div className="absolute top-[0%] left-[-10%] w-[40%] h-[50%] bg-blue-300/30 rounded-full blur-[68px] mix-blend-multiply animate-pulse"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/20 rounded-full blur-[68px] mix-blend-multiply"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-235 flex flex-col items-center mt-0 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        
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
              <p className="font-sans text-[7px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1.5">Search Layout</p>
              <button 
                onClick={() => { setLayoutType('modern'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${layoutType === 'modern' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Modern Layout
                {layoutType === 'modern' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <button 
                onClick={() => { setLayoutType('classic'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${layoutType === 'classic' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Classic Layout
                {layoutType === 'classic' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>

              <div className="h-px bg-slate-100 my-1.5 mx-1"></div>
              
              <p className="font-sans text-[7px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1.5">Font Style</p>
              <button 
                onClick={() => { setFontStyle('default'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${fontStyle === 'default' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Default Fonts
                {fontStyle === 'default' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <button 
                onClick={() => { setFontStyle('modern'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${fontStyle === 'modern' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Modern (Jakarta/Inter)
                {fontStyle === 'modern' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
              <button 
                onClick={() => { setFontStyle('classic'); setMenuOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded-xl font-sans text-[8px] font-medium transition-colors flex items-center justify-between ${fontStyle === 'classic' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Classic Elegance
                {fontStyle === 'classic' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
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
            </div>
          )}
        </div>

        <h1 className="font-serif text-[clamp(3rem,7vw,5.25rem)] font-bold text-[#1A1A18] leading-[1.05] tracking-[-1px] mb-5 drop-shadow-sm md:whitespace-nowrap">
          Find your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0B3D91] to-[#4388FF]">Haven.</span>
        </h1>
        <p className={`font-sans text-base sm:text-lg text-[#4A5568] max-w-2xl leading-[1.6] mb-6 md:whitespace-nowrap ${fontStyle === 'modern' ? 'font-normal' : 'font-medium'}`}>
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
        ) : layoutType === 'modern' ? (
          /* MODERN LAYOUT: Separated button, Price before Region */
          <form action="/listings" method="GET" className="flex flex-col lg:flex-row gap-3 w-full relative z-20 transition-all duration-300">
            {/* Filters Container */}
            <div className="flex-1 bg-white/95 backdrop-blur-xl rounded-[14px] lg:rounded-[9px] shadow-[0_40px_100px_-10px_rgba(11,61,145,0.3)] border border-white/80 transition-all duration-300 hover:shadow-[0_50px_120px_-10px_rgba(11,61,145,0.4)]">
              <div className="grid grid-cols-2 lg:flex lg:flex-row w-full items-stretch h-full">
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

                {/* Price From-To */}
                <div className="col-span-2 lg:col-span-1 flex-[1.4] px-3 py-2 flex items-center border-b lg:border-b-0 lg:border-r border-slate-300/50">
                  <div className="flex items-center gap-1.5 w-full">
                    <input type="number" name="minPrice" placeholder="Price from" className="w-full border-none bg-transparent font-sans text-xs sm:text-sm font-bold text-[#1A1A18] outline-none placeholder:text-slate-500 placeholder:font-medium min-w-0" />
                    <span className="text-slate-400 font-bold">-</span>
                    <input type="number" name="maxPrice" placeholder="Price to" className="w-full border-none bg-transparent font-sans text-xs sm:text-sm font-bold text-[#1A1A18] outline-none placeholder:text-slate-500 placeholder:font-medium min-w-0" />
                    <span className="font-sans text-xs sm:text-sm font-bold text-[#1A1A18] ml-1">€</span>
                  </div>
                </div>

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
                  className="border-b lg:border-b-0 border-slate-300/50"
                />
              </div>
            </div>

            {/* Search Button */}
            <button type="submit" className="w-full lg:w-36 bg-gradient-to-r from-[#0B3D91] to-[#1e58bd] text-white font-sans text-sm sm:text-base font-bold py-3.5 lg:py-0 px-6 rounded-[14px] lg:rounded-[9px] cursor-pointer transition-all duration-300 hover:scale-[1.03] lg:h-auto shrink-0 shadow-[0_8px_24px_rgba(11,61,145,0.4)]">
              Search
            </button>
          </form>
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
                  <input type="number" name="minPrice" placeholder="Price from" className="w-full border-none bg-transparent font-sans text-xs sm:text-sm font-bold text-[#1A1A18] outline-none placeholder:text-slate-500 placeholder:font-medium min-w-0" />
                  <span className="text-slate-400 font-bold">-</span>
                  <input type="number" name="maxPrice" placeholder="Price to" className="w-full border-none bg-transparent font-sans text-xs sm:text-sm font-bold text-[#1A1A18] outline-none placeholder:text-slate-500 placeholder:font-medium min-w-0" />
                  <span className="font-sans text-xs sm:text-sm font-bold text-[#1A1A18] ml-1">€</span>
                </div>
              </div>

              {/* Search Button */}
              <div className="col-span-2 lg:col-span-1 flex justify-center mt-2 lg:mt-0 p-1.5 lg:p-0">
                <button type="submit" className="w-full lg:w-auto bg-gradient-to-r from-[#0B3D91] to-[#1e58bd] text-white font-sans text-sm sm:text-base font-bold py-2.5 px-8 rounded-[9px] lg:rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.02] h-11 lg:h-full lg:ml-1.5 shrink-0 shadow-[0_8px_24px_rgba(11,61,145,0.4)]">
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
    <section id="properties" className="max-w-263 mx-auto px-5 pt-9 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-9 gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-6 h-1 bg-[#2B7FFF]"></div>
            <p className="font-sans text-xs font-bold uppercase tracking-[2px] text-[#2B7FFF] m-0">Hand-picked</p>
          </div>
          <h2 className="font-serif text-[clamp(36px,5vw,52px)] font-bold text-[#1A1A18] tracking-[-1px] leading-[1.1]">Popular properties</h2>
        </div>
        <a href="#all-properties" className="group font-sans text-sm font-bold text-[#0B3D91] hover:text-[#2B7FFF] transition-colors flex items-center gap-1.5">
          View all listings 
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
        {properties.map((p) => (
          <PropertyCard key={p.id} listing={p} />
        ))}
      </div>
    </section>
  );
}

function Agents({ agents }) {
  return (
    <section id="agents" className="relative bg-gradient-to-b from-[#FAFAF8] via-[#EAF2FF]/60 to-[#FAFAF8] py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#EAF2FF] to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="max-w-263 mx-auto px-5 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-9 gap-3 text-center md:text-left">
          <div className="w-full md:w-auto">
            <div className="flex items-center justify-center md:justify-start gap-1.5 mb-3">
              <div className="w-6 h-1 bg-[#2B7FFF]"></div>
              <p className="font-sans text-xs font-bold uppercase tracking-[2px] text-[#2B7FFF] m-0">Expert Guidance</p>
            </div>
            <h2 className="font-serif text-[clamp(36px,5vw,52px)] font-bold text-[#1A1A18] tracking-[-1px] leading-[1.1]">Meet our top agents</h2>
          </div>
          <a href="#all-agents" className="group font-sans text-sm font-bold text-[#0B3D91] hover:text-[#2B7FFF] transition-colors flex items-center gap-1.5 mx-auto md:mx-0">
            See all agents
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((a) => (
            <article key={a.id} className="group bg-white/80 backdrop-blur-md rounded-[18px] p-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(11,61,145,0.12)]">
              <div className="relative w-21 h-21 mx-auto mb-5">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B3D91] to-[#4388FF] rounded-full opacity-0 group-hover:opacity-100 scale-110 transition-all duration-500 blur-md"></div>
                {a.image ? (
                   <img src={a.image} alt={a.name} className="relative w-full h-full rounded-full object-cover border-[2px] border-white shadow-md z-10 transition-transform duration-500 group-hover:scale-105" />
                ) : (
                   <div className="relative w-full h-full rounded-full bg-slate-100 border-[2px] border-white shadow-md flex items-center justify-center text-slate-500 font-bold text-lg z-10 transition-transform duration-500 group-hover:scale-105">
                      {a.name?.charAt(0) || "A"}
                   </div>
                )}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A1A18] mb-1">{a.name}</h3>
              <p className="font-sans text-sm font-medium text-[#6B7280] mb-3">{a.role}</p>
              <div className="bg-[#FAFAF8] py-1.5 px-3 rounded-xl inline-block mb-5 border border-[#E8E5DF]">
                <p className="font-sans text-xs font-bold text-[#0B3D91] tracking-wide uppercase">{a.deals} deals closed</p>
              </div>
              <button className="w-full bg-transparent text-[#0B3D91] font-sans text-sm font-bold py-2.5 rounded-xl border-2 border-[#EAF2FF] cursor-pointer transition-all duration-300 group-hover:bg-[#0B3D91] group-hover:text-white group-hover:border-[#0B3D91] group-hover:shadow-lg">
                Contact
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSplit() {
  return (
    <section id="about" className="max-w-263 mx-auto px-5 py-24 flex flex-col lg:flex-row gap-9 xl:gap-18 items-center">
      <div className="flex-1 w-full relative h-85 lg:h-131 rounded-[23px] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.1)] group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-60 pointer-events-none"></div>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=900&auto=format&fit=crop"
          alt="Modern home exterior — Haven"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute bottom-8 left-8 z-20 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl max-w-sm pointer-events-none transition-transform duration-500 group-hover:-translate-y-2">
          <p className="font-serif text-lg font-bold text-[#1A1A18] leading-[1.2] mb-2">"The easiest way to find a home."</p>
          <p className="font-sans text-sm font-medium text-[#6B7280]">— Architectural Digest</p>
        </div>
      </div>
      <div className="flex-1 w-full">
        <div className="flex items-center gap-1.5 mb-5">
          <div className="w-6 h-1 bg-[#2B7FFF]"></div>
          <p className="font-sans text-xs font-bold uppercase tracking-[2px] text-[#2B7FFF] m-0">Why Haven</p>
        </div>
        <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-bold text-[#1A1A18] tracking-[-1px] leading-[1.1] mb-6">
          We built the home search we always wanted.
        </h2>
        <p className="font-sans text-base sm:text-lg text-[#4A5568] leading-[1.7] mb-9 font-medium">
          Haven started with three agents who were tired of clunky listing
          sites. Today we connect thousands of buyers and renters with
          verified agents, transparent pricing, and listings that are
          actually kept up to date.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-white rounded-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] border border-[#E8E5DF]">
          <div>
            <strong className="block font-serif text-2xl sm:text-3xl font-bold text-[#0B3D91] tracking-[-1px] mb-1">2019</strong>
            <span className="font-sans text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Founded</span>
          </div>
          <div>
            <strong className="block font-serif text-2xl sm:text-3xl font-bold text-[#0B3D91] tracking-[-1px] mb-1">48</strong>
            <span className="font-sans text-xs font-semibold text-[#6B7280] uppercase tracking-wider">States</span>
          </div>
          <div>
            <strong className="block font-serif text-2xl sm:text-3xl font-bold text-[#0B3D91] tracking-[-1px] mb-1">10K+</strong>
            <span className="font-sans text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Clients</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdvancedSearchPromo() {
  return (
    <section className="max-w-263 mx-auto px-5 py-9 mb-9">
      <div className="relative w-full rounded-[23px] overflow-hidden bg-gradient-to-r from-[#0B3D91] to-[#2B7FFF] flex flex-col md:flex-row items-center justify-between p-9 md:p-9 lg:px-18 shadow-[0_24px_64px_rgba(11,61,145,0.3)]">
        {/* Abstract shapes for background */}
        <div className="absolute top-[-20%] right-[-10%] w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-30%] left-[10%] w-75 h-75 bg-blue-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 w-full md:w-1.5/3 text-white">
          <p className="font-sans text-xs font-bold uppercase tracking-[2px] text-blue-200 mb-3">Găsește exact ce cauți</p>
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold leading-[1.15] mb-5">
            Vă vom ajuta să găsiți cazare conform nevoilor dumneavoastră.
          </h2>
          <p className="font-sans text-base sm:text-lg text-blue-100 font-medium max-w-2xl">
            Căutare avansată de proprietăți cu multe filtre. Găsiți locația perfectă, prețul corect și dotările pe care vi le doriți.
          </p>
        </div>

        <div className="relative z-10 w-full md:w-1/3 flex justify-end mt-8 md:mt-0">
          <a href="/listings" className="group flex items-center justify-center gap-2 bg-white text-[#0B3D91] font-sans text-base font-bold py-4 px-8 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap">
            Căutare avansată
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
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
      <AboutSplit />
      <Footer />
    </div>
  );
}
