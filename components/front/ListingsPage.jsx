"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "./Navbar";
import { PropertyCard } from "./PropertyCard";
import { IconBed, IconBath, IconArea } from "./Icons";
import dynamic from "next/dynamic";

const MultiMapDisplay = dynamic(() => import('./ListingsMap'), { ssr: false });

export default function ListingsPage({ properties, agents, categories }) {
  const [selectedId, setSelectedId] = useState(null);
  const [filteredListings, setFilteredListings] = useState(properties || []);
  const [layoutMode, setLayoutMode] = useState('list'); // 'list' | 'grid'

  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen flex flex-col h-screen overflow-hidden">
      <div className="shrink-0 h-[120px]">
        <Navbar />
      </div>
      
      <main className="flex-1 flex overflow-hidden w-full max-w-[1600px] mx-auto">
        
        {/* Sidebar Filters (Visible only in list mode) */}
        <aside className={`w-[280px] shrink-0 border-r border-line bg-white flex-col h-full overflow-y-auto ${layoutMode === 'grid' ? 'hidden' : 'hidden md:flex'}`}>
          <div className="p-6 border-b border-line flex justify-between items-center">
            <h2 className="font-serif text-[22px] font-semibold text-ink">Filter</h2>
            <button 
              onClick={() => setLayoutMode('grid')}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#E8E5DF] hover:border-[#0B3D91] text-[#1A1A18] transition-colors cursor-pointer"
              title="Switch to Grid layout"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
          </div>
          
          <div className="p-6 flex flex-col gap-8 flex-grow">
            {/* Sort Dropdown moved to sidebar */}
            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-bold text-slate uppercase tracking-[1px]">Sort By</label>
              <select className="w-full border border-line rounded-[8px] px-3 py-2.5 text-[14px] bg-white outline-none focus:border-navy text-ink cursor-pointer">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
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

        {/* Dynamic Center Column + Right Map */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Listings List/Grid */}
          <div className={`flex flex-col h-full bg-[#FAFAF8] border-r border-[#E8E5DF] relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 ${layoutMode === 'grid' ? 'w-[60%]' : 'w-full max-w-[600px] flex-1 lg:max-w-none lg:flex-[1.2]'}`}>
            
            {/* Top Bar (Pills + Layout Toggle) - Visible only in grid mode */}
            <div className={`items-center justify-between gap-4 px-6 py-4 border-b border-[#E8E5DF] bg-white shrink-0 overflow-x-auto ${layoutMode === 'list' ? 'hidden' : 'flex'}`}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 border border-[#E8E5DF] rounded-full px-4 py-2 hover:border-[#0B3D91] transition-colors cursor-pointer whitespace-nowrap">
                  <span className="text-[13px] font-bold text-[#1A1A18]">Price</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
                <div className="flex items-center gap-2 border border-[#E8E5DF] rounded-full px-4 py-2 hover:border-[#0B3D91] transition-colors cursor-pointer whitespace-nowrap">
                  <span className="text-[13px] font-bold text-[#1A1A18]">Property Type</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
                <div className="flex items-center gap-2 border border-[#E8E5DF] rounded-full px-4 py-2 hover:border-[#0B3D91] transition-colors cursor-pointer whitespace-nowrap hidden sm:flex">
                  <span className="text-[13px] font-bold text-[#1A1A18]">Beds & Baths</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <select className="bg-transparent border-none font-sans text-[14px] text-[#6B7280] outline-none cursor-pointer hidden md:block">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
                <div className="w-px h-6 bg-[#E8E5DF] hidden md:block mx-1"></div>
                <button 
                  onClick={() => setLayoutMode('list')}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#E8E5DF] hover:border-[#0B3D91] text-[#1A1A18] transition-colors cursor-pointer"
                  title="Switch to List layout"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 shrink-0 bg-[#FAFAF8]">
              <h1 className="font-serif text-[20px] font-bold text-[#1A1A18]">
                {filteredListings.length} results found
              </h1>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24">
              <div className={`grid gap-6 ${layoutMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredListings.map(l => (
                  <div 
                    key={l.id} 
                    className="bg-white rounded-[16px] overflow-hidden"
                    onMouseEnter={() => setSelectedId(l.id)} 
                    onMouseLeave={() => {
                      // Only clear if it was a hover selection. If clicked via map, keep it.
                      // Simple implementation: clear on leave for fluid UX, or keep it.
                      // We will just clear it for a very responsive feeling.
                      setSelectedId(null);
                    }}
                  >
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
          </div>

          {/* Interactive Map */}
          <div className={`h-full bg-[#EAF2FF] relative p-4 transition-all duration-300 hidden sm:block ${layoutMode === 'grid' ? 'w-[40%]' : 'flex-1 min-w-[300px]'}`}>
             <MultiMapDisplay 
               listings={filteredListings} 
               selectedId={selectedId} 
               onSelectPin={setSelectedId} 
             />
          </div>
        </div>
      </main>
    </div>
  );
}

