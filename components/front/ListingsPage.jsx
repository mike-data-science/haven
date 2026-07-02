"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { PropertyCard } from "./PropertyCard";
import { IconBed, IconBath, IconArea } from "./Icons";
import { formatPrice } from "../../lib/data";

function MapPanel({ listings, selectedId, onSelectPin }) {
  const selected = listings.find((l) => l.id === selectedId);

  return (
    <div className="relative rounded-[14px] overflow-hidden bg-paleBlue h-full min-h-[400px]">
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(43,127,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(43,127,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      >
        {listings.map((l) => (
          <button
            key={l.id}
            className={`absolute -translate-x-1/2 -translate-y-full text-[11px] font-bold px-[9px] py-[5px] rounded-full border-none cursor-pointer transition-all ${
              selectedId === l.id 
                ? "bg-ink text-white shadow-[0_4px_12px_rgba(26,26,24,0.3)] scale-110 z-20" 
                : "bg-navy text-white hover:scale-105 z-10"
            }`}
            style={{ top: l.pin.top, left: l.pin.left }}
            title={`${l.title} — ${formatPrice(l.price)}`}
            onClick={() => onSelectPin?.(l.id)}
          >
            {formatPrice(l.price)}
          </button>
        ))}

        {selected && (
          <div
            className="absolute -translate-x-1/2 mt-2 w-[280px] bg-white rounded-[16px] shadow-[0_12px_32px_rgba(26,26,24,0.15)] overflow-hidden z-30 transition-all duration-200"
            style={{ top: selected.pin.top, left: selected.pin.left }}
          >
            <button
              className="absolute top-2 right-2 w-[24px] h-[24px] bg-ink/50 hover:bg-ink text-white rounded-full flex items-center justify-center border-none cursor-pointer z-10 text-[14px] leading-none"
              onClick={() => onSelectPin?.(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="relative h-[140px] w-full">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover block" />
            </div>
            <div className="p-4">
              <span className="font-sans text-[16px] font-bold text-navy block mb-1.5">{formatPrice(selected.price)}</span>
              <div className="flex gap-[12px] text-[12px] text-slate mb-3">
                <span className="flex items-center gap-1"><span className="text-navy flex-shrink-0"><IconBed /></span> {selected.beds}</span>
                <span className="flex items-center gap-1"><span className="text-navy flex-shrink-0"><IconBath /></span> {selected.baths}</span>
                <span className="flex items-center gap-1"><span className="text-navy flex-shrink-0"><IconArea /></span> {selected.sqft.toLocaleString()} m²</span>
              </div>
              <p className="font-serif text-[15px] font-semibold text-ink mb-1 truncate">{selected.title}</p>
              <p className="text-[12px] text-slate truncate">{selected.location}</p>
            </div>
          </div>
        )}
      </div>
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <button className="w-8 h-8 bg-white border border-line rounded-[8px] flex items-center justify-center font-bold text-ink cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">+</button>
        <button className="w-8 h-8 bg-white border border-line rounded-[8px] flex items-center justify-center font-bold text-ink cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">−</button>
      </div>
      <span className="absolute left-4 top-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-[6px] text-[11px] font-bold text-navy shadow-sm uppercase tracking-[0.5px]">
        Interactive map
      </span>
    </div>
  );
}

export default function ListingsPage({ properties, agents, categories }) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="min-h-screen bg-warm flex flex-col">
      <Navbar />

      <main className="flex-grow w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_minmax(300px,1.2fr)] h-[calc(100vh-80px)]">
        
        {/* Sidebar Filters */}
        <aside className="border-r border-line bg-white flex flex-col h-full overflow-y-auto">
          <div className="p-6 border-b border-line">
            <h2 className="font-serif text-[22px] font-semibold text-ink">Filter</h2>
          </div>
          
          <div className="p-6 flex flex-col gap-8 flex-grow">
            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-bold text-slate uppercase tracking-[1px]">Location</label>
              <select defaultValue="all" className="w-full border border-line rounded-[8px] px-3 py-2.5 text-[14px] bg-white outline-none focus:border-navy text-ink">
                <option value="all">All Locations</option>
                <option value="seattle">Seattle, WA</option>
                <option value="austin">Austin, TX</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-bold text-slate uppercase tracking-[1px]">Type of place</label>
              <div className="flex items-center gap-2.5 text-[14px] text-ink"><input type="checkbox" defaultChecked className="w-[18px] h-[18px] accent-navy rounded-[4px]" /> All</div>
              <div className="flex items-center gap-2.5 text-[14px] text-ink"><input type="checkbox" className="w-[18px] h-[18px] accent-navy rounded-[4px]" /> House</div>
              <div className="flex items-center gap-2.5 text-[14px] text-ink"><input type="checkbox" className="w-[18px] h-[18px] accent-navy rounded-[4px]" /> Apartment</div>
              <div className="flex items-center gap-2.5 text-[14px] text-ink"><input type="checkbox" className="w-[18px] h-[18px] accent-navy rounded-[4px]" /> Condo</div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-bold text-slate uppercase tracking-[1px]">Price range</label>
              <input type="range" min="100000" max="1500000" defaultValue="700000" className="w-full accent-navy" />
              <div className="flex justify-between text-[13px] text-slate font-medium">
                <span>$100K</span>
                <span>$1.5M</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-bold text-slate uppercase tracking-[1px]">Size (sqft)</label>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Min" className="w-full border border-line rounded-[8px] px-3 py-2 text-[14px] outline-none focus:border-navy text-ink placeholder:text-slate/60" />
                <input placeholder="Max" className="w-full border border-line rounded-[8px] px-3 py-2 text-[14px] outline-none focus:border-navy text-ink placeholder:text-slate/60" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-bold text-slate uppercase tracking-[1px]">Features</label>
              <div className="flex items-center gap-2.5 text-[14px] text-ink"><input type="checkbox" defaultChecked className="w-[18px] h-[18px] accent-navy rounded-[4px]" /> AC & heating</div>
              <div className="flex items-center gap-2.5 text-[14px] text-ink"><input type="checkbox" className="w-[18px] h-[18px] accent-navy rounded-[4px]" /> Garage</div>
              <div className="flex items-center gap-2.5 text-[14px] text-ink"><input type="checkbox" className="w-[18px] h-[18px] accent-navy rounded-[4px]" /> Pool</div>
            </div>
          </div>
          
          <div className="p-6 border-t border-line mt-auto bg-white">
            <button className="w-full bg-navy text-white rounded-[10px] py-[13px] font-bold text-[15px] hover:bg-blue transition-colors border-none cursor-pointer">
              Apply filters
            </button>
          </div>
        </aside>

        {/* Listings Center Column */}
        <div className="bg-warm border-r border-line flex flex-col h-full overflow-y-auto">
          <div className="p-6 border-b border-line bg-warm/80 backdrop-blur-md sticky top-0 z-10">
            <p className="font-serif text-[18px] font-semibold text-ink">{properties.length} results found</p>
          </div>
          <div className="p-6 flex flex-col gap-5">
            {properties.map((l) => (
              <div key={l.id} className="bg-white rounded-[16px] overflow-hidden">
                <PropertyCard
                  listing={l}
                  compact={false}
                  selected={selectedId === l.id}
                  onSelect={setSelectedId}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Map Right Column */}
        <div className="p-6 h-full hidden lg:block">
          <MapPanel
            listings={properties}
            selectedId={selectedId}
            onSelectPin={setSelectedId}
          />
        </div>
      </main>
    </div>
  );
}
