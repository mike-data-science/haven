"use client";

import { useEffect, useRef, useState } from "react";
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

const createPinIcon = (color, isHighlighted = false) => {
  return L.divIcon({
    html: `
      <div class="relative flex flex-col items-center" style="pointer-events: auto;">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-lg transition-transform cursor-pointer ${isHighlighted ? 'scale-125 z-50' : 'hover:scale-110 z-10'}">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="${color}" stroke="#fff" stroke-width="2"/>
          <circle cx="12" cy="10" r="3" fill="#fff"/>
        </svg>
      </div>
    `,
    className: "",
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
};

const createPriceBubbleIcon = (price, isSelected) => {
  const priceText = price ? `$${(price / 1000).toFixed(0)}k` : '';
  return L.divIcon({
    html: `
      <div class="relative" style="pointer-events: none;">
        <div class="bg-[#0B3D91] text-white font-sans text-[7px] font-bold py-1 px-1.5 rounded-full shadow-md border-2 ${isSelected ? 'border-white scale-110 z-40 bg-red-600' : 'border-white z-10'} transition-all duration-200 whitespace-nowrap -translate-x-1/2 -translate-y-full hover:bg-[#2B7FFF] cursor-pointer" style="pointer-events: auto;">
          ${priceText}
        </div>
      </div>
    `,
    className: "",
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

/**
 * @param {Object} props
 * @param {string} [props.mode="display"]
 * @param {Object|null} [props.property=null]
 * @param {Array} [props.listings=[]]
 * @param {string|number|null} [props.selectedId=null]
 * @param {string|number|null} [props.zoomedId=null]
 * @param {Function} [props.onSelectPin]
 * @param {number|null} [props.latitude=null]
 * @param {number|null} [props.longitude=null]
 * @param {(lat: number, lng: number) => void} [props.onChange]
 * @param {string} [props.height="300px"]
 * @param {number[]} [props.defaultCenter=[47.0105, 28.8638]]
 */
export default function UniversalMap({ 
  mode = "display", // "display" | "listings" | "picker"
  
  // Single property ('display')
  property = null,
  
  // Multiple properties ('listings')
  listings = [],
  selectedId = null,
  zoomedId = null,
  onSelectPin,
  
  // Location picker ('picker')
  latitude = null,
  longitude = null,
  onChange,
  
  // Styling
  height = "300px",
  defaultCenter = [47.0105, 28.8638] // Chisinau
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});
  const pickerMarkerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        // Interactivity is ALWAYS ON now!
        zoomControl: true,
        dragging: true,
        scrollWheelZoom: true,
        doubleClickZoom: true
      }).setView(defaultCenter, 12);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      if (mode === 'listings') {
        mapInstance.current.on('click', () => onSelectPin?.(null));
      }
      
      if (mode === 'picker') {
        mapInstance.current.on('click', (e) => {
          onChange?.(e.latlng.lat, e.latlng.lng);
        });
      }
    }
  }, [mode, defaultCenter, onChange, onSelectPin]);

  // Mode: DISPLAY
  useEffect(() => {
    if (mode !== 'display' || !mapInstance.current) return;
    
    // Clear old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    let lat = property?.latitude ? Number(property.latitude) : defaultCenter[0];
    let lng = property?.longitude ? Number(property.longitude) : defaultCenter[1];

    const marker = L.marker([lat, lng], { icon: createPinIcon('#EA4335') }).addTo(mapInstance.current);
    markersRef.current['display'] = marker;
    
    mapInstance.current.setView([lat, lng], 14);
  }, [mode, property, defaultCenter]);

  // Mode: LISTINGS
  useEffect(() => {
    if (mode !== 'listings' || !mapInstance.current) return;

    const map = mapInstance.current;
    
    // Clear old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    let bounds = L.latLngBounds();
    let hasPoints = false;

    listings.forEach(l => {
      let lat = l.latitude;
      let lng = l.longitude;
      
      if (!lat || !lng) {
        lat = defaultCenter[0] + (Math.random() - 0.5) * 0.1;
        lng = defaultCenter[1] + (Math.random() - 0.5) * 0.1;
      }

      hasPoints = true;
      const latLng = [lat, lng];
      bounds.extend(latLng);

      const isSelected = selectedId === l.id;
      
      const marker = L.marker(latLng, { icon: createPinIcon(isSelected ? '#EA4335' : '#0B3D91', isSelected) }).addTo(map);
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectPin?.(l.id);
      });
      markersRef.current[l.id] = marker;
    });

    const currentListingIds = listings.map(l => l.id).join(',');
    const isNewListings = map._lastListingIds !== currentListingIds;
    map._lastListingIds = currentListingIds;

    if (hasPoints && isNewListings) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [mode, listings, selectedId, defaultCenter, onSelectPin]);

  // Handle zooming to a specific listing
  useEffect(() => {
    if (mode !== 'listings' || !mapInstance.current) return;
    
    if (zoomedId && markersRef.current[zoomedId]) {
      const marker = markersRef.current[zoomedId];
      mapInstance.current.setView(marker.getLatLng(), 15, { animate: true });
    }
  }, [mode, zoomedId]);

  // Resize fix for container layout shifts
  useEffect(() => {
    if (mode !== 'listings' || !mapInstance.current) return;
    const timer = setTimeout(() => {
      mapInstance.current.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [mode, listings]);

  // Mode: PICKER
  useEffect(() => {
    if (mode !== 'picker' || !mapInstance.current) return;

    if (pickerMarkerRef.current) {
      pickerMarkerRef.current.remove();
      pickerMarkerRef.current = null;
    }

    if (latitude != null && longitude != null) {
      const latLng = [latitude, longitude];
      pickerMarkerRef.current = L.marker(latLng, { icon: createPinIcon('#EA4335') }).addTo(mapInstance.current);
      
      // Only set view if it's the very first time we have coordinates, otherwise let the user drag around
      if (!mapInstance.current._hasSetPickerInitialView) {
        mapInstance.current.setView(latLng, 14);
        mapInstance.current._hasSetPickerInitialView = true;
      }
    }
  }, [mode, latitude, longitude]);


  return (
    <div className="w-full relative rounded-xl overflow-hidden border border-line z-0" style={{ height }}>
      <div ref={mapRef} className="absolute inset-0 z-0" />
    </div>
  );
}
