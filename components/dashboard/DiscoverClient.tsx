"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/front/PropertyCard";
import dynamic from "next/dynamic";
const UniversalMap = dynamic(() => import("@/components/shared/UniversalMap"), { ssr: false });
import { Search, Map as MapIcon, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function DiscoverClient({
  listings,
}: {
  listings: any[];
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Buy");
  const [subTab, setSubTab] = useState("Recommended");
  const [mapView, setMapView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredListings = listings
    .filter((listing) => {
      // Basic Search Filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !listing.title.toLowerCase().includes(q) &&
          !listing.location?.toLowerCase().includes(q) &&
          !listing.type?.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      
      // Top Tab Filter (Mock logic)
      if (activeTab === "Rent") {
        if (listing.type !== "Apartment") return false;
      }
      if (activeTab === "Buy") {
        if (listing.type === "Apartment") return false; // simple mock
      }
      
      return true;
    })
    .sort((a, b) => {
      if (subTab === "Popular") return b.id - a.id;
      if (subTab === "Nearest") return a.price - b.price;
      return 0; // Recommended (default)
    });

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="font-sans text-slate-600 min-h-full pb-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif mb-1 tracking-tight text-[#1A1A18]">Discover Properties</h1>
          <p className="text-slate-500 text-sm">Explore our curated selection of premium real estate.</p>
        </div>
      </div>

      {/* Top Filter Bar */}
      <div className="flex items-center gap-8 mb-6 border-b border-[#E8E5DF] w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {["Buy", "Sell", "Rent", "Compare"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`py-3 text-sm font-bold border-b-[2px] -mb-[1px] transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "border-[var(--theme-accent)] text-[var(--theme-accent)]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-6 min-w-0">
        {/* Left Content (Grid) */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
            <h2 className="text-lg font-bold text-[#1A1A18]">
              {filteredListings.length} Results
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Map View</span>
              <button
                onClick={() => setMapView(!mapView)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shadow-inner border border-transparent ${mapView ? "bg-[var(--theme-accent)]" : "bg-slate-300"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${mapView ? "translate-x-4" : "translate-x-1"}`} />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--theme-accent)]" />
              <input
                type="text"
                placeholder="Search Here..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3 py-2.5 rounded-full bg-white border border-[#E8E5DF] focus:outline-none focus:border-[var(--theme-accent)] text-[#1A1A18] text-xs font-medium placeholder-slate-400 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors"
              />
            </div>
            <button className="px-4 py-2.5 rounded-full bg-white border border-[#E8E5DF] shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors">
              Price <span className="text-[var(--theme-accent)] font-bold">$$</span>
            </button>
            <button className="px-4 py-2.5 rounded-full bg-[var(--theme-accent)] text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 shadow-lg shadow-[var(--theme-accent)]/20 transition-opacity">
              2-4 Beds <ChevronDown className="h-3 w-3" />
            </button>
            <button className="px-4 py-2.5 rounded-full bg-white border border-[#E8E5DF] shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors">
              Property Type <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-5 mb-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {["Recommended", "Popular", "Nearest"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setSubTab(tab);
                  setCurrentPage(1);
                }}
                className={`text-xs font-bold transition-colors whitespace-nowrap px-3 py-1.5 rounded-full ${
                  subTab === tab ? "bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Property Grid */}
          {paginatedListings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-[32px] border border-[#E8E5DF] shadow-sm">
              <p className="text-slate-500">No properties found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedListings.map((listing) => (
                <div key={listing.id} className="h-full group">
                  <PropertyCard
                    listing={listing}
                    compact={false}
                    selected={selectedId === listing.id}
                    onSelect={setSelectedId}
                    theme="light"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#E8E5DF] shadow-sm text-slate-500 hover:text-slate-800 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex gap-1">
                {(() => {
                  const maxVisiblePages = 5;
                  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                  let endPage = startPage + maxVisiblePages - 1;

                  if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                  }

                  const visiblePages = Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                  );

                  return visiblePages.map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                        currentPage === page 
                          ? "bg-[var(--theme-accent)] text-white shadow-lg shadow-[var(--theme-accent)]/20" 
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ));
                })()}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#E8E5DF] shadow-sm text-slate-500 hover:text-slate-800 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Content (Map) */}
        <div className="w-full xl:w-[450px] flex flex-col gap-5 shrink-0 min-w-0">
          {mapView && (
            <div className="bg-white p-4 rounded-[32px] border border-[#E8E5DF] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex-1 min-h-[500px] xl:sticky xl:top-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm flex items-center gap-1.5 text-[#1A1A18]">
                  <MapIcon className="h-4 w-4 text-[var(--theme-accent)]" />
                  Map View
                </h3>
              </div>
              <div className="h-[calc(100%-2rem)] rounded-2xl overflow-hidden min-h-[400px] border border-[#E8E5DF]">
                <UniversalMap
                  mode="listings"
                  listings={paginatedListings} 
                  selectedId={selectedId}
                  onSelectPin={setSelectedId}
                  height="100%"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
