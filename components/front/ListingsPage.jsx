"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "./Navbar";
import { PropertyCard } from "./PropertyCard";
import { IconBed, IconBath, IconArea } from "./Icons";
import dynamic from "next/dynamic";

const MultiMapDisplay = dynamic(() => import('./ListingsMap'), { ssr: false });

export default function ListingsPage({ properties, agents, categories }) {
  const [selectedId, setSelectedId] = useState(null);
  const [layoutMode, setLayoutMode] = useState('list'); // 'list' | 'grid'
  
  // Mobile UI States
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter States
  const [sortBy, setSortBy] = useState("Recommended");
  const [location, setLocation] = useState("all");
  const [selectedTypes, setSelectedTypes] = useState(new Set(["All"]));
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");

  const [filteredListings, setFilteredListings] = useState(properties || []);

  useEffect(() => {
    let result = [...properties];

    // Filter by Location
    if (location !== "all") {
      result = result.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
    }

    // Filter by Type
    if (!selectedTypes.has("All")) {
      result = result.filter(p => {
        return Array.from(selectedTypes).some(t => p.type.toLowerCase().includes(t.toLowerCase()));
      });
    }

    // Filter by Price
    result = result.filter(p => p.price <= maxPrice);

    // Filter by Size
    if (minSize) {
      result = result.filter(p => p.sqft >= parseInt(minSize));
    }
    if (maxSize) {
      result = result.filter(p => p.sqft <= parseInt(maxSize));
    }

    // Sort
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Newest") {
      result.sort((a, b) => b.id - a.id);
    }

    setFilteredListings(result);
  }, [properties, sortBy, location, selectedTypes, maxPrice, minSize, maxSize]);

  const toggleType = (type) => {
    const newTypes = new Set(selectedTypes);
    if (type === "All") {
      newTypes.clear();
      newTypes.add("All");
    } else {
      newTypes.delete("All");
      if (newTypes.has(type)) {
        newTypes.delete(type);
      } else {
        newTypes.add(type);
      }
      if (newTypes.size === 0) newTypes.add("All");
    }
    setSelectedTypes(newTypes);
  };

  const FiltersContent = () => (
    <div className="flex flex-col gap-8 h-full overflow-y-auto">
      <div className="flex flex-col gap-3">
        <label className="text-[12px] font-bold text-slate uppercase tracking-[1px]">Sort By</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full border border-line rounded-[8px] px-3 py-2.5 text-[14px] bg-white outline-none focus:border-navy text-ink cursor-pointer">
          <option>Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-[12px] font-bold text-slate uppercase tracking-[1px]">Location</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-line rounded-[8px] px-3 py-2.5 text-[14px] bg-white outline-none focus:border-navy text-ink">
          <option value="all">All Locations</option>
          <option value="seattle">Seattle</option>
          <option value="austin">Austin</option>
          <option value="chicago">Chicago</option>
          <option value="new york">New York</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[12px] font-bold text-slate uppercase tracking-[1px]">Type of place</label>
        {["All", "House", "Apartment", "Condo"].map(t => (
          <label key={t} className="flex items-center gap-2.5 text-[14px] text-ink cursor-pointer">
            <input 
              type="checkbox" 
              checked={selectedTypes.has(t)} 
              onChange={() => toggleType(t)}
              className="w-[18px] h-[18px] accent-navy rounded-[4px]" 
            /> {t}
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[12px] font-bold text-slate uppercase tracking-[1px]">Max Price</label>
        <input 
          type="range" 
          min="100000" 
          max="5000000" 
          step="50000"
          value={maxPrice} 
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-navy" 
        />
        <div className="flex justify-between text-[13px] text-slate font-medium">
          <span>$100K</span>
          <span>${(maxPrice / 1000000).toFixed(1)}M+</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[12px] font-bold text-slate uppercase tracking-[1px]">Size (sqft)</label>
        <div className="grid grid-cols-2 gap-3">
          <input 
            placeholder="Min" 
            type="number"
            value={minSize}
            onChange={(e) => setMinSize(e.target.value)}
            className="w-full border border-line rounded-[8px] px-3 py-2 text-[14px] outline-none focus:border-navy text-ink placeholder:text-slate/60" 
          />
          <input 
            placeholder="Max" 
            type="number"
            value={maxSize}
            onChange={(e) => setMaxSize(e.target.value)}
            className="w-full border border-line rounded-[8px] px-3 py-2 text-[14px] outline-none focus:border-navy text-ink placeholder:text-slate/60" 
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen flex flex-col h-screen overflow-hidden">
      <div className="shrink-0 h-[60px] md:h-[120px]">
        <Navbar />
      </div>
      
      {/* Mobile Top Bar with Filter Button */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-line shrink-0">
        <span className="font-serif font-bold">{filteredListings.length} homes</span>
        <button 
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 border border-line rounded-full px-4 py-1.5 text-[14px] font-bold shadow-sm"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Filters
        </button>
      </div>

      <main className="flex-1 flex overflow-hidden w-full max-w-[1600px] mx-auto relative">
        
        {/* Desktop Sidebar Filters */}
        <aside className={`w-[280px] shrink-0 border-r border-line bg-white flex-col h-full overflow-y-auto hidden md:flex ${layoutMode === 'grid' ? 'md:hidden lg:flex' : ''}`}>
          <div className="p-6 border-b border-line flex justify-between items-center shrink-0">
            <h2 className="font-serif text-[22px] font-semibold text-ink">Filter</h2>
            <button 
              onClick={() => setLayoutMode(prev => prev === 'list' ? 'grid' : 'list')}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#E8E5DF] hover:border-[#0B3D91] text-[#1A1A18] transition-colors cursor-pointer"
              title="Toggle layout"
            >
              {layoutMode === 'list' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              )}
            </button>
          </div>
          <div className="p-6 flex-grow overflow-y-auto">
            <FiltersContent />
          </div>
        </aside>

        {/* Dynamic Center Column + Right Map */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* Listings List/Grid */}
          <div className={`flex flex-col bg-[#FAFAF8] md:border-r border-[#E8E5DF] relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 w-full 
            order-2 md:order-1 h-[60%] md:h-full
            ${layoutMode === 'grid' ? 'md:w-[60%] lg:w-[65%]' : 'md:max-w-[600px] lg:flex-[1.2]'}
          `}>
            
            {/* Desktop Top Bar (Layout Toggle) */}
            <div className={`hidden md:flex items-center justify-between gap-4 px-6 py-4 border-b border-[#E8E5DF] bg-white shrink-0`}>
              <h1 className="font-serif text-[20px] font-bold text-[#1A1A18]">
                {filteredListings.length} results found
              </h1>
              <div className="flex items-center gap-3">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent border-none font-sans text-[14px] text-[#6B7280] outline-none cursor-pointer">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 pb-24">
              <div className={`grid gap-6 ${layoutMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-1'}`}>
                {filteredListings.map(l => (
                  <div 
                    key={l.id} 
                    className="bg-white rounded-[16px] overflow-hidden shadow-sm"
                    onMouseEnter={() => setSelectedId(l.id)} 
                    onMouseLeave={() => setSelectedId(null)}
                  >
                    <PropertyCard
                      listing={l}
                      compact={layoutMode === 'list'}
                      selected={selectedId === l.id}
                      onSelect={setSelectedId}
                    />
                  </div>
                ))}
                {filteredListings.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-500 font-bold font-serif text-xl">
                    No properties match your filters.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className={`bg-[#EAF2FF] relative p-0 md:p-4 transition-all duration-300 w-full 
            order-1 md:order-2 h-[40%] md:h-full block z-0
            ${layoutMode === 'grid' ? 'md:w-[40%] lg:w-[35%]' : 'md:flex-1 md:min-w-[300px]'}
          `}>
             <MultiMapDisplay 
               listings={filteredListings} 
               selectedId={selectedId} 
               onSelectPin={setSelectedId} 
             />
          </div>
        </div>
        

      </main>

      {/* Mobile Filters Fullscreen Modal */}
      {showMobileFilters && (
        <div className="md:hidden fixed inset-0 bg-white z-[100] flex flex-col animate-in slide-in-from-bottom-full">
          <div className="flex items-center justify-between p-4 border-b border-line shrink-0">
            <button onClick={() => setShowMobileFilters(false)} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h2 className="font-serif text-[18px] font-bold">Filters</h2>
            <button 
              onClick={() => {
                setSortBy("Recommended");
                setLocation("all");
                setSelectedTypes(new Set(["All"]));
                setMaxPrice(5000000);
                setMinSize("");
                setMaxSize("");
              }} 
              className="text-[14px] font-bold text-slate-500 hover:text-black underline"
            >
              Clear all
            </button>
          </div>
          <div className="p-6 overflow-y-auto flex-1 pb-32">
            <FiltersContent />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-line shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
            <button 
              onClick={() => setShowMobileFilters(false)}
              className="w-full bg-[#1A1A18] text-white font-bold text-[16px] py-3.5 rounded-xl transition-transform active:scale-95"
            >
              Show {filteredListings.length} homes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
