"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Navbar } from "./Navbar";
import { PropertyCard } from "./PropertyCard";
import { IconBed, IconBath, IconArea } from "./Icons";
import dynamic from "next/dynamic";

const UniversalMap = dynamic(() => import('../shared/UniversalMap'), { ssr: false });

export default function ListingsPage({ properties, agents, categories, searchParams = {} }) {
  const [selectedId, setSelectedId] = useState(null);
  const [zoomedId, setZoomedId] = useState(null);
  const [layoutMode, setLayoutMode] = useState('list'); // 'list' | 'grid'
  
  // Mobile UI States
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Auto-scroll to card on mobile when map pin is clicked
  useEffect(() => {
    if (selectedId && window.innerWidth < 1024) {
      const element = document.getElementById(`property-card-${selectedId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [selectedId]);

  // Filter States
  const initType = searchParams.type && searchParams.type !== 'any' ? searchParams.type.charAt(0).toUpperCase() + searchParams.type.slice(1) : "All";
  const initRegion = searchParams.region && searchParams.region !== 'any' ? searchParams.region : "all";
  const initRooms = searchParams.rooms && searchParams.rooms !== 'any' ? searchParams.rooms : "all";
  
  const [sortBy, setSortBy] = useState("Recommended");
  const [location, setLocation] = useState(initRegion);
  const [selectedTypes, setSelectedTypes] = useState(new Set([initType]));
  const [rooms, setRooms] = useState(initRooms);
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || "5000000");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");

  const filteredListings = useMemo(() => {
    let result = [...(properties || [])];

    // Filter by Location
    if (location !== "all") {
      const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      result = result.filter(p => normalize(p.location).includes(normalize(location)));
    }

    // Filter by Type
    if (!selectedTypes.has("All")) {
      result = result.filter(p => {
        return Array.from(selectedTypes).some(t => p.type.toLowerCase().includes(t.toLowerCase()));
      });
    }

    // Filter by Price
    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    // Filter by Rooms
    if (rooms !== "all") {
      result = result.filter(p => p.beds >= Number(rooms));
    }

    // Filter by Size
    if (minSize) {
      result = result.filter(p => p.sqft >= Number(minSize));
    }
    if (maxSize) {
      result = result.filter(p => p.sqft <= Number(maxSize));
    }

    // Sort
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [properties, sortBy, location, selectedTypes, minPrice, maxPrice, minSize, maxSize, rooms]);

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
    <div className="flex flex-col gap-7 h-full overflow-y-auto pb-4 pr-1">
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-bold text-[#1A1A18]">Sort By</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] bg-slate-50 outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all text-[#1A1A18] cursor-pointer hover:bg-slate-100">
          <option>Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-bold text-[#1A1A18]">City / Sector</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] bg-slate-50 outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all text-[#1A1A18] cursor-pointer hover:bg-slate-100">
          <option value="all">Chișinău (All)</option>
          <option value="centru">Chișinău, Centru</option>
          <option value="botanica">Chișinău, Botanica</option>
          <option value="buiucani">Chișinău, Buiucani</option>
          <option value="ciocana">Chișinău, Ciocana</option>
          <option value="riscani">Chișinău, Rîșcani</option>
          <option value="telecentru">Chișinău, Telecentru</option>
          <option value="posta-veche">Chișinău, Poșta Veche</option>
        </select>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-[13px] font-bold text-[#1A1A18]">Type of place</label>
        <div className="flex flex-col gap-2">
          {["All", "Apartment", "House", "Land", "Commercial"].map(t => (
            <label key={t} className="flex items-center gap-3 text-[13px] font-medium text-slate-700 cursor-pointer group">
              <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors shadow-sm ${selectedTypes.has(t) ? 'bg-[#0B3D91] border-[#0B3D91]' : 'bg-white border-slate-300 group-hover:border-[#0B3D91]'}`}>
                {selectedTypes.has(t) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </div>
              {t}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-bold text-[#1A1A18]">Rooms</label>
        <select value={rooms} onChange={(e) => setRooms(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] bg-slate-50 outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all text-[#1A1A18] cursor-pointer hover:bg-slate-100">
          <option value="all">Any</option>
          <option value="1">1+ Rooms</option>
          <option value="2">2+ Rooms</option>
          <option value="3">3+ Rooms</option>
          <option value="4">4+ Rooms</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-bold text-[#1A1A18]">Price Range (€)</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">€</span>
            <input 
              placeholder="Min" 
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-6 pr-3 py-2.5 text-[13px] outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all bg-slate-50 text-[#1A1A18] placeholder:text-slate-400 hover:bg-slate-100" 
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">€</span>
            <input 
              placeholder="Max" 
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-6 pr-3 py-2.5 text-[13px] outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all bg-slate-50 text-[#1A1A18] placeholder:text-slate-400 hover:bg-slate-100" 
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-bold text-[#1A1A18]">Size (m²)</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <input 
              placeholder="Min" 
              type="number"
              value={minSize}
              onChange={(e) => setMinSize(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all bg-slate-50 text-[#1A1A18] placeholder:text-slate-400 hover:bg-slate-100" 
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">m²</span>
          </div>
          <div className="relative">
            <input 
              placeholder="Max" 
              type="number"
              value={maxSize}
              onChange={(e) => setMaxSize(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all bg-slate-50 text-[#1A1A18] placeholder:text-slate-400 hover:bg-slate-100" 
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">m²</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] h-screen max-h-screen min-h-screen flex flex-col overflow-hidden">
      <div className="shrink-0 h-[68px] lg:h-[88px]">
        <Navbar />
      </div>
      
      {/* Mobile Top Bar with Filter Button */}
      <div className="md:hidden flex items-center justify-between px-4 py-2.5 bg-white border-b border-line shrink-0">
        <span className="font-serif text-[15px] font-bold text-[#1A1A18]">{filteredListings.length} homes</span>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLayoutMode(prev => prev === 'list' ? 'grid' : 'list')}
            className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-[#0B3D91] transition-colors"
          >
            {layoutMode === 'list' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            )}
          </button>
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-1.5 border border-slate-200 rounded-full px-4 py-1.5 text-sm font-bold text-[#1A1A18] shadow-sm bg-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filters
          </button>
        </div>
      </div>

      <main className="flex-1 flex overflow-hidden w-full max-w-[1400px] mx-auto relative">
        
        {/* Desktop Sidebar Filters */}
        <aside className={`w-64 sm:w-72 shrink-0 border-r border-line bg-white flex-col h-full overflow-y-auto hidden md:flex ${layoutMode === 'grid' ? 'md:hidden lg:flex' : ''}`}>
          <div className="p-5 border-b border-line flex justify-between items-center shrink-0">
            <h2 className="font-serif text-lg font-semibold text-ink">Filter</h2>
            <button 
              onClick={() => setLayoutMode(prev => prev === 'list' ? 'grid' : 'list')}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#E8E5DF] hover:border-[#0B3D91] text-[#1A1A18] transition-colors cursor-pointer"
              title="Toggle layout"
            >
              {layoutMode === 'list' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              )}
            </button>
          </div>
          <div className="p-5 flex-grow overflow-y-auto">
            <FiltersContent />
          </div>
        </aside>

        {/* Dynamic Center Column + Right Map */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          
          {/* Listings List/Grid */}
          <div className={`flex flex-col bg-[#FAFAF8] lg:border-r border-[#E8E5DF] relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 w-full 
            order-2 lg:order-1 h-[60%] lg:h-full
            ${layoutMode === 'grid' ? 'lg:w-[60%] xl:w-[65%]' : 'w-full lg:max-w-[450px] xl:flex-[1.2]'}
          `}>
            
            {/* Desktop Top Bar (Layout Toggle) */}
            <div className={`hidden lg:flex items-center justify-between gap-3 px-5 py-3 border-b border-[#E8E5DF] bg-white shrink-0`}>
              <h1 className="font-serif text-base font-bold text-[#1A1A18]">
                {filteredListings.length} results found
              </h1>
              <div className="flex items-center gap-2">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent border-none font-sans text-sm text-[#6B7280] outline-none cursor-pointer font-medium">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 lg:px-5 py-3 lg:py-5 pb-18">
              <div className={`grid gap-5 ${layoutMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
                {filteredListings.slice(0, 30).map(l => (
                  <div 
                    key={l.id} 
                    id={`property-card-${l.id}`}
                    className="bg-white rounded-[9px] overflow-hidden shadow-sm h-full"
                    onMouseEnter={() => window.innerWidth >= 1024 && setSelectedId(l.id)} 
                  >
                    <PropertyCard
                      listing={l}
                      compact={layoutMode === 'list'}
                      selected={selectedId === l.id}
                      showOverlay={zoomedId === l.id}
                      onSelect={setSelectedId}
                      onZoom={setZoomedId}
                    />
                  </div>
                ))}
                {filteredListings.length > 30 && (
                  <div className="col-span-full py-6 text-center">
                    <p className="text-slate-500 font-sans">Showing 30 of {filteredListings.length} properties. Try refining your search.</p>
                  </div>
                )}
                {filteredListings.length === 0 && (
                  <div className="col-span-full py-9 text-center text-slate-500 font-bold font-serif text-base">
                    No properties match your filters.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className={`bg-[#EAF2FF] relative p-0 lg:p-3 transition-all duration-300 w-full 
            order-1 lg:order-2 h-[40%] lg:h-full block z-0
            ${layoutMode === 'grid' ? 'lg:w-[40%] xl:w-[35%]' : 'lg:flex-1 lg:min-w-56'}
          `}>
             <UniversalMap 
                mode="listings"
                listings={filteredListings.slice(0, 30)} 
                selectedId={selectedId}
                onSelectPin={setSelectedId}
                zoomedId={zoomedId}
                height="100%"
             />
          </div>
        </div>
        

      </main>

      {/* Mobile Filters Fullscreen Modal */}
      {showMobileFilters && (
        <div className="md:hidden fixed inset-0 bg-white z-[300] flex flex-col animate-in slide-in-from-bottom-full pt-safe">
          <div className="flex items-center justify-between p-4 border-b border-line shrink-0">
            <button 
              onClick={() => {
                setSortBy("Recommended");
                setLocation("all");
                setSelectedTypes(new Set(["All"]));
                setMaxPrice(5000000);
                setMinSize("");
                setMaxSize("");
              }} 
              className="text-sm font-bold text-slate-500 hover:text-black underline"
            >
              Clear all
            </button>
            <h2 className="font-serif text-lg font-bold">Filters</h2>
            <button onClick={() => setShowMobileFilters(false)} className="p-1.5 -mr-1.5 rounded-full hover:bg-slate-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div className="p-5 overflow-y-auto flex-1 pb-24">
            <FiltersContent />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-line shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
            <button 
              onClick={() => setShowMobileFilters(false)}
              className="w-full bg-[#1A1A18] text-white font-bold text-sm py-3.5 rounded-xl transition-transform active:scale-95"
            >
              Show {filteredListings.length} homes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
