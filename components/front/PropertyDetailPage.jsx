"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { PropertyCard } from "./PropertyCard";
import { COLORS, TOUR_DATES, TOUR_TIMES, formatPrice } from "../../lib/data";
import dynamic from "next/dynamic";
import { ImageLightbox } from "./ImageLightbox";
import { Home, BedDouble, Bath, Maximize, Calendar, Tag, Building, PhoneCall, Tv, Refrigerator, Shirt, Armchair, Microwave, ShowerHead, Droplets, Wind, Video, Activity, Lock, ArrowUpDown, ShieldCheck, Ban, ShoppingCart, Landmark, Cross, Smile, Store } from "lucide-react";

const UniversalMap = dynamic(() => import("../shared/UniversalMap"), { ssr: false });

function HeroGallery({ property }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const allImages = property.gallery?.length > 0 ? property.gallery : [property.image].filter(Boolean);

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-5 pt-23">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-1.5 mb-6">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-56 md:h-94 object-cover rounded-[9px] cursor-pointer hover:opacity-95 transition-opacity"
          onClick={() => setLightboxIndex(0)}
        />
        <div className="grid grid-cols-2 grid-rows-2 gap-1.5">
          {property.gallery?.slice(1, 5).map((src, i) => {
            const isLast = i === 3;
            const remaining = property.gallery.length - 5;
            return (
              <div key={i} className="relative w-full h-27 md:h-46 rounded-[9px] overflow-hidden group cursor-pointer" onClick={() => setLightboxIndex(i + 1)}>
                <img 
                  src={src} 
                  alt={`${property.title} photo ${i + 2}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {isLast && remaining > 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="text-white font-sans text-lg font-bold">+{remaining}</span>
                  </div>
                )}
              </div>
            );
          })}
          {/* If there are less than 5 images, show placeholders or nothing */}
          {Array.from({ length: Math.max(0, 4 - (property.gallery?.length ? property.gallery.length - 1 : 0)) }).map((_, i) => (
            <div key={`empty-${i}`} className="w-full h-27 md:h-46 bg-warm rounded-[9px]"></div>
          ))}
        </div>
      </div>
      
      {lightboxIndex !== null && (
        <ImageLightbox 
          images={allImages} 
          initialIndex={lightboxIndex} 
          onClose={() => setLightboxIndex(null)} 
        />
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
        <div>
          <p className="font-sans text-xs font-bold uppercase tracking-[2px] text-navy mb-1.5">{property.location}</p>
          <h1 className="font-serif text-[clamp(28px,4vw,42px)] font-bold text-ink leading-[1.1] mb-3">{property.title}</h1>

        </div>
        <div className="bg-paleBlue px-5 py-3 rounded-[7px]">
          <span className="font-sans text-2xl font-bold text-navy">{formatPrice(property.price)}</span>
        </div>
      </div>
    </section>
  );
}

function PropertyFeatures({ property }) {
  return (
    <div className="flex flex-col">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-7 gap-x-8 pb-8 border-b border-line">
        <div className="flex items-center gap-3.5">
          <BedDouble size={26} strokeWidth={2} className="text-slate-700 shrink-0" />
          <div>
            <p className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Bedrooms</p>
            <p className="font-sans text-base font-bold text-ink">{property.beds}</p>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <Bath size={26} strokeWidth={2} className="text-slate-700 shrink-0" />
          <div>
            <p className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Bathrooms</p>
            <p className="font-sans text-base font-bold text-ink">{property.baths}</p>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <Maximize size={26} strokeWidth={2} className="text-slate-700 shrink-0" />
          <div>
            <p className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Square Feet</p>
            <p className="font-sans text-base font-bold text-ink">{property.sqft?.toLocaleString()} m²</p>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <Building size={26} strokeWidth={2} className="text-slate-700 shrink-0" />
          <div>
            <p className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Property Type</p>
            <p className="font-sans text-base font-bold text-ink">{property.type || 'House'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <Calendar size={26} strokeWidth={2} className="text-slate-700 shrink-0" />
          <div>
            <p className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Year Built</p>
            <p className="font-sans text-base font-bold text-ink">{property.yearBuilt || 'N/A'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <Tag size={26} strokeWidth={2} className="text-slate-700 shrink-0" />
          <div>
            <p className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Status</p>
            <p className="font-sans text-base font-bold text-ink">{property.tag || 'Active'}</p>
          </div>
        </div>
      </div>

      {/* About this home (Moved to middle column for clean spacing) */}
      {property.description && (
        <div className="py-8 border-b border-line">
          <h3 className="font-serif text-2xl font-bold text-ink mb-4">About this home</h3>
          <p className="font-sans text-base sm:text-[17px] leading-[1.8] text-[#4A4A45] whitespace-pre-wrap">{property.description}</p>
        </div>
      )}
      
      {/* Ce e inautru */}
      <div className="py-8 border-b border-line">
        <h3 className="font-serif text-2xl font-bold text-ink mb-6">Ce e înăuntru</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-8 list-none p-0 m-0">
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Tv size={20} className="text-slate-500 shrink-0" /> Televizor</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Refrigerator size={20} className="text-slate-500 shrink-0" /> Frigider</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Shirt size={20} className="text-slate-500 shrink-0" /> Mașină de spălat</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Bath size={20} className="text-slate-500 shrink-0" /> Toaletă</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Armchair size={20} className="text-slate-500 shrink-0" /> Mobilat</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Microwave size={20} className="text-slate-500 shrink-0" /> Cuptor cu microunde</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><ShowerHead size={20} className="text-slate-500 shrink-0" /> Cabină de duș</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Droplets size={20} className="text-slate-500 shrink-0" /> Bideu</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Wind size={20} className="text-slate-500 shrink-0" /> Aparat de aer condiționat</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Video size={20} className="text-slate-500 shrink-0" /> Interfon Video</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Wind size={20} className="text-slate-500 shrink-0" /> Uscător</li>
        </ul>
      </div>

      {/* Informatii despre casa */}
      <div className="py-8 border-b border-line">
        <h3 className="font-serif text-2xl font-bold text-ink mb-6">Informații despre casă</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-8 list-none p-0 m-0">
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Activity size={20} className="text-slate-500 shrink-0" /> Rampă</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Lock size={20} className="text-slate-500 shrink-0" /> Zona închisă</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><ArrowUpDown size={20} className="text-slate-500 shrink-0" /> Lift</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><ShieldCheck size={20} className="text-slate-500 shrink-0" /> Securitate</li>
        </ul>
      </div>

      {/* Reguli in casa */}
      <div className="py-8 border-b border-line">
        <h3 className="font-serif text-2xl font-bold text-ink mb-6">Reguli în casă</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-8 list-none p-0 m-0">
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Ban size={20} className="text-slate-500 shrink-0" /> Interzis cu animale</li>
          <li className="flex items-center gap-3 text-base font-medium text-ink"><Ban size={20} className="text-slate-500 shrink-0" /> Fumatul interzis</li>
        </ul>
      </div>
    </div>
  );
}

function PropertyMap({ property }) {
  return (
    <div className="py-8 border-b border-line">
      <h2 className="font-serif text-2xl font-bold text-ink mb-6">Locație</h2>
      <div className="rounded-[16px] overflow-hidden border border-slate-200/80 shadow-sm">
        <UniversalMap mode="display" property={property} />
      </div>
    </div>
  );
}

function UsefulNearby() {
  return (
    <div className="py-8">
      <h2 className="font-serif text-2xl font-bold text-ink mb-6">Util în apropiere</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-8 list-none p-0 m-0">
        <li className="flex items-center gap-3 text-base font-medium text-ink"><ShoppingCart size={20} className="text-slate-500 shrink-0" /> Shoping</li>
        <li className="flex items-center gap-3 text-base font-medium text-ink"><Landmark size={20} className="text-slate-500 shrink-0" /> Bancă</li>
        <li className="flex items-center gap-3 text-base font-medium text-ink"><Cross size={20} className="text-slate-500 shrink-0" /> Farmacie</li>
        <li className="flex items-center gap-3 text-base font-medium text-ink"><Smile size={20} className="text-slate-500 shrink-0" /> Dentist</li>
        <li className="flex items-center gap-3 text-base font-medium text-ink"><Store size={20} className="text-slate-500 shrink-0" /> Supermarket</li>
      </ul>
    </div>
  );
}

function ContactAgentForm({ agent }) {
  if (!agent) return null;
  return (
    <div className="bg-white rounded-[16px] p-6 border border-line shadow-sm">
      <div className="flex items-center gap-3 mb-5 pb-5 border-b border-line">
        <img src={agent.image} alt={agent.name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <strong className="font-serif text-lg font-semibold text-ink block">{agent.name}</strong>
          <span className="font-sans text-sm text-slate">{agent.role}</span>
        </div>
      </div>
      <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Your name" className="w-full border border-line rounded-[8px] px-3.5 py-2.5 text-sm outline-none focus:border-navy bg-warm transition-colors" />
        <input type="email" placeholder="Your email" className="w-full border border-line rounded-[8px] px-3.5 py-2.5 text-sm outline-none focus:border-navy bg-warm transition-colors" />
        <input type="tel" placeholder="Phone number" className="w-full border border-line rounded-[8px] px-3.5 py-2.5 text-sm outline-none focus:border-navy bg-warm transition-colors" />
        <textarea placeholder="I am interested in this property..." rows={3} className="w-full border border-line rounded-[8px] px-3.5 py-2.5 text-sm outline-none focus:border-navy bg-warm transition-colors resize-y"></textarea>
        <button type="submit" className="w-full bg-navy text-white rounded-[8px] py-3.5 font-bold text-base hover:bg-blue transition-colors cursor-pointer border-none mt-1.5 shadow-sm">
          Contact Agent
        </button>
      </form>
    </div>
  );
}

function SimilarHomes({ homes }) {
  if (!homes || homes.length === 0) return null;
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-15 border-t border-line">
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="font-sans text-xs font-bold uppercase tracking-[2px] text-navy mb-1.5">Explore more</p>
          <h2 className="font-serif text-2xl font-semibold text-ink">Similar homes</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {homes.map(h => (
          <PropertyCard key={h.id} listing={h} />
        ))}
      </div>
    </section>
  );
}

export default function PropertyDetailPage({ property, similarProperties = [] }) {
  if (!property) return <div className="p-15 text-center font-sans text-base">Property not found</div>;

  return (
    <div className="min-h-screen bg-warm">
      <Navbar />
      <HeroGallery property={property} />
      
      <main className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
        <div className="flex flex-col">
          <PropertyFeatures property={property} />
          <PropertyMap property={property} />
          <UsefulNearby />
        </div>
        <aside className="flex flex-col gap-6 lg:sticky lg:top-28 h-fit">
          <ContactAgentForm agent={property.agent} />
        </aside>
      </main>
      <SimilarHomes homes={similarProperties} />
    </div>
  );
}
