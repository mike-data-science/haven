"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { COLORS } from "../../lib/data";


function HeroGradient() {
  return (
    <section className="bg-gradient-to-b from-navy from-0% via-[#2B7FFF] via-[75%] to-warm to-100% pb-[120px] pt-[100px] px-5 sm:px-10 lg:px-16">
      <div className="max-w-[780px] mx-auto text-center text-white">
        <p className="font-sans text-xs font-bold tracking-[1.5px] uppercase bg-white/15 backdrop-blur-md inline-block py-[7px] px-[18px] rounded-full mb-7 border border-white/25">142 new listings this week</p>
        <h1 className="font-serif text-[clamp(40px,5vw,62px)] font-bold leading-[1.08] mb-5 tracking-[-0.5px]">
          Find the home that
          <br />
          finds you.
        </h1>
        <p className="font-sans text-[17px] leading-[1.65] opacity-90 max-w-[500px] mx-auto mb-10 font-normal">
          Browse curated houses, condos, and apartments from agents who
          actually answer the phone.
        </p>

        <form className="bg-white rounded-[20px] p-[18px] grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-3 shadow-[0_24px_60px_rgba(11,61,145,0.22)] text-left" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1">
            <label htmlFor="location" className="text-[11px] font-bold text-slate uppercase tracking-[0.6px]">Location</label>
            <input id="location" placeholder="City, neighborhood, or ZIP" className="border-[1.5px] border-line rounded-[10px] px-[13px] py-[10px] text-sm font-sans text-ink bg-warm transition-colors focus:outline-none focus:border-navy" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="type" className="text-[11px] font-bold text-slate uppercase tracking-[0.6px]">Property type</label>
            <select id="type" defaultValue="any" className="border-[1.5px] border-line rounded-[10px] px-[13px] py-[10px] text-sm font-sans text-ink bg-warm transition-colors focus:outline-none focus:border-navy">
              <option value="any">Any type</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="apartment">Apartment</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="text-[11px] font-bold text-slate uppercase tracking-[0.6px]">Max price</label>
            <select id="price" defaultValue="any" className="border-[1.5px] border-line rounded-[10px] px-[13px] py-[10px] text-sm font-sans text-ink bg-warm transition-colors focus:outline-none focus:border-navy">
              <option value="any">No max</option>
              <option value="300000">$300,000</option>
              <option value="600000">$600,000</option>
              <option value="1000000">$1,000,000</option>
            </select>
          </div>
          <button type="submit" className="px-6 py-[13px] bg-navy text-white font-bold text-[15px] font-sans rounded-[10px] mt-auto hover:bg-[#0a3278] transition-colors h-[43px] md:h-auto cursor-pointer border-none">
            Search
          </button>
        </form>

        <div className="flex justify-center gap-10 md:gap-[60px] mt-[60px] flex-wrap">
          <div className="flex flex-col gap-1">
            <strong className="font-serif font-bold text-[28px]">10,400+</strong>
            <span className="font-sans text-[13px] opacity-80 uppercase tracking-[1px]">Active listings</span>
          </div>
          <div className="flex flex-col gap-1">
            <strong className="font-serif font-bold text-[28px]">312</strong>
            <span className="font-sans text-[13px] opacity-80 uppercase tracking-[1px]">Verified agents</span>
          </div>
          <div className="flex flex-col gap-1">
            <strong className="font-serif font-bold text-[28px]">4.8/5</strong>
            <span className="font-sans text-[13px] opacity-80 uppercase tracking-[1px]">Average rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const HEROES = {
  gradient: { label: "Gradient", Component: HeroGradient },
};

/* ============================================================
   POPULAR PROPERTIES — card grid
============================================================ */
function PopularProperties({ properties }) {
  return (
    <section id="properties" className="w-full py-[88px] px-5 sm:px-10 lg:px-16 bg-warm">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-12">
        <div>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[1.5px] text-navy mb-2.5">Hand-picked</p>
          <h2 className="font-serif text-[clamp(26px,3vw,36px)] font-semibold text-ink tracking-[-0.2px]">Popular properties</h2>
        </div>
        <a href="#all-properties" className="font-sans text-navy font-semibold text-[13px] no-underline flex items-center gap-1 whitespace-nowrap hover:underline">
          View all listings →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {properties.map((p) => (
          <article key={p.id} className="bg-card rounded-[16px] overflow-hidden border border-line transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(26,26,24,0.1)] flex flex-col">
            <div className="relative h-[178px]">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover block" />
              <span className="absolute top-3 left-3 bg-navy text-white font-sans text-[10px] font-bold uppercase tracking-[0.8px] px-[10px] py-1 rounded-[6px]">{p.tag || "For Sale"}</span>
              <button className="absolute top-2.5 right-2.5 w-[34px] h-[34px] rounded-full bg-white text-ink border border-line flex items-center justify-center cursor-pointer transition-all hover:bg-slate-50 hover:scale-105" aria-label="Save property">♡</button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div className="flex justify-between items-start gap-3">
                <h3 className="font-serif font-semibold text-lg m-0 text-ink leading-snug">{p.title}</h3>
                <span className="font-sans font-bold text-navy text-[15px]">{p.price}</span>
              </div>
              <p className="font-sans text-[13px] text-slate m-0 flex items-center gap-1.5">
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none"><path d="M5.5 0C3.02 0 1 2.02 1 4.5c0 3.375 4.5 8.5 4.5 8.5S10 7.875 10 4.5C10 2.02 7.98 0 5.5 0zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="currentColor"/></svg>
                {p.location}
              </p>
              <div className="flex gap-4 pt-3 border-t border-line mt-auto">
                <span className="flex items-center gap-[5px] font-sans text-[12px] font-medium text-ink">
                  <svg className="text-slate" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3"/><path d="M2 11h20v6H2z"/><path d="M2 17v3"/><path d="M22 17v3"/><path d="M6 11V8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3"/></svg>
                  {p.beds} bed
                </span>
                <span className="flex items-center gap-[5px] font-sans text-[12px] font-medium text-ink">
                  <svg className="text-slate" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6V4a2 2 0 0 1 4 0v2"/><path d="M4 11h16v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z"/><path d="M6 19v2"/><path d="M16 19v2"/></svg>
                  {p.baths} bath
                </span>
                <span className="flex items-center gap-[5px] font-sans text-[12px] font-medium text-ink">
                  <svg className="text-slate" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h4v4H3z"/></svg>
                  {p.sqft} m²
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   AGENTS — agent card row
============================================================ */
function Agents({ agents }) {
  return (
    <section id="agents" className="w-full py-[88px] px-5 sm:px-10 lg:px-16 bg-[#EAF2FF]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-12">
        <div>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[1.5px] text-navy mb-2.5">Talk to a human</p>
          <h2 className="font-serif text-[clamp(26px,3vw,36px)] font-semibold text-ink tracking-[-0.2px]">Agents in your area</h2>
        </div>
        <a href="#all-agents" className="font-sans text-navy font-semibold text-[13px] no-underline flex items-center gap-1 whitespace-nowrap hover:underline">
          See all agents →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((a) => (
          <article key={a.id} className="bg-card rounded-[20px] p-6 text-center border border-line shadow-sm">
            <img src={a.image} alt={a.name} className="w-[100px] h-[100px] rounded-full object-cover mb-4 mx-auto border-[3px] border-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]" />
            <h3 className="font-serif font-bold text-[19px] mb-1">{a.name}</h3>
            <p className="font-sans text-[13px] text-navy font-bold uppercase tracking-[1px] mb-2">{a.role || 'Agent'}</p>
            <p className="font-sans text-[14px] text-slate mb-[22px]">{a.deals} deals closed</p>
            <button className="w-full bg-transparent border-[1.5px] border-ink text-ink font-sans font-semibold text-sm py-2.5 px-5 rounded-lg cursor-pointer transition-colors hover:bg-ink hover:text-white">
              Contact
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT A — image + content split (current layout)
============================================================ */
function AboutSplit() {
  return (
    <section id="about" className="w-full grid grid-cols-1 md:grid-cols-2 bg-ink text-white">
      <div className="relative h-[400px] md:h-auto">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=900&auto=format&fit=crop"
          alt="Modern home exterior — Haven"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-10 md:p-[clamp(40px,6vw,100px)] flex flex-col justify-center">
        <p className="font-sans text-[11px] font-bold uppercase tracking-[1.5px] text-[#2B7FFF] mb-2.5">Why Haven</p>
        <h2 className="font-serif text-[clamp(26px,3vw,36px)] font-semibold text-white tracking-[-0.2px] mb-4">
          We built the home search we always wanted.
        </h2>
        <p className="font-sans text-[17px] leading-[1.6] opacity-80 mb-10">
          Haven started with three agents who were tired of clunky listing
          sites. Today we connect thousands of buyers and renters with
          verified agents, transparent pricing, and listings that are
          actually kept up to date.
        </p>
        <div className="flex gap-10 border-t border-white/20 pt-10 flex-wrap">
          <div className="flex flex-col gap-1">
            <strong className="font-serif font-bold text-[32px] md:text-[42px] leading-none">2019</strong>
            <span className="font-sans text-[12px] opacity-70 uppercase tracking-[1px]">Founded</span>
          </div>
          <div className="flex flex-col gap-1">
            <strong className="font-serif font-bold text-[32px] md:text-[42px] leading-none">48 states</strong>
            <span className="font-sans text-[12px] opacity-70 uppercase tracking-[1px]">Coverage</span>
          </div>
          <div className="flex flex-col gap-1">
            <strong className="font-serif font-bold text-[32px] md:text-[42px] leading-none">10K+</strong>
            <span className="font-sans text-[12px] opacity-70 uppercase tracking-[1px]">Happy clients</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const ABOUTS = {
  split: { label: "Image split", Component: AboutSplit },
};



/* ============================================================
   PAGE
============================================================ */
export default function HomePage({ properties = [], agents = [] }) {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <HeroGradient />
      <PopularProperties properties={properties} />
      <Agents agents={agents} />
      <AboutSplit />
      <Footer />
    </div>
  );
}
