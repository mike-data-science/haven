"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "./Navbar";
import { PropertyCard } from "./PropertyCard";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon paths
if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

function MultiMapDisplay({ listings, selectedId, onSelectPin }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([37.7749, -122.4194], 12);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);
    }

    const map = mapInstance.current;
    
    // Clear old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    let bounds = L.latLngBounds();
    let hasPoints = false;

    listings.forEach(l => {
      if (l.latitude && l.longitude) {
        hasPoints = true;
        const latLng = [l.latitude, l.longitude];
        bounds.extend(latLng);

        // Custom icon mimicking the price tag
        const iconHtml = `<div class="bg-[#0B3D91] text-white font-sans text-[12px] font-bold py-1 px-2.5 rounded-full shadow-md border-2 ${selectedId === l.id ? 'border-[#C49A3C] scale-110' : 'border-white'} transition-transform whitespace-nowrap -translate-x-1/2 -translate-y-full hover:bg-[#2B7FFF]">$${(l.price / 1000).toFixed(0)}k</div>`;
        
        const customIcon = L.divIcon({
          html: iconHtml,
          className: "", // Clear default leaflet class
          iconSize: [0, 0], // The div handles its own size
          iconAnchor: [0, 0] // Anchor logic handled by CSS transform
        });

        const marker = L.marker(latLng, { icon: customIcon }).addTo(map);
        marker.on('click', () => onSelectPin?.(l.id));
        markersRef.current[l.id] = marker;
      }
    });

    if (hasPoints && !selectedId) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (selectedId && markersRef.current[selectedId]) {
      const selectedMarker = markersRef.current[selectedId];
      map.setView(selectedMarker.getLatLng(), 15, { animate: true });
    }
  }, [listings, selectedId]);

  return <div ref={mapRef} className="w-full h-full rounded-2xl overflow-hidden relative z-0" />;
}

export default function ListingsPage({ properties = [], agents = [], categories = [] }) {
  const [selectedId, setSelectedId] = useState(null);
  const [filteredListings, setFilteredListings] = useState(properties);

  return (
    <div className="font-sans text-[#1A1A18] bg-[#FAFAF8] min-h-screen flex flex-col h-screen overflow-hidden">
      <div className="shrink-0">
        <Navbar />
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT COLUMN: Filters + Grid */}
        <div className="w-[60%] flex flex-col h-full bg-[#FAFAF8] border-r border-[#E8E5DF] relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          {/* Filters Bar */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-[#E8E5DF] bg-white shrink-0 overflow-x-auto">
            <div className="flex items-center gap-2 border border-[#E8E5DF] rounded-full px-4 py-2 hover:border-[#0B3D91] transition-colors cursor-pointer whitespace-nowrap">
              <span className="text-[13px] font-bold text-[#1A1A18]">Price</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            <div className="flex items-center gap-2 border border-[#E8E5DF] rounded-full px-4 py-2 hover:border-[#0B3D91] transition-colors cursor-pointer whitespace-nowrap">
              <span className="text-[13px] font-bold text-[#1A1A18]">Property Type</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            <div className="flex items-center gap-2 border border-[#E8E5DF] rounded-full px-4 py-2 hover:border-[#0B3D91] transition-colors cursor-pointer whitespace-nowrap">
              <span className="text-[13px] font-bold text-[#1A1A18]">Beds & Baths</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            <div className="flex items-center gap-2 border border-[#E8E5DF] rounded-full px-4 py-2 hover:border-[#0B3D91] transition-colors cursor-pointer whitespace-nowrap">
              <span className="text-[13px] font-bold text-[#1A1A18]">More Filters</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H3M21 12H3M21 20H3"/></svg>
            </div>
          </div>
          
          <div className="px-6 py-4 shrink-0 flex justify-between items-center bg-[#FAFAF8]">
            <h1 className="font-serif text-[22px] font-bold text-[#1A1A18]">
              {filteredListings.length} homes available
            </h1>
            <select className="bg-transparent border-none font-sans text-[14px] text-[#6B7280] outline-none cursor-pointer">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings.map(l => (
                <div key={l.id} onMouseEnter={() => setSelectedId(l.id)} onMouseLeave={() => setSelectedId(null)}>
                  <PropertyCard
                    listing={l}
                    selected={selectedId === l.id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Map */}
        <div className="w-[40%] bg-[#EAF2FF] relative p-4">
           <MultiMapDisplay 
             listings={filteredListings} 
             selectedId={selectedId} 
             onSelectPin={setSelectedId} 
           />
        </div>
      </div>
    </div>
  );
}
