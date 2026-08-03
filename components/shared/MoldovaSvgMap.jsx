"use client";

import { useState } from "react";
import { MOLDOVA_RAIONS_SVG, CHISINAU_SECTORS_SVG, getHeatmapColor } from "@/lib/moldova-svg-data";

/**
 * Interactive Vector Map of Republic of Moldova (Raions & Municipalities) and Chișinău Sectors.
 * Uses authentic CEC electoral map SVG contours (viewBox 0 0 568 746 for Moldova, viewBox 432 304 38 38 for Chișinău)
 * with rich real estate metadata, price heatmaps, and glassmorphic tooltips.
 */
export default function MoldovaSvgMap({
  selectedId = null,
  onSelectRaion,
  height = "100%",
  className = ""
}) {
  const [activeTab, setActiveTab] = useState("raions"); // 'raions' | 'sectors'
  const [colorMode, setColorMode] = useState("default"); // 'default' | 'heatmap'
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const currentData = activeTab === "raions" ? MOLDOVA_RAIONS_SVG : CHISINAU_SECTORS_SVG;
  const currentViewBox = activeTab === "raions" ? "0 0 568 746" : "10 -10 500 440";

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setHoveredRegion(null);
    onSelectRaion?.(null);
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl flex flex-col ${className}`}
      style={{ height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredRegion(null)}
    >
      {/* Top Floating Glassmorphism Control Header */}
      <div className="absolute top-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Title & Tab Switcher (Raions vs Sectors) */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 shadow-lg flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleTabChange("raions")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "raions"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-[1.02]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🇲🇩</span>
              <span>Raioane Moldova</span>
              <span className="text-[10px] bg-slate-800/80 px-1.5 py-0.5 rounded text-slate-300 font-normal">
                {MOLDOVA_RAIONS_SVG.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("sectors")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "sectors"
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md scale-[1.02]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🏙️</span>
              <span>Sectoare Chișinău</span>
              <span className="text-[10px] bg-slate-800/80 px-1.5 py-0.5 rounded text-slate-300 font-normal">
                {CHISINAU_SECTORS_SVG.length}
              </span>
            </button>
          </div>
        </div>

        {/* Color Mode Switcher */}
        <div className="bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 shadow-lg flex items-center gap-1 pointer-events-auto">
          <button
            type="button"
            onClick={() => setColorMode("default")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              colorMode === "default"
                ? "bg-slate-700 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Culori Regiuni
          </button>
          <button
            type="button"
            onClick={() => setColorMode("heatmap")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              colorMode === "heatmap"
                ? "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>🔥</span>
            <span>Heatmap Prețuri m²</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas with dynamic viewBox */}
      <div className="flex-1 w-full h-full flex items-center justify-center p-4 md:p-8 select-none overflow-hidden">
        <svg
          viewBox={currentViewBox}
          className="w-full h-full max-h-[720px] drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)] transition-transform duration-300"
          role="group"
          aria-label={activeTab === "raions" ? "Hartă Raioane Republica Moldova" : "Hartă Sectoare Chișinău"}
        >
          {/* High-fidelity Neon/Glass Glow Filters */}
          <defs>
            <filter id="hover-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="selected-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5.0" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Render Active Administrative Boundaries */}
          <g transform="translate(0,0) scale(0.97)" className="origin-center">
            {currentData.map((item) => {
              const isSelected = selectedId === item.id;
              const isHovered = hoveredRegion?.id === item.id;

              const fillColor =
                colorMode === "heatmap"
                  ? getHeatmapColor(item.avgPrice || parseInt(item.avgPriceFormatted?.replace(/[^\d]/g, "") || "800", 10))
                  : item.color;

              return (
                <path
                  key={item.id}
                  d={item.d}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRaion?.(isSelected ? null : item.id);
                  }}
                  onMouseEnter={() => setHoveredRegion(item)}
                  style={{
                    fill: fillColor,
                    fillOpacity: isSelected ? 1 : isHovered ? 0.95 : 0.76,
                    stroke: isHovered || isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.48)",
                    strokeWidth: isHovered ? (activeTab === "raions" ? 2.8 : 2.2) : isSelected ? (activeTab === "raions" ? 3.4 : 2.6) : (activeTab === "raions" ? 1.1 : 1.0),
                    filter: isSelected ? "url(#selected-glow)" : isHovered ? "url(#hover-glow)" : "none",
                    cursor: "pointer",
                    transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                  className="hover:z-50 outline-none"
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Interactive Glassmorphic Tooltip Card */}
      {hoveredRegion && (
        <div
          className="absolute z-50 pointer-events-none transition-all duration-75 ease-out"
          style={{
            left: `${Math.min(Math.max(tooltipPos.x - 110, 15), 350)}px`,
            top: `${Math.max(tooltipPos.y - 135, 15)}px`
          }}
        >
          <div className="bg-slate-900/95 backdrop-blur-2xl border border-slate-700/90 rounded-2xl p-4 shadow-2xl min-w-[220px] text-white animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between gap-2 mb-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-md ring-2 ring-white/20"
                  style={{
                    backgroundColor:
                      colorMode === "heatmap"
                        ? getHeatmapColor(hoveredRegion.avgPrice || parseInt(hoveredRegion.avgPriceFormatted?.replace(/[^\d]/g, "") || "800", 10))
                        : hoveredRegion.color
                  }}
                ></span>
                <span className="font-bold text-sm tracking-wide text-white">{hoveredRegion.name}</span>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                {hoveredRegion.region}
              </span>
            </div>

            {hoveredRegion.description && (
              <p className="text-xs text-slate-400 mb-2.5 line-clamp-2 leading-relaxed">
                {hoveredRegion.description}
              </p>
            )}

            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div className="bg-slate-800/80 border border-slate-700/60 p-2.5 rounded-xl">
                <span className="text-slate-400 text-[10px] block font-medium">Preț mediu</span>
                <span className="font-extrabold text-amber-400 text-sm">{hoveredRegion.avgPriceFormatted || `€${hoveredRegion.avgPrice}/m²`}</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 p-2.5 rounded-xl">
                <span className="text-slate-400 text-[10px] block font-medium">Oferte active</span>
                <span className="font-extrabold text-blue-400 text-sm">{hoveredRegion.listingCount || 0}</span>
              </div>
            </div>

            {hoveredRegion.trend && (
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                <span>Evoluție anuală:</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {hoveredRegion.trend}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Floating Legend & Reset Button */}
      <div className="absolute bottom-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Reset Selection Button or Help Text */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {selectedId ? (
            <button
              type="button"
              onClick={() => onSelectRaion?.(null)}
              className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg transition-all flex items-center gap-2 border border-rose-400/30"
            >
              <span>✕</span>
              <span>
                Resetare selecție ({currentData.find(r => r.id === selectedId)?.name})
              </span>
            </button>
          ) : (
            <span className="bg-slate-900/80 backdrop-blur-md text-slate-400 text-[11px] px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-lg hidden sm:inline-block font-medium">
              💡 Fă click pe o regiune sau un sector pentru a filtra proprietățile
            </span>
          )}
        </div>

        {/* Heatmap Price Legend */}
        {colorMode === "heatmap" && (
          <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-lg flex items-center gap-2.5 pointer-events-auto">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">€/m²:</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" title="< €700"></span>
                <span className="text-[10px] text-slate-300">&lt;700</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="€700 - €850"></span>
                <span className="text-[10px] text-slate-300">850</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" title="€850 - €1000"></span>
                <span className="text-[10px] text-slate-300">1000</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" title="€1000 - €1300"></span>
                <span className="text-[10px] text-slate-300">1300</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" title="> €1300"></span>
                <span className="text-[10px] text-slate-300">&gt;1300+</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
