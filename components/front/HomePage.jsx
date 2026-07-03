"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { formatPrice } from "../../lib/data";

function HeroGradient() {
  return (
    <section className="relative w-full h-[600px] flex flex-col items-center justify-center text-center px-5 pt-[100px] bg-gradient-to-b from-[#EAF2FF] from-40% to-[#FAFAF8] overflow-hidden">
      <div className="relative z-10 w-full max-w-[800px] flex flex-col items-center mt-[40px]">
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

        <form className="flex flex-col md:flex-row bg-white p-2.5 rounded-2xl shadow-lg border border-[#E8E5DF] w-full max-w-[840px] gap-2 md:gap-0 relative z-20" onSubmit={(e) => e.preventDefault()}>
          <div className="flex-1 px-4 py-2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#E8E5DF] text-left">
            <label htmlFor="location" className="font-sans text-[11px] font-bold uppercase tracking-[0.5px] text-[#1A1A18] mb-1">Location</label>
            <input id="location" placeholder="City, neighborhood, or ZIP" className="w-full border-none bg-transparent font-sans text-[15px] text-[#1A1A18] outline-none placeholder:text-[#6B7280]" />
          </div>
          <div className="flex-1 px-4 py-2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#E8E5DF] text-left">
            <label htmlFor="type" className="font-sans text-[11px] font-bold uppercase tracking-[0.5px] text-[#1A1A18] mb-1">Property type</label>
            <select id="type" defaultValue="any" className="w-full border-none bg-transparent font-sans text-[15px] text-[#1A1A18] outline-none cursor-pointer appearance-none">
              <option value="any">Any type</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="apartment">Apartment</option>
            </select>
          </div>
          <div className="flex-1 px-4 py-2 flex flex-col justify-center text-left">
            <label htmlFor="price" className="font-sans text-[11px] font-bold uppercase tracking-[0.5px] text-[#1A1A18] mb-1">Max price</label>
            <select id="price" defaultValue="any" className="w-full border-none bg-transparent font-sans text-[15px] text-[#1A1A18] outline-none cursor-pointer appearance-none">
              <option value="any">No max</option>
              <option value="300000">$300,000</option>
              <option value="600000">$600,000</option>
              <option value="1000000">$1,000,000</option>
            </select>
          </div>
          <button type="submit" className="bg-[#0B3D91] text-white font-sans text-[15px] font-bold py-0 px-8 rounded-xl cursor-pointer transition-transform hover:-translate-y-[2px] h-[52px] md:h-auto mt-2 md:mt-0">
            Search
          </button>
        </form>
        
        <div className="flex flex-col md:flex-row items-center gap-10 mt-16 pt-8 border-t border-[#1A1A18]/5">
          <div className="flex flex-col items-center md:items-start text-left">
            <strong className="font-serif text-[28px] font-bold text-[#1A1A18] tracking-[-0.5px]">10,400+</strong>
            <span className="font-sans text-[13px] text-[#6B7280]">Active listings</span>
          </div>
          <div className="flex flex-col items-center md:items-start text-left">
            <strong className="font-serif text-[28px] font-bold text-[#1A1A18] tracking-[-0.5px]">312</strong>
            <span className="font-sans text-[13px] text-[#6B7280]">Verified agents</span>
          </div>
          <div className="flex flex-col items-center md:items-start text-left">
            <strong className="font-serif text-[28px] font-bold text-[#1A1A18] tracking-[-0.5px]">4.8/5</strong>
            <span className="font-sans text-[13px] text-[#6B7280]">Average rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PopularProperties({ properties }) {
  return (
    <section id="properties" className="max-w-[1400px] mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
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
            <div className="relative h-[240px] overflow-hidden">
              {p.image ? (
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              ) : (
                <div className="w-full h-full bg-slate-200" />
              )}
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-[4px] text-[#1A1A18] font-sans text-[12px] font-bold px-3 py-[5px] rounded-full uppercase tracking-[0.5px]">
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
              <div className="flex items-center gap-4 mt-auto pt-5 border-t border-[#E8E5DF] font-sans text-[13px] font-semibold text-[#1A1A18]">
                <span className="flex items-center gap-1.5 text-[#6B7280]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3"/><path d="M2 11h20v6H2z"/><path d="M2 17v3"/><path d="M22 17v3"/><path d="M6 11V8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3"/></svg>
                  <span className="text-[#1A1A18]">{p.beds}</span> bed
                </span>
                <span className="flex items-center gap-1.5 text-[#6B7280]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6V4a2 2 0 0 1 4 0v2"/><path d="M4 11h16v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z"/><path d="M6 19v2"/><path d="M16 19v2"/></svg>
                  <span className="text-[#1A1A18]">{p.baths}</span> bath
                </span>
                <span className="flex items-center gap-1.5 text-[#6B7280]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h4v4H3z"/></svg>
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
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

export default function HomePage({ properties = [], agents = [] }) {
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
