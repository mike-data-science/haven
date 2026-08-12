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

export default function ListingsMap({ listings, selectedId, onSelectPin, zoomedId }) {
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
      
      const iconHtml = `
        <div class="relative" style="pointer-events: none;">
          <div class="bg-[#1E65FF] text-white font-sans text-[7px] font-bold py-1 px-1.5 rounded-full shadow-md border-2 ${isSelected ? 'border-white scale-110 z-40 bg-red-600' : 'border-white z-10'} transition-all duration-200 whitespace-nowrap -translate-x-1/2 -translate-y-full hover:bg-[#2B7FFF] cursor-pointer" style="pointer-events: auto;">
            ${priceText}
          </div>
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

    const currentListingIds = listings.map(l => l.id).join(',');
    const isNewListings = mapInstance.current._lastListingIds !== currentListingIds;
    mapInstance.current._lastListingIds = currentListingIds;

    if (hasPoints) {
      if (isNewListings) {
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
  }, [listings]);

  useEffect(() => {
    if (zoomedId && mapInstance.current && markersRef.current[zoomedId]) {
      mapInstance.current.flyTo(markersRef.current[zoomedId].getLatLng(), 16, { animate: true, duration: 1.5 });
    }
  }, [zoomedId]);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-sm border border-[#E8E5DF]">
      <div ref={mapRef} className="absolute inset-0 z-0" />
      <span className="absolute left-3 top-3 bg-white/90 backdrop-blur-sm px-1.5 py-1 rounded-[4px] text-[6px] font-bold text-[#1E65FF] shadow-sm uppercase tracking-[0px] z-[400] pointer-events-none">
        Interactive map
      </span>
    </div>
  );
}
