"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export function MapDisplay({ latitude, longitude }) {
  useEffect(() => {
    if (!latitude || !longitude) return;

    // We don't use React-Leaflet here to avoid SSR and context issues, just plain Leaflet is fine and easy
    const mapContainer = document.getElementById("property-map");
    if (!mapContainer) return;

    // Clear previous map if any
    mapContainer.innerHTML = "";
    
    // Create new div for the map
    const mapDiv = document.createElement("div");
    mapDiv.style.width = "100%";
    mapDiv.style.height = "100%";
    mapDiv.style.borderRadius = "16px";
    mapContainer.appendChild(mapDiv);

    const map = L.map(mapDiv).setView([latitude, longitude], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);

    return () => {
      map.remove();
    };
  }, [latitude, longitude]);

  if (!latitude || !longitude) {
    return <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-500 rounded-2xl">Location not provided</div>;
  }

  return <div id="property-map" className="w-full h-full rounded-2xl overflow-hidden relative z-0" />;
}
