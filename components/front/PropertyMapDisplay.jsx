"use client";

import { useEffect, useRef } from "react";
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

// Helper to create custom HTML markers
function createCustomIcon(label, iconContent, bgColor, textColor = "white") {
  const html = `
    <div class="relative flex flex-col items-center group cursor-pointer" style="pointer-events: auto;">
      <div class="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded-[6px] text-[12px] font-bold text-[#1A1A18] shadow-md whitespace-nowrap z-50">
        ${label}
      </div>
      <div class="flex items-center justify-center w-8 h-8 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-2 border-white z-40 transition-transform hover:scale-110" style="background-color: ${bgColor}; color: ${textColor};">
        ${iconContent}
      </div>
    </div>
  `;
  return L.divIcon({
    html,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16], // center
  });
}

export default function PropertyMapDisplay({ property }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Use property coordinates or fallback
    let lat = property.latitude ? Number(property.latitude) : 37.7749;
    let lng = property.longitude ? Number(property.longitude) : -122.4194;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false
      }).setView([lat, lng], 14);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);
    }

    const map = mapInstance.current;
    
    // Clear old layers
    layersRef.current.forEach(layer => layer.remove());
    layersRef.current = [];

    const propertyLatLng = [lat, lng];

    // Generate mock POI coordinates (offset slightly from property)
    // Market: ~600m east, ~200m north
    const marketLatLng = [lat + 0.002, lng + 0.006];
    // School: ~800m south, ~400m west
    const schoolLatLng = [lat - 0.007, lng - 0.004];
    // University: ~1.2km north, ~800m west
    const uniLatLng = [lat + 0.010, lng - 0.008];

    const pois = [
      { latLng: marketLatLng, label: "Market", color: "#10B981", icon: "🛒" },
      { latLng: schoolLatLng, label: "School", color: "#F59E0B", icon: "🏫" },
      { latLng: uniLatLng, label: "University", color: "#8B5CF6", icon: "🎓" },
    ];

    let bounds = L.latLngBounds([propertyLatLng]);

    // Draw POIs and lines
    pois.forEach(poi => {
      bounds.extend(poi.latLng);

      // Draw Polyline
      const line = L.polyline([propertyLatLng, poi.latLng], {
        color: poi.color,
        weight: 3,
        dashArray: "6, 6",
        opacity: 0.7,
      }).addTo(map);
      layersRef.current.push(line);

      // Draw Marker
      const marker = L.marker(poi.latLng, {
        icon: createCustomIcon(poi.label, poi.icon, poi.color)
      }).addTo(map);
      layersRef.current.push(marker);
    });

    // Draw Property Marker
    const propertyIconHtml = `
      <div class="relative flex flex-col items-center" style="pointer-events: auto;">
        <div class="bg-[#0B3D91] text-white font-sans text-[14px] font-bold py-1.5 px-3 rounded-full shadow-[0_4px_12px_rgba(11,61,145,0.3)] border-2 border-white z-40 whitespace-nowrap">
          $${(property.price / 1000).toFixed(0)}k
        </div>
        <div class="w-3 h-3 bg-[#0B3D91] rotate-45 -translate-y-1.5 z-30"></div>
      </div>
    `;
    const propertyIcon = L.divIcon({
      html: propertyIconHtml,
      className: "",
      iconSize: [0, 0],
      iconAnchor: [0, 0], // Anchor to center-bottom of text
    });

    const propertyMarker = L.marker(propertyLatLng, { icon: propertyIcon }).addTo(map);
    layersRef.current.push(propertyMarker);

    // Fit map to show property and all POIs
    map.fitBounds(bounds, { padding: [40, 40] });

  }, [property]);

  return (
    <div className="w-full h-[300px] relative rounded-[14px] overflow-hidden border border-line">
      <div ref={mapRef} className="absolute inset-0 z-0" />
      <div className="absolute left-4 top-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-[8px] shadow-sm z-[400] pointer-events-none border border-line">
        <h4 className="font-sans text-[12px] font-bold text-navy uppercase tracking-[0.5px] mb-2">Nearby Amenities</h4>
        <ul className="flex flex-col gap-1.5 list-none p-0 m-0 text-[11px] font-medium text-slate">
          <li className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span> Market</li>
          <li className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span> School</li>
          <li className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span> University</li>
        </ul>
      </div>
    </div>
  );
}
