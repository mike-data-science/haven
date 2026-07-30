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
    <section className="w-full max-w-263 mx-auto px-4 md:px-8 py-5 pt-23">
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
    <div className="bg-white rounded-[11px] p-5 md:p-6 border border-line shadow-sm flex flex-col gap-6">
      {/* Main Details */}
      <div>
        <h2 className="font-serif text-xl font-semibold text-ink mb-5">Details & Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-paleBlue flex items-center justify-center text-navy shrink-0"><BedDouble size={22} strokeWidth={2.5} /></div>
            <div>
              <p className="font-sans text-xs font-bold text-slate uppercase tracking-wider mb-0.5">Bedrooms</p>
              <p className="font-sans text-base font-semibold text-ink">{property.beds}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-paleBlue flex items-center justify-center text-navy shrink-0"><Bath size={22} strokeWidth={2.5} /></div>
            <div>
              <p className="font-sans text-xs font-bold text-slate uppercase tracking-wider mb-0.5">Bathrooms</p>
              <p className="font-sans text-base font-semibold text-ink">{property.baths}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-paleBlue flex items-center justify-center text-navy shrink-0"><Maximize size={22} strokeWidth={2.5} /></div>
            <div>
              <p className="font-sans text-xs font-bold text-slate uppercase tracking-wider mb-0.5">Square Feet</p>
              <p className="font-sans text-base font-semibold text-ink">{property.sqft?.toLocaleString()} m²</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-paleBlue flex items-center justify-center text-navy shrink-0"><Building size={22} strokeWidth={2.5} /></div>
            <div>
              <p className="font-sans text-xs font-bold text-slate uppercase tracking-wider mb-0.5">Property Type</p>
              <p className="font-sans text-base font-semibold text-ink">{property.type || 'House'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-paleBlue flex items-center justify-center text-navy shrink-0"><Calendar size={22} strokeWidth={2.5} /></div>
            <div>
              <p className="font-sans text-xs font-bold text-slate uppercase tracking-wider mb-0.5">Year Built</p>
              <p className="font-sans text-base font-semibold text-ink">{property.yearBuilt || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-paleBlue flex items-center justify-center text-navy shrink-0"><Tag size={22} strokeWidth={2.5} /></div>
            <div>
              <p className="font-sans text-xs font-bold text-slate uppercase tracking-wider mb-0.5">Status</p>
              <p className="font-sans text-base font-semibold text-ink">{property.tag || 'Active'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ce e inautru */}
      <div className="pt-6 border-t border-line">
        <h3 className="font-serif text-xl font-semibold text-ink mb-4">Ce e înăuntru</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 list-none p-0 m-0">
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Tv size={18} className="text-slate" /> Televizor</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Refrigerator size={18} className="text-slate" /> Frigider</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Shirt size={18} className="text-slate" /> Mașină de spălat</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Bath size={18} className="text-slate" /> Toaletă</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Armchair size={18} className="text-slate" /> Mobilat</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Microwave size={18} className="text-slate" /> Cuptor cu microunde</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><ShowerHead size={18} className="text-slate" /> Cabină de duș</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Droplets size={18} className="text-slate" /> Bideu</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Wind size={18} className="text-slate" /> Aparat de aer condiționat</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Video size={18} className="text-slate" /> Interfon Video</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Wind size={18} className="text-slate" /> Uscător</li>
        </ul>
      </div>

      {/* Informatii despre casa */}
      <div className="pt-6 border-t border-line">
        <h3 className="font-serif text-xl font-semibold text-ink mb-4">Informații despre casă</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 list-none p-0 m-0">
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Activity size={18} className="text-slate" /> Rampă</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Lock size={18} className="text-slate" /> Zona închisă</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><ArrowUpDown size={18} className="text-slate" /> Lift</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><ShieldCheck size={18} className="text-slate" /> Securitate</li>
        </ul>
      </div>

      {/* Reguli in casa */}
      <div className="pt-6 border-t border-line">
        <h3 className="font-serif text-xl font-semibold text-ink mb-4">Reguli în casă</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 list-none p-0 m-0">
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Ban size={18} className="text-slate" /> Interzis cu animale</li>
          <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Ban size={18} className="text-slate" /> Fumatul interzis</li>
        </ul>
      </div>
    </div>
  );
}

function SidebarDescription({ property }) {
  if (!property.description) return null;
  return (
    <div className="bg-white rounded-[11px] p-5 border border-line shadow-sm">
      <h3 className="font-serif text-lg font-semibold text-ink mb-3">About this home</h3>
      <p className="font-sans text-sm sm:text-base leading-[1.7] text-slate whitespace-pre-wrap">{property.description}</p>
    </div>
  );
}

function PropertyMap({ property }) {
  return (
    <div className="bg-white rounded-[11px] p-5 md:p-6 border border-line shadow-sm">
      <h2 className="font-serif text-xl font-semibold text-ink mb-5">Locație</h2>
      <UniversalMap mode="display" property={property} />
    </div>
  );
}

function UsefulNearby() {
  return (
    <div className="bg-white rounded-[11px] p-5 md:p-6 border border-line shadow-sm">
      <h2 className="font-serif text-xl font-semibold text-ink mb-5">Util în apropiere</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 list-none p-0 m-0">
        <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><ShoppingCart size={18} className="text-slate" /> Shoping</li>
        <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Landmark size={18} className="text-slate" /> Bancă</li>
        <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Cross size={18} className="text-slate" /> Farmacie</li>
        <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Smile size={18} className="text-slate" /> Dentist</li>
        <li className="flex items-center gap-2 text-sm sm:text-base text-ink"><Store size={18} className="text-slate" /> Supermarket</li>
      </ul>
    </div>
  );
}

function ContactAgentForm({ agent }) {
  if (!agent) return null;
  return (
    <div className="bg-white rounded-[11px] p-5 border border-line shadow-sm">
      <div className="flex items-center gap-3 mb-5 pb-5 border-b border-line">
        <img src={agent.image} alt={agent.name} className="w-11 h-11 rounded-full object-cover" />
        <div>
          <strong className="font-serif text-lg font-semibold text-ink block">{agent.name}</strong>
          <span className="font-sans text-sm text-slate">{agent.role}</span>
        </div>
      </div>
      <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Your name" className="w-full border border-line rounded-[8px] px-3 py-2.5 text-sm outline-none focus:border-navy bg-warm transition-colors" />
        <input type="email" placeholder="Your email" className="w-full border border-line rounded-[8px] px-3 py-2.5 text-sm outline-none focus:border-navy bg-warm transition-colors" />
        <input type="tel" placeholder="Phone number" className="w-full border border-line rounded-[8px] px-3 py-2.5 text-sm outline-none focus:border-navy bg-warm transition-colors" />
        <textarea placeholder="I am interested in this property..." rows={3} className="w-full border border-line rounded-[8px] px-3 py-2.5 text-sm outline-none focus:border-navy bg-warm transition-colors resize-y"></textarea>
        <button type="submit" className="w-full bg-navy text-white rounded-[8px] py-3.5 font-bold text-base hover:bg-blue transition-colors cursor-pointer border-none mt-1.5">
          Contact Agent
        </button>
      </form>
    </div>
  );
}



function SimilarHomes({ homes }) {
  if (!homes || homes.length === 0) return null;
  return (
    <section className="w-full max-w-263 mx-auto px-4 md:px-8 py-15">
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
      
      <main className="w-full max-w-263 mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="flex flex-col gap-6">
          <PropertyFeatures property={property} />
          <PropertyMap property={property} />
          <UsefulNearby />
        </div>
        <aside className="flex flex-col gap-5">
          <SidebarDescription property={property} />
          <ContactAgentForm agent={property.agent} />
        </aside>
      </main>

      <SimilarHomes homes={similarProperties} />
    </div>
  );
}
