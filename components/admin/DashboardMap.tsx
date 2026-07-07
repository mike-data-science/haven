"use client";

import { useState } from "react";
import Image from "next/image";

interface Pin {
  top: string;
  left: string;
}

interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  image: string;
  agent: { name: string; image: string };
  pin: Pin;
}

export default function DashboardMap({
  listings,
  mode = "interactive",
  height = "100%",
  selectedId,
  onSelectPin,
}: {
  listings: Listing[];
  mode?: "interactive" | "static";
  height?: string;
  selectedId: number | null;
  onSelectPin: (id: number | null) => void;
}) {
  const selected = listings.find((l) => l.id === selectedId);

  const formatPrice = (price: number) => `$${price.toLocaleString()}`;

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-blue-50 border border-blue-100"
      style={{ height }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(43,127,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(43,127,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        {listings.map((l) => (
          <button
            key={l.id}
            className={`absolute flex -translate-x-1/2 -translate-y-full items-center justify-center whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-bold shadow-md transition-all hover:z-10 hover:scale-105 hover:bg-blue-600 focus:outline-none ${
              selectedId === l.id
                ? "z-20 scale-110 bg-amber-500 text-white shadow-amber-500/30"
                : "bg-blue-900 text-white"
            }`}
            style={{ top: l.pin.top, left: l.pin.left }}
            title={`${l.title} — ${formatPrice(l.price)}`}
            onClick={() => onSelectPin?.(l.id)}
          >
            {formatPrice(l.price)}
          </button>
        ))}

        {selected && (
          <div
            className="absolute z-30 w-56 -translate-x-1/2 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5"
            style={{ top: selected.pin.top, left: selected.pin.left, marginTop: "12px" }}
          >
            <button
              className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none"
              onClick={() => onSelectPin?.(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="relative h-28 w-full overflow-hidden rounded-lg">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-2">
              <span className="text-sm font-bold text-blue-900">
                {formatPrice(selected.price)}
              </span>
              <div className="mt-2 flex items-center gap-3 border-t border-slate-100 pt-2 text-[11px] font-medium text-slate-500">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-900"><path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3"/><path d="M2 11h20v6H2z"/><path d="M2 17v3"/><path d="M22 17v3"/><path d="M6 11V8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3"/></svg>
                  {selected.beds}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-900"><path d="M9 6V4a2 2 0 0 1 4 0v2"/><path d="M4 11h16v2a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z"/><path d="M6 19v2"/><path d="M16 19v2"/></svg>
                  {selected.baths}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-900"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h4v4H3z"/></svg>
                  {selected.sqft} m²
                </span>
              </div>
              <p className="mt-2 truncate font-serif text-[13px] font-semibold text-slate-900">
                {selected.title}
              </p>
              <p className="truncate text-[11px] text-slate-500">{selected.location}</p>
            </div>
          </div>
        )}
      </div>

      {mode === "interactive" && (
        <div className="absolute bottom-3 right-3 flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
          <button className="flex h-7 w-7 items-center justify-center border-b border-slate-200 text-slate-600 hover:bg-slate-50" aria-label="Zoom in">+</button>
          <button className="flex h-7 w-7 items-center justify-center text-slate-600 hover:bg-slate-50" aria-label="Zoom out">−</button>
        </div>
      )}
      <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600 backdrop-blur-sm">
        {mode === "interactive" ? "Interactive map" : "Map preview"}
      </span>
    </div>
  );
}
