"use client";

import { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { formatPrice } from "../../lib/data";
import ImageCarousel from './ImageCarousel';

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
    <div className={`flex-[0.8] px-2 sm:px-4 py-3 flex items-center border-[#E8E5DF] relative ${className ? className : `border-b lg:border-b-0 ${isLast ? '' : 'lg:border-r'}`}`} ref={ref}>
      <div 
        className="relative w-full cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 truncate">
          {label && <span className="font-sans text-[16px] text-slate-500 whitespace-nowrap">{label}:</span>}
          <span className="font-sans text-[17px] font-semibold text-[#1A1A18] whitespace-nowrap">
            {selectedOption.label}
          </span>
        </div>
        <div className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ml-1`}>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+12px)] left-0 min-w-[220px] w-full bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top">
          {options.map((o) => (
            <div 
              key={o.value} 
              className={`px-4 py-2.5 text-[16px] cursor-pointer transition-colors select-none flex items-center justify-between ${o.value === value ? 'bg-blue-50/50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
              onClick={() => { setValue(o.value); setIsOpen(false); }}
            >
              {o.label}
              {o.value === value && (
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  return (
    <section className="relative z-30 w-full min-h-[700px] h-auto flex flex-col items-center justify-center text-center px-5 pt-[140px] pb-16 bg-gradient-to-b from-[#EAF2FF] from-40% to-[#FAFAF8]">
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center mt-[40px]">
        <p className="font-sans text-[12px] font-bold uppercase tracking-[1.5px] text-[#2B7FFF] mb-4 bg-white/60 px-3 py-1 rounded-full border border-[#2B7FFF]/20 backdrop-blur-sm">
          142 new listings this week
        </p>
        <h1 className="font-serif text-[clamp(42px,5vw,64px)] font-bold text-[#1A1A18] leading-[1.1] tracking-[-1.5px] mb-6">
          Find the home that
          <br />
          finds you.
        </h1>
        <p className="font-sans text-[18px] text-[#6B7280] max-w-[500px] leading-[1.5] mb-10">
          Browse curated houses, condos, and apartments from agents who
          actually answer the phone.
        </p>

        <form action="/listings" method="GET" className="flex flex-col bg-white p-2 rounded-[20px] lg:rounded-full shadow-2xl border border-[#E8E5DF] w-full max-w-[1250px] relative z-20">
          <div className="grid grid-cols-2 lg:flex lg:flex-row w-full items-stretch">
            <ModernSelect 
              id="transaction" 
              defaultValue="buy" 
              options={[{ value: 'buy', label: 'Buy' }, { value: 'sell', label: 'Sell' }, { value: 'rent', label: 'Rent' }]} 
              className="border-b border-r lg:border-b-0 lg:border-r"
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
              className="border-b lg:border-b-0 lg:border-r"
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
              className="border-b border-r lg:border-b-0 lg:border-r"
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
              className="border-b lg:border-b-0 lg:border-r"
            />

            {/* Price From-To */}
            <div className="col-span-2 lg:col-span-1 flex-[1.4] px-4 py-3 flex items-center border-b lg:border-b-0 lg:border-r border-[#E8E5DF]">
              <div className="flex items-center gap-2 w-full">
                <input type="number" name="minPrice" placeholder="Price from" className="w-full border-none bg-transparent font-sans text-[17px] font-semibold text-[#1A1A18] outline-none placeholder:text-slate-400 placeholder:font-normal min-w-0" />
                <span className="text-slate-400">-</span>
                <input type="number" name="maxPrice" placeholder="Price to" className="w-full border-none bg-transparent font-sans text-[17px] font-semibold text-[#1A1A18] outline-none placeholder:text-slate-400 placeholder:font-normal min-w-0" />
                <span className="font-sans text-[17px] font-semibold text-[#1A1A18] ml-1">€</span>
              </div>
            </div>

            {/* Search Button */}
            <div className="col-span-2 lg:col-span-1 flex justify-center mt-3 lg:mt-0 p-2 lg:p-0">
              <button type="submit" className="w-full lg:w-auto bg-[#0B3D91] text-white font-sans text-[18px] font-bold py-0 px-10 rounded-full cursor-pointer transition-transform hover:-translate-y-[2px] h-[52px] lg:h-full lg:ml-2 shrink-0 shadow-md hover:shadow-lg">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function PopularProperties({ properties }) {
  return (
    <section id="properties" className="max-w-[1400px] mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <p className="font-sans text-[13px] font-bold uppercase tracking-[1px] text-[#2B7FFF] mb-3">Hand-picked</p>
          <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-bold text-[#1A1A18] tracking-[-1px] leading-[1.1]">Popular properties</h2>
        </div>
        <a href="#all-properties" className="font-sans text-[15px] font-bold text-[#0B3D91] hover:text-[#2B7FFF] transition-colors flex items-center gap-1">
          View all listings →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((p) => (
          <a href={`/property/${p.id}`} key={p.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#E8E5DF] shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)] no-underline text-[#1A1A18]">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <ImageCarousel 
                images={p.gallery && p.gallery.length > 0 ? p.gallery : [p.image].filter(Boolean)} 
                alt={p.title} 
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-[4px] text-[#1A1A18] font-sans text-[12px] font-bold px-3 py-[5px] rounded-full uppercase tracking-[0.5px] z-30">
                {p.tag || "For Sale"}
              </span>
              <button className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-[4px] text-[#1A1A18] rounded-full flex items-center justify-center border-none cursor-pointer transition-transform hover:scale-110" aria-label="Save property">♡</button>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3 className="font-serif text-[22px] font-bold leading-[1.2] tracking-[-0.5px] line-clamp-2">{p.title}</h3>
                <span className="font-sans text-[18px] font-bold whitespace-nowrap text-[#0B3D91]">{formatPrice(p.price)}</span>
              </div>
              <p className="font-sans text-[14px] text-[#6B7280] mb-5 flex items-center gap-1.5 line-clamp-1">
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none"><path d="M5.5 0C3.02 0 1 2.02 1 4.5c0 3.375 4.5 8.5 4.5 8.5S10 7.875 10 4.5C10 2.02 7.98 0 5.5 0zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="currentColor"/></svg>
                {p.location}
              </p>
              <div className="flex items-center gap-2 mt-auto pt-5 border-t border-[#E8E5DF] font-sans text-[13px] font-semibold text-[#1A1A18]">
                <span className="flex items-center gap-1.5 text-[#6B7280] bg-slate-100 px-3 py-1.5 rounded-xl">
                  <svg className="text-[#0B3D91]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3"/><path d="M2 11h20v6H2z"/><path d="M2 17v3"/><path d="M22 17v3"/><path d="M6 11V8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3"/></svg>
                  <span className="text-[#1A1A18]">{p.beds}</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#6B7280] bg-slate-100 px-3 py-1.5 rounded-xl">
                  <svg className="text-[#0B3D91]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6V4a2 2 0 0 1 4 0v2"/><path d="M4 11h16v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z"/><path d="M6 19v2"/><path d="M16 19v2"/></svg>
                  <span className="text-[#1A1A18]">{p.baths}</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#6B7280] bg-slate-100 px-3 py-1.5 rounded-xl">
                  <svg className="text-[#0B3D91]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h4v4H3z"/></svg>
                  <span className="text-[#1A1A18]">{p.sqft}</span> m²
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Agents({ agents }) {
  return (
    <section id="agents" className="bg-[#EAF2FF]/50 py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <p className="font-sans text-[13px] font-bold uppercase tracking-[1px] text-[#2B7FFF] mb-3">Talk to a human</p>
            <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-bold text-[#1A1A18] tracking-[-1px] leading-[1.1]">Agents in your area</h2>
          </div>
          <a href="#all-agents" className="font-sans text-[15px] font-bold text-[#0B3D91] hover:text-[#2B7FFF] transition-colors flex items-center gap-1">
            See all agents →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((a) => (
            <article key={a.id} className="bg-white rounded-[24px] p-6 text-center shadow-sm border border-[#E8E5DF] transition-transform duration-300 hover:-translate-y-1">
              {a.image ? (
                 <img src={a.image} alt={a.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-5 border-4 border-white shadow-sm" />
              ) : (
                 <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto mb-5 border-4 border-white shadow-sm flex items-center justify-center text-slate-500 font-bold">
                    {a.name?.charAt(0) || "A"}
                 </div>
              )}
              <h3 className="font-serif text-[20px] font-bold text-[#1A1A18] mb-1">{a.name}</h3>
              <p className="font-sans text-[14px] text-[#6B7280] mb-3">{a.role}</p>
              <p className="font-sans text-[13px] font-bold text-[#C49A3C] mb-6 bg-[#C49A3C]/10 inline-block px-3 py-1 rounded-full">{a.deals} deals closed</p>
              <button className="w-full bg-transparent text-[#1A1A18] font-sans text-[15px] font-bold py-2.5 rounded-[10px] border border-[#E8E5DF] cursor-pointer transition-colors hover:border-[#1A1A18] hover:bg-[#1A1A18]/5">
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
    <section id="about" className="max-w-[1400px] mx-auto px-6 py-24 flex flex-col lg:flex-row gap-16 items-center">
      <div className="flex-1 w-full relative h-[400px] lg:h-[600px] rounded-[32px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=900&auto=format&fit=crop"
          alt="Modern home exterior — Haven"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 w-full max-w-[500px]">
        <p className="font-sans text-[13px] font-bold uppercase tracking-[1px] text-[#2B7FFF] mb-3">Why Haven</p>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold text-[#1A1A18] tracking-[-1px] leading-[1.1] mb-6">
          We built the home search we always wanted.
        </h2>
        <p className="font-sans text-[18px] text-[#6B7280] leading-[1.6] mb-10">
          Haven started with three agents who were tired of clunky listing
          sites. Today we connect thousands of buyers and renters with
          verified agents, transparent pricing, and listings that are
          actually kept up to date.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <strong className="block font-serif text-[28px] font-bold text-[#1A1A18] tracking-[-0.5px]">2019</strong>
            <span className="font-sans text-[13px] text-[#6B7280]">Founded</span>
          </div>
          <div>
            <strong className="block font-serif text-[28px] font-bold text-[#1A1A18] tracking-[-0.5px]">48 states</strong>
            <span className="font-sans text-[13px] text-[#6B7280]">Coverage</span>
          </div>
          <div>
            <strong className="block font-serif text-[28px] font-bold text-[#1A1A18] tracking-[-0.5px]">10K+</strong>
            <span className="font-sans text-[13px] text-[#6B7280]">Happy clients</span>
          </div>
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
      <Agents agents={agents} />
      <AboutSplit />
      <Footer />
    </div>
  );
}
