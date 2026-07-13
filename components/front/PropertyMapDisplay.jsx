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

    let bounds = L.latLngBounds([propertyLatLng]);

    // Draw Property Marker
    const propertyIconHtml = `
      <div class="relative flex flex-col items-center" style="pointer-events: auto;">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-lg hover:scale-110 transition-transform">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#EA4335" stroke="#fff" stroke-width="2"/>
          <circle cx="12" cy="10" r="3" fill="#fff"/>
        </svg>
      </div>
    `;
    const propertyIcon = L.divIcon({
      html: propertyIconHtml,
      className: "",
      iconSize: [42, 42],
      iconAnchor: [21, 42],
    });

    const propertyMarker = L.marker(propertyLatLng, { icon: propertyIcon }).addTo(map);
    layersRef.current.push(propertyMarker);

    // Fit map to show property and all POIs
    map.fitBounds(bounds, { padding: [40, 40] });

  }, [property]);

  return (
    <div className="w-full h-56 relative rounded-[8px] overflow-hidden border border-line">
      <div ref={mapRef} className="absolute inset-0 z-0" />
    </div>
  );
}
