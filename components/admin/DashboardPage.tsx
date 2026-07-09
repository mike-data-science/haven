"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/front/PropertyCard";
import dynamic from "next/dynamic";
const ListingsMap = dynamic(() => import("@/components/front/ListingsMap"), { ssr: false });
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
    <div className="font-sans text-slate-900 min-h-screen pb-10">
      {/* Top Filter Bar */}
      <div className="flex items-center gap-10 mb-8 border-b border-slate-200 px-2 w-full">
        {["Buy", "Sell", "Rent", "Compare"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 text-lg font-bold border-b-[3px] -mb-[2px] transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "border-[var(--theme-accent)] text-[var(--theme-accent)]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Content (Grid) */}
        <div className="flex-1">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl font-bold">
              {stats.totalListings} Results <span className="text-slate-400 font-normal text-base">in System</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-700">Map View</span>
              <button
                onClick={() => setMapView(!mapView)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shadow-inner ${mapView ? "bg-[var(--theme-accent)]" : "bg-slate-300"}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${mapView ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex-1 min-w-[250px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--theme-accent)]" />
              <input
                type="text"
                placeholder="Search Here..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]/20 text-sm font-medium"
              />
            </div>
            <button className="px-5 py-3 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors">
              Price <span className="text-[var(--theme-accent)] font-bold">$$</span>
            </button>
            <button className="px-5 py-3 rounded-full bg-[var(--theme-accent)] text-white text-sm font-semibold hover:opacity-90 flex items-center gap-2 shadow-md shadow-[var(--theme-accent)]/20 transition-opacity">
              2-4 Beds <ChevronDown className="h-4 w-4" />
            </button>
            <button className="px-5 py-3 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors">
              Property Type <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-6 mb-6">
            {["Recommended", "Popular", "Nearest"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSubTab(tab)}
                className={`text-sm font-semibold transition-colors ${
                  subTab === tab ? "text-[var(--theme-accent)]" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
        <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col gap-6 shrink-0">
          
          {/* Recent Activity / Analytics Chart */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-[var(--theme-accent)]" />
                Weekly Activity
              </h3>
            </div>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="var(--theme-accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
              <span className="text-slate-500">New Listings</span>
              <span className="font-bold text-lg">+{stats.thisWeek}</span>
            </div>
          </div>

          {/* Map View Panel */}
          {mapView && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex-1 min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <MapIcon className="h-5 w-5 text-slate-400" />
                  Map View
                </h3>
              </div>
              <div className="flex-1 rounded-xl overflow-hidden min-h-[300px]">
                <ListingsMap
                  listings={recentListings}
                  selectedId={selectedId}
                  onSelectPin={setSelectedId}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
