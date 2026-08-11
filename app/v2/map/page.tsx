"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import V2Navbar from "@/components/v2/V2Navbar";
import V2PropertyCard, { type V2Property } from "@/components/v2/V2PropertyCard";
import V2DashboardPanel from "@/components/v2/V2DashboardPanel";
import { X } from "lucide-react";

// Dynamic import for Leaflet map to avoid SSR issues
const V2Map = dynamic(() => import("@/components/v2/V2Map"), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#E6EFF8] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});


export interface V2Stats {
  totalApproved: number;
  totalPending: number;
  soldPercent: number;
  pendingPercent: number;
  avgPrice: number;
  avgPricePerSqm: number;
  weeklyTrend: { name: string; value: number }[];
}

export default function V2MapPage() {
  const [properties, setProperties] = useState<V2Property[]>([]);
  const [stats, setStats] = useState<V2Stats | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // Global dark mode state for map
  const panelRef = useRef<HTMLDivElement>(null);

  // Fetch data from the API
  useEffect(() => {
    console.log("Starting fetch for properties...");
    fetch("/api/v2/properties")
      .then((res) => {
        console.log("Fetch response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Fetch success, setting data...");
        setProperties(data.properties || []);
        setStats(data.stats || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch V2 data:", err);
        setLoading(false);
      });
  }, []);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) || null;

  // Handle wheel events on the panel to toggle between collapsed/expanded
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.addEventListener("wheel", handleWheel, { passive: false });
    return () => panel.removeEventListener("wheel", handleWheel);
  }, [handleWheel, selectedPropertyId]);

  // Reset to collapsed when a new property is selected
  useEffect(() => {
    if (selectedPropertyId !== null) {
      setExpanded(false);
    }
  }, [selectedPropertyId]);

  return (
    <div className={`relative w-full h-screen overflow-hidden font-sora ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#E6EFF8]'}`}>
      {/* Background Map */}
      <V2Map 
        properties={properties} 
        selectedId={selectedPropertyId}
        onMarkerClick={(id) => setSelectedPropertyId(id)} 
        isDarkMode={isDarkMode}
      />

      {/* Floating Top Navigation */}
      <V2Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Sliding Bottom Panel */}
      {selectedProperty && (
        <>
          {/* Close button */}
          <button 
            onClick={() => setSelectedPropertyId(null)}
            className="absolute top-24 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 shadow-lg hover:bg-gray-100 z-[1000] transition-colors border border-gray-200"
          >
            <X size={20} />
          </button>

          {/* The sliding container */}
          <div
            ref={panelRef}
            className="absolute left-0 right-0 z-[999] pointer-events-auto px-6 transition-all duration-500 ease-out md:bottom-0 md:pb-6 bottom-[100px]"
            style={{
              top: typeof window !== "undefined" && window.innerWidth >= 768 ? (expanded ? "45%" : "60%") : "auto",
            }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-end justify-center md:justify-start">
              {/* Left: Property Card */}
              <div className="-mt-20">
                <V2PropertyCard property={selectedProperty} />
              </div>

              {/* Right: Dashboard Panel (Hidden on mobile to save space) */}
              <div className="hidden md:block">
                <V2DashboardPanel stats={stats} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
