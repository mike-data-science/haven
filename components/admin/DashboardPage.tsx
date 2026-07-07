"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardMap from "./DashboardMap";

// Icons
function IconBed() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-900">
      <path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3" />
      <path d="M2 11h20v6H2z" />
      <path d="M2 17v3" />
      <path d="M22 17v3" />
      <path d="M6 11V8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3" />
    </svg>
  );
}
function IconBath() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-900">
      <path d="M9 6V4a2 2 0 0 1 4 0v2" />
      <path d="M4 11h16v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z" />
      <path d="M6 19v2" />
      <path d="M16 19v2" />
    </svg>
  );
}
function IconArea() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-900">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h4v4H3z" />
    </svg>
  );
}

function formatPrice(n: number) {
  return `$${n.toLocaleString()}`;
}

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

  const maxCount = Math.max(...typeCounts.map((t) => t.count), 1);

  return (
    <div className="font-sans text-slate-900 min-h-screen">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Total listings</span>
          <strong className="block mt-2 font-serif text-3xl font-semibold text-blue-900">{stats.totalListings}</strong>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Active agents</span>
          <strong className="block mt-2 font-serif text-3xl font-semibold text-blue-900">{stats.activeAgents}</strong>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Avg. days on market</span>
          <strong className="block mt-2 font-serif text-3xl font-semibold text-blue-900">{stats.avgDaysOnMarket}</strong>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">This week</span>
          <strong className="block mt-2 font-serif text-3xl font-semibold text-blue-900">+{stats.thisWeek}</strong>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Top Agents */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-serif text-xl font-semibold mb-6">Top agents</h3>
          <div className="space-y-4">
            {topAgents.map((a) => (
              <div key={a.id} className="flex items-center gap-4">
                <Image src={a.image} alt={a.name} width={48} height={48} className="rounded-full object-cover" unoptimized />
                <div>
                  <strong className="block font-semibold text-sm">{a.name}</strong>
                  <span className="text-sm text-slate-500">{a.listings} listings</span>
                </div>
              </div>
            ))}
            {topAgents.length === 0 && <p className="text-sm text-slate-500">No agents yet.</p>}
          </div>
        </div>

        {/* Map Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-serif text-xl font-semibold mb-4">Properties around you</h3>
          <DashboardMap
            listings={recentListings}
            mode="interactive"
            height="280px"
            selectedId={selectedId}
            onSelectPin={setSelectedId}
          />
        </div>

        {/* Property Types */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-serif text-xl font-semibold mb-6">Property type</h3>
          <div className="space-y-4">
            {typeCounts.map((t) => (
              <div key={t.type} className="flex items-center gap-3">
                <span className="w-24 text-sm font-medium shrink-0 truncate">{t.type}</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${(t.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right text-sm font-semibold">{t.count}</span>
              </div>
            ))}
            {typeCounts.length === 0 && <p className="text-sm text-slate-500">No types yet.</p>}
          </div>
        </div>
      </div>

      {/* Recent Listings */}
      <p className="font-serif text-xl font-semibold mb-6">Recent listings</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentListings.map((listing) => (
          <article
            key={listing.id}
            onClick={() => setSelectedId(listing.id)}
            className={`group bg-white rounded-2xl border overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-500 ${
              selectedId === listing.id ? "border-blue-900 ring-2 ring-blue-900/10" : "border-slate-200"
            }`}
          >
            <div className="relative h-48 w-full">
              <Image src={listing.image} alt={listing.title} fill className="object-cover" unoptimized />
              <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-amber-600 font-bold text-sm px-3 py-1.5 rounded-lg shadow-sm">
                {formatPrice(listing.price)}
              </span>
              {listing.agent && (
                <Image
                  src={listing.agent.image}
                  alt={listing.agent.name}
                  title={listing.agent.name}
                  width={36}
                  height={36}
                  className="absolute top-3 right-3 rounded-full border-2 border-white shadow-md object-cover"
                  unoptimized
                />
              )}
            </div>
            <div className="p-5">
              <h3 className="font-serif font-semibold text-lg mb-1 truncate">{listing.title}</h3>
              <p className="text-sm text-slate-500 mb-4 truncate">{listing.location}</p>
              <div className="flex gap-2 text-xs font-medium text-slate-600 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl"><IconBed /> {listing.beds}</span>
                <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl"><IconBath /> {listing.baths}</span>
                <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl"><IconArea /> {listing.sqft} m²</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
