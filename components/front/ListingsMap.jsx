"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

export default function ListingsMap({ listings, selectedId, onSelectPin }) {
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

      mapInstance.current.on('click', () => onSelectPin?.(null));
    }

    const map = mapInstance.current;
    
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    let bounds = L.latLngBounds();
    let hasPoints = false;

    listings.forEach(l => {
      let lat = l.latitude;
      let lng = l.longitude;
      
      if (!lat || !lng) {
        lat = 37.7749 + (Math.random() - 0.5) * 0.1;
        lng = -122.4194 + (Math.random() - 0.5) * 0.1;
      }

      hasPoints = true;
      const latLng = [lat, lng];
      bounds.extend(latLng);

      const isSelected = selectedId === l.id;
      const priceText = `$${(l.price / 1000).toFixed(0)}k`;
      
      const popupHtml = isSelected ? `
        <div class="absolute -translate-x-1/2 mt-3 w-[260px] bg-white rounded-[16px] shadow-[0_12px_32px_rgba(26,26,24,0.15)] overflow-hidden z-30 transition-all duration-200" style="pointer-events: auto;" onclick="event.stopPropagation()">
          <div class="relative h-[120px] w-full bg-slate-200">
            ${l.image ? `<img src="${l.image}" alt="${l.title}" class="w-full h-full object-cover block" />` : ''}
          </div>
          <div class="p-3 bg-white text-left">
            <span class="font-sans text-[15px] font-bold text-[#0B3D91] block mb-1">$${l.price.toLocaleString()}</span>
            <div class="flex gap-2 text-[11px] text-[#6B7280] mb-2 font-semibold">
              <span>${l.beds} bed</span> • 
              <span>${l.baths} bath</span> • 
              <span>${l.sqft.toLocaleString()} sqft</span>
            </div>
            <p class="font-serif text-[14px] font-semibold text-[#1A1A18] mb-0.5 truncate">${l.title}</p>
            <p class="text-[11px] text-[#6B7280] truncate">${l.location}</p>
          </div>
        </div>
      ` : '';

      const iconHtml = `
        <div class="relative" style="pointer-events: none;">
          <div class="bg-[#0B3D91] text-white font-sans text-[12px] font-bold py-1 px-2.5 rounded-full shadow-md border-2 ${isSelected ? 'border-[#C49A3C] scale-110 z-40 bg-[#1A1A18]' : 'border-white z-10'} transition-all duration-200 whitespace-nowrap -translate-x-1/2 -translate-y-full hover:bg-[#2B7FFF] cursor-pointer" style="pointer-events: auto;">
            ${priceText}
          </div>
          ${popupHtml}
        </div>
      `;
      
      const customIcon = L.divIcon({
        html: iconHtml,
        className: "",
        iconSize: [0, 0], 
        iconAnchor: [0, 0] 
      });

      const marker = L.marker(latLng, { icon: customIcon }).addTo(map);
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectPin?.(isSelected ? null : l.id);
      });
      markersRef.current[l.id] = marker;
    });

    if (hasPoints) {
      if (selectedId && markersRef.current[selectedId]) {
        map.setView(markersRef.current[selectedId].getLatLng(), map.getZoom(), { animate: true });
      } else {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [listings, selectedId]);

  useEffect(() => {
    if (mapInstance.current) {
      setTimeout(() => {
        mapInstance.current.invalidateSize();
      }, 100);
    }
  });

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-sm border border-[#E8E5DF]">
      <div ref={mapRef} className="absolute inset-0 z-0" />
      <span className="absolute left-4 top-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-[6px] text-[11px] font-bold text-[#0B3D91] shadow-sm uppercase tracking-[0.5px] z-[400] pointer-events-none">
        Interactive map
      </span>
    </div>
  );
}
