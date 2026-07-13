"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/front/PropertyCard";
import dynamic from "next/dynamic";
const UniversalMap = dynamic(() => import("@/components/shared/UniversalMap"), { ssr: false });
import { Search, SlidersHorizontal, Map as MapIcon, ChevronDown, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 30 },
  { name: "Wed", value: 55 },
  { name: "Thu", value: 45 },
  { name: "Fri", value: 70 },
  { name: "Sat", value: 25 },
  { name: "Sun", value: 35 },
];

export default function DashboardPage({
  recentListings,
  stats,
  topAgents,
  typeCounts,
}: {
  recentListings: any[];
  stats: any;
  topAgents: any[];
  typeCounts: any[];
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Buy");
  const [subTab, setSubTab] = useState("Recommended");
  const [mapView, setMapView] = useState(true);

  return (
    <div className="font-sans text-slate-900 min-h-screen pb-8">
      {/* Top Filter Bar */}
      <div className="flex items-center gap-8 mb-6 border-b border-slate-200 px-1.5 w-full">
        {["Buy", "Sell", "Rent", "Compare"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-sm font-bold border-b-[2px] -mb-1 transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "border-[var(--theme-accent)] text-[var(--theme-accent)]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Content (Grid) */}
        <div className="flex-1">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
            <h1 className="text-lg font-bold">
              {stats.totalListings} Results <span className="text-slate-400 font-normal text-xs">in System</span>
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Map View</span>
              <button
                onClick={() => setMapView(!mapView)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shadow-inner ${mapView ? "bg-[var(--theme-accent)]" : "bg-slate-300"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${mapView ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex-1 min-w-47 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--theme-accent)]" />
              <input
                type="text"
                placeholder="Search Here..."
                className="w-full pl-9 pr-3 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]/20 text-xs font-medium"
              />
            </div>
            <button className="px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors">
              Price <span className="text-[var(--theme-accent)] font-bold">$$</span>
            </button>
            <button className="px-4 py-2 rounded-full bg-[var(--theme-accent)] text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 shadow-md shadow-[var(--theme-accent)]/20 transition-opacity">
              2-4 Beds <ChevronDown className="h-3 w-3" />
            </button>
            <button className="px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors">
              Property Type <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-5 mb-5">
            {["Recommended", "Popular", "Nearest"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSubTab(tab)}
                className={`text-xs font-semibold transition-colors ${
                  subTab === tab ? "text-[var(--theme-accent)]" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {recentListings.map((listing) => (
              <div key={listing.id} className="h-full">
                <PropertyCard
                  listing={listing}
                  compact={false}
                  selected={selectedId === listing.id}
                  onSelect={setSelectedId}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Content (Map & Analytics) */}
        <div className="w-full lg:w-71 xl:w-79 flex flex-col gap-5 shrink-0">
          
          {/* Recent Activity / Analytics Chart */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-[var(--theme-accent)]" />
                Weekly Activity
              </h3>
            </div>
            <div className="h-34 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="var(--theme-accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500">New Listings</span>
              <span className="font-bold text-sm">+{stats.thisWeek}</span>
            </div>
          </div>

          {/* Map View Panel */}
          {mapView && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex-1 min-h-75 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm flex items-center gap-1.5">
                  <MapIcon className="h-4 w-4 text-slate-400" />
                  Map View
                </h3>
              </div>
              <div className="flex-1 rounded-xl overflow-hidden min-h-56">
                <UniversalMap
                  mode="listings"
                  listings={recentListings}
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
