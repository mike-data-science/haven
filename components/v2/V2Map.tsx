"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { V2Property } from "@/app/v2/page";

// Custom pulsing marker icon
const createMarkerIcon = (isActive: boolean) => {
  const outerSize = 48;
  const innerSize = 28;
  const color = isActive ? "#E1F036" : "#ffffff";
  const outerColor = isActive ? "rgba(225, 240, 54, 0.4)" : "rgba(255, 255, 255, 0.6)";
  const pinColor = "#000000";
  
  const svgPinFilled = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="${pinColor}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>`;

  let html = '';
  
  if (isActive) {
    html = `
      <div style="position:relative; width:${outerSize}px; height:${outerSize}px; display:flex; align-items:center; justify-content:center;">
        <div style="position:absolute; width:100%; height:100%; background:${outerColor}; border-radius:50%; animation: ripple 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
        <div style="position:absolute; width:100%; height:100%; background:${outerColor}; border-radius:50%; animation: ripple 2s cubic-bezier(0,0,0.2,1) infinite; animation-delay: 0.66s;"></div>
        <div style="position:absolute; width:100%; height:100%; background:${outerColor}; border-radius:50%; animation: ripple 2s cubic-bezier(0,0,0.2,1) infinite; animation-delay: 1.33s;"></div>
        
        <div style="width:${innerSize}px; height:${innerSize}px; background:${color}; border-radius:50%; box-shadow:0 4px 12px rgba(0,0,0,0.15); display:flex; align-items:center; justify-content:center; position:relative; z-index:2;">
          ${svgPinFilled}
        </div>
      </div>
    `;
  } else {
    html = `
      <div style="position:relative; width:${outerSize}px; height:${outerSize}px; display:flex; align-items:center; justify-content:center;">
        <div style="position:absolute; width:100%; height:100%; background:${outerColor}; border-radius:50%;"></div>
        
        <div style="width:${innerSize}px; height:${innerSize}px; background:${color}; border-radius:50%; box-shadow:0 4px 12px rgba(0,0,0,0.1); display:flex; align-items:center; justify-content:center; position:relative; z-index:2;">
          ${svgPinFilled}
        </div>
      </div>
    `;
  }

  return L.divIcon({
    className: "v2-custom-marker",
    html: html,
    iconSize: [outerSize, outerSize],
    iconAnchor: [outerSize / 2, outerSize / 2],
  });
};

interface V2MapProps {
  properties: V2Property[];
  selectedId: number | null;
  onMarkerClick?: (id: number) => void;
}

export default function V2Map({ properties, selectedId, onMarkerClick }: V2MapProps) {
  if (typeof window === "undefined") return null;

  // Default center: Chisinau
  const center: [number, number] = properties.length > 0
    ? [properties[0].latitude, properties[0].longitude]
    : [47.026859, 28.841551];

  return (
    <div className="absolute inset-0 z-0 bg-[#E6EFF8]">
      <style>{`
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
      <MapContainer
        center={center}
        zoom={12}
        zoomControl={false}
        className="w-full h-full"
        style={{ background: "#E6EFF8" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            icon={createMarkerIcon(property.id === selectedId)}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) onMarkerClick(property.id);
              },
            }}
          />
        ))}

        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}
