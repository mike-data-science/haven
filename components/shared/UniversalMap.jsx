"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CHISINAU_SECTORS_GEOJSON, MOLDOVA_RAIONS_GEOJSON } from "@/lib/geojson-contours";

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
        <div class="absolute -bottom-1 w-5 h-2 bg-black/25 blur-[2px] rounded-full"></div>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-xl transition-all duration-300 cursor-pointer ${isHighlighted ? 'scale-125 z-50 -translate-y-1.5' : 'hover:scale-110 z-10'}">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="${color}" stroke="#ffffff" stroke-width="2.2"/>
          <circle cx="12" cy="10" r="3.2" fill="#ffffff"/>
        </svg>
      </div>
    `,
    className: "",
    iconSize: [44, 44],
    iconAnchor: [22, 44],
  });
};

/**
 * Universal Interactive Map for Real Estate
 * Features seamless drill-down from Moldova national raions/municipii directly into Chișinău Sectors,
 * custom glassmorphic tooltips, and dynamic tile themes.
 * 
 * @param {Object} props
 * @param {string} [props.mode="display"]
 * @param {any} [props.property]
 * @param {Array} [props.listings=[]]
 * @param {any} [props.selectedId]
 * @param {any} [props.zoomedId]
 * @param {Function} [props.onSelectPin]
 * @param {number} [props.latitude]
 * @param {number} [props.longitude]
 * @param {Function} [props.onChange]
 * @param {string} [props.height="300px"]
 * @param {Array<number>} [props.defaultCenter=[47.0245, 28.8322]]
 */
export default function UniversalMap({ 
  mode = "display", 
  property = undefined,
  listings = [],
  selectedId = undefined,
  zoomedId = undefined,
  onSelectPin,
  latitude = undefined,
  longitude = undefined,
  onChange,
  height = "300px",
  defaultCenter = [47.0245, 28.8322] // Chișinău Center
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});
  const pickerMarkerRef = useRef(null);
  const contoursLayerRef = useRef(null);
  const tileLayerRef = useRef(null);

  // UI Interactive Controls: 'raions' by default, drills down to 'sectors' when Chișinău is selected
  const [mapLevel, setMapLevel] = useState("none"); // 'raions' | 'sectors' | 'none'
  const [mapStyle, setMapStyle] = useState("street"); // 'voyager' | 'dark' | 'street'
  const [selectedContour, setSelectedContour] = useState(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        zoomControl: false,
        dragging: true,
        scrollWheelZoom: true,
        doubleClickZoom: true
      }).setView(defaultCenter, 9);

      L.control.zoom({ position: "topright" }).addTo(mapInstance.current);

      tileLayerRef.current = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      if (mode === 'listings') {
        mapInstance.current.on('click', () => {
          onSelectPin?.(null);
          setSelectedContour(null);
        });
      }
      
      if (mode === 'picker') {
        mapInstance.current.on('click', (e) => {
          onChange?.(e.latlng.lat, e.latlng.lng);
        });
      }
    }
  }, [mode, defaultCenter, onChange, onSelectPin]);

  // Update Map Tile Layer when theme changes
  useEffect(() => {
    if (!mapInstance.current || !tileLayerRef.current) return;

    const tileUrls = {
      voyager: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    };

    tileLayerRef.current.setUrl(tileUrls[mapStyle] || tileUrls.voyager);
  }, [mapStyle]);

  // Render & Handle GeoJSON Contours (Raions / Sectors drill-down)
  useEffect(() => {
    if (!mapInstance.current) return;

    if (contoursLayerRef.current) {
      mapInstance.current.removeLayer(contoursLayerRef.current);
      contoursLayerRef.current = null;
    }

    if (mapLevel === "none") return;

    const geoData = mapLevel === "sectors" ? CHISINAU_SECTORS_GEOJSON : MOLDOVA_RAIONS_GEOJSON;

    contoursLayerRef.current = L.geoJSON(geoData, {
      style: (feature) => {
        const isSelected = selectedContour?.id === feature.properties.id;
        return {
          color: feature.properties.color || "#0B3D91",
          weight: isSelected ? 4.0 : 2.5,
          opacity: isSelected ? 1 : 0.92,
          fillColor: feature.properties.color || "#0B3D91",
          fillOpacity: isSelected ? 0.55 : 0.28,
          dashArray: "",
          className: "transition-all duration-300 drop-shadow-md cursor-pointer"
        };
      },
      onEachFeature: (feature, layer) => {
        const isMunicipiu = feature.properties.type === "municipiu";
        const isUta = feature.properties.type === "uta";
        const unitTypeLabel = feature.properties.typeLabel || (isMunicipiu ? "Municipiu" : isUta ? "Unitate Autonomă" : feature.properties.type === "sector" ? "Sector" : "Raion");

        const tooltipHtml = `
          <div class="px-4 py-3 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/80 text-white font-sans min-w-[210px]">
            <div class="flex items-center justify-between gap-2 mb-1.5 border-b border-slate-800 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full shadow-sm ring-2 ring-white/20" style="background-color: ${feature.properties.color};"></span>
                <span class="font-bold text-xs text-white uppercase tracking-wider">${feature.properties.name}</span>
              </div>
              <span class="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${unitTypeLabel}</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed mb-2.5 font-normal">${feature.properties.description || feature.properties.name}</p>
            <div class="flex items-center justify-between border-t border-slate-800 pt-2 text-xs">
              <span class="text-slate-400">Preț mediu: <strong class="text-amber-400 font-extrabold">${feature.properties.avgPriceSqm || "€850/m²"}</strong></span>
              <span class="bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold px-2 py-0.5 rounded-full text-[10px]">${feature.properties.listingCount || 0} oferte</span>
            </div>
            ${feature.properties.id === "mun_chisinau" && mapLevel === "raions" ? `
              <div class="mt-2 text-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 py-1 rounded-lg border border-emerald-500/20">
                💡 Click pentru a explora Sectoarele Chișinăului
              </div>
            ` : ""}
          </div>
        `;

        layer.bindTooltip(tooltipHtml, {
          direction: "top",
          sticky: true,
          className: "custom-leaflet-tooltip",
          offset: [0, -10]
        });

        layer.on({
          mouseover: (e) => {
            const target = e.target;
            target.setStyle({
              weight: 3.8,
              fillOpacity: 0.5,
              dashArray: "",
              opacity: 1
            });
            target.bringToFront();
          },
          mouseout: (e) => {
            if (selectedContour?.id !== feature.properties.id) {
              contoursLayerRef.current?.resetStyle(e.target);
            }
          },
          click: (e) => {
            L.DomEvent.stopPropagation(e);
            // Dynamic drill-down: clicking Chișinău on the national map reveals Chișinău sectors!
            if (feature.properties.id === "mun_chisinau" && mapLevel === "raions") {
              setMapLevel("sectors");
              setSelectedContour(null);
              if (mapInstance.current) {
                mapInstance.current.flyTo([47.0245, 28.8322], 12.5, {
                  animate: true,
                  duration: 1.2
                });
              }
              return;
            }

            setSelectedContour(feature.properties);
            if (feature.properties.center && mapInstance.current) {
              mapInstance.current.flyTo(feature.properties.center, mapLevel === "sectors" ? 13.5 : 11, {
                animate: true,
                duration: 1.2
              });
            }
          }
        });
      }
    }).addTo(mapInstance.current);

    Object.values(markersRef.current).forEach((marker) => {
      marker.setZIndexOffset(1000);
    });

  }, [mapLevel, selectedContour]);

  // Mode: DISPLAY (single property detail)
  useEffect(() => {
    if (mode !== 'display' || !mapInstance.current) return;
    
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    let lat = property?.latitude ? Number(property.latitude) : defaultCenter[0];
    let lng = property?.longitude ? Number(property.longitude) : defaultCenter[1];

    const marker = L.marker([lat, lng], { icon: createPinIcon('#EA4335', true) }).addTo(mapInstance.current);
    markersRef.current['display'] = marker;
    
    mapInstance.current.setView([lat, lng], 14);
  }, [mode, property, defaultCenter]);

  // Mode: LISTINGS (multiple properties)
  useEffect(() => {
    if (mode !== 'listings' || !mapInstance.current) return;

    const map = mapInstance.current;
    
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    let bounds = L.latLngBounds();
    let hasPoints = false;

    listings.forEach(l => {
      let lat = l.latitude;
      let lng = l.longitude;
      
      if (!lat || !lng) {
        lat = defaultCenter[0] + (Math.random() - 0.5) * 0.08;
        lng = defaultCenter[1] + (Math.random() - 0.5) * 0.08;
      }

      hasPoints = true;
      const latLng = [lat, lng];
      bounds.extend(latLng);

      const isSelected = selectedId === l.id;
      const color = l.sector === 'Centru' ? '#EA4335' : 
                    l.sector === 'Botanica' ? '#34A853' : 
                    l.sector === 'Riscani' ? '#4285F4' : '#FBBC05';

      const marker = L.marker(latLng, { icon: createPinIcon(color, isSelected) }).addTo(map);

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectPin?.(l.id);
      });

      markersRef.current[l.id] = marker;
    });

    if (hasPoints && !selectedId && !selectedContour) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [mode, listings, selectedId, defaultCenter, onSelectPin, selectedContour]);

  // Zoom to specific listing pin when zoomedId changes
  useEffect(() => {
    if (!zoomedId || !mapInstance.current || !markersRef.current[zoomedId]) return;
    const marker = markersRef.current[zoomedId];
    const latLng = marker.getLatLng();
    mapInstance.current.flyTo(latLng, 16, { animate: true, duration: 1.0 });
  }, [mode, zoomedId]);

  // Mode: PICKER (interactive location selector)
  useEffect(() => {
    if (mode !== 'picker' || !mapInstance.current) return;

    if (pickerMarkerRef.current) {
      pickerMarkerRef.current.remove();
      pickerMarkerRef.current = null;
    }

    if (latitude && longitude) {
      const lat = Number(latitude);
      const lng = Number(longitude);
      pickerMarkerRef.current = L.marker([lat, lng], {
        icon: createPinIcon('#0B3D91', true),
        draggable: true,
      }).addTo(mapInstance.current);

      pickerMarkerRef.current.on('dragend', (e) => {
        const pos = e.target.getLatLng();
        onChange?.(pos.lat, pos.lng);
      });

      mapInstance.current.setView([lat, lng], 15);
    }
  }, [mode, latitude, longitude, onChange]);

  const activeContoursList = mapLevel === "sectors"
    ? CHISINAU_SECTORS_GEOJSON.features
    : mapLevel === "raions"
    ? MOLDOVA_RAIONS_GEOJSON.features
    : [];

  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md z-0 flex flex-col bg-slate-100" style={{ height }}>
      {/* Global CSS to strip Leaflet's default tooltip styling for glassmorphism */}
      <style jsx global>{`
        .custom-leaflet-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .custom-leaflet-tooltip::before {
          display: none !important;
        }
      `}</style>

      {/* Top Floating Glassmorphic Control Header */}
      <div className="absolute top-3 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left Controls: Contours Visibility & Navigation */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Toggle Contours On/Off */}
          <button
            type="button"
            onClick={() => {
              setMapLevel(prev => prev === "none" ? "raions" : "none");
              setSelectedContour(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-lg border ${
              mapLevel !== "none"
                ? "bg-white/90 text-slate-800 border-white/70 hover:bg-white"
                : "bg-slate-800/90 text-white border-slate-700 hover:bg-slate-800"
            }`}
          >
            {mapLevel !== "none" ? "👁️ Contururi active" : "👁️ Arată regiunile"}
          </button>

          {mapLevel === "sectors" && (
            <button
              type="button"
              onClick={() => {
                setMapLevel("raions");
                setSelectedContour(null);
                if (mapInstance.current) {
                  mapInstance.current.flyTo([47.0245, 28.8322], 9, {
                    animate: true,
                    duration: 1.2
                  });
                }
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl flex items-center gap-2 border border-white/20 scale-[1.02]"
            >
              <span>⬅️</span>
              <span>Înapoi la Harta Moldovei (Toate Raioanele)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Leaflet Map Canvas */}
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* Bottom Floating Interactive Sectors/Raions Legend */}
      {mapLevel !== "none" && (
        <div className="absolute bottom-3 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Active Selection / Reset Badge */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {selectedContour ? (
              <button
                type="button"
                onClick={() => setSelectedContour(null)}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xl transition-all flex items-center gap-2 border border-rose-400/30"
              >
                <span>✕</span>
                <span>Resetare selecție ({selectedContour.name})</span>
              </button>
            ) : (
              <span className="bg-slate-900/90 backdrop-blur-xl text-slate-300 text-[11px] px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-xl hidden md:inline font-medium">
                💡 Fă click pe un raion sau sector pentru a se fixa și explora zona
              </span>
            )}
          </div>

          {/* When drilled down into Chișinău Sectors, show interactive pill buttons for the 7 sectors */}
          {mapLevel === "sectors" && (
            <div className="bg-slate-900/90 backdrop-blur-xl p-1.5 rounded-2xl shadow-xl border border-slate-700/80 flex flex-wrap items-center gap-1.5 pointer-events-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 border-r border-slate-700 hidden sm:inline">
                Sectoare:
              </span>
              {activeContoursList.map((f) => {
                const isSelected = selectedContour?.id === f.properties.id;
                return (
                  <button
                    key={f.properties.id}
                    type="button"
                    onClick={() => {
                      setSelectedContour(f.properties);
                      if (f.properties.center && mapInstance.current) {
                        mapInstance.current.flyTo(f.properties.center, 13.5, {
                          animate: true,
                          duration: 1.2
                        });
                      }
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 shadow-md scale-105 font-bold"
                        : "bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: f.properties.color }}
                    ></span>
                    <span>{f.properties.name.replace("Sectorul ", "").replace(" (Chișinău)", "")}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
