"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { PropertyCard } from "./PropertyCard";
import { COLORS, TOUR_DATES, TOUR_TIMES, formatPrice } from "../../lib/data";

function HeroGallery({ property }) {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-5 md:px-10 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-[300px] md:h-[500px] object-cover rounded-[16px]"
        />
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {property.gallery?.slice(1, 5).map((src, i) => (
            <img key={i} src={src} alt={`${property.title} photo ${i + 2}`} className="w-full h-[142px] md:h-[242px] object-cover rounded-[16px]" />
          ))}
          {/* If there are less than 5 images, show placeholders or nothing */}
          {Array.from({ length: Math.max(0, 4 - (property.gallery?.length ? property.gallery.length - 1 : 0)) }).map((_, i) => (
            <div key={`empty-${i}`} className="w-full h-[142px] md:h-[242px] bg-warm rounded-[16px]"></div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="font-sans text-[13px] font-bold uppercase tracking-[1.5px] text-navy mb-2.5">{property.location}</p>
          <h1 className="font-serif text-[clamp(28px,4vw,42px)] font-bold text-ink leading-[1.1] mb-4">{property.title}</h1>
          <div className="flex flex-wrap gap-4 text-[14px] font-medium text-slate">
            <span className="flex items-center gap-1.5"><strong className="text-ink">{property.beds}</strong> beds</span>
            <span className="flex items-center gap-1.5"><strong className="text-ink">{property.baths}</strong> baths</span>
            <span className="flex items-center gap-1.5"><strong className="text-ink">{property.sqft?.toLocaleString()}</strong> m²</span>
            <span className="flex items-center gap-1.5">Built <strong className="text-ink">{property.yearBuilt}</strong></span>
          </div>
        </div>
        <div className="bg-paleBlue px-6 py-4 rounded-[12px]">
          <span className="font-sans text-[28px] font-bold text-navy">{formatPrice(property.price)}</span>
        </div>
      </div>
    </section>
  );
}

function Description({ property }) {
  return (
    <div className="bg-white rounded-[20px] p-6 md:p-8 border border-line shadow-sm">
      <h2 className="font-serif text-[22px] font-semibold text-ink mb-4">About this home</h2>
      <p className="font-sans text-[15px] leading-[1.7] text-slate">{property.description}</p>
      
      <div className="mt-8 pt-8 border-t border-line">
        <h3 className="font-sans text-[13px] font-bold uppercase tracking-[1px] text-navy mb-5">Features</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 list-none p-0 m-0">
          <li className="flex items-center gap-3 text-[14px] text-ink"><span className="w-1.5 h-1.5 rounded-full bg-navy"></span> Hardwood floors</li>
          <li className="flex items-center gap-3 text-[14px] text-ink"><span className="w-1.5 h-1.5 rounded-full bg-navy"></span> Central AC</li>
          <li className="flex items-center gap-3 text-[14px] text-ink"><span className="w-1.5 h-1.5 rounded-full bg-navy"></span> Modern kitchen</li>
          <li className="flex items-center gap-3 text-[14px] text-ink"><span className="w-1.5 h-1.5 rounded-full bg-navy"></span> 2-car garage</li>
        </ul>
      </div>
    </div>
  );
}

function PropertyMap({ property }) {
  return (
    <div className="bg-white rounded-[20px] p-6 md:p-8 border border-line shadow-sm">
      <h2 className="font-serif text-[22px] font-semibold text-ink mb-6">Location</h2>
      <div className="relative h-[300px] bg-paleBlue rounded-[14px] overflow-hidden border border-line">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(43,127,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(43,127,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        >
          <div 
            className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center"
            style={{ top: property.pin?.top || '50%', left: property.pin?.left || '50%' }}
          >
            <div className="bg-navy text-white font-bold text-[13px] px-3 py-1.5 rounded-[8px] shadow-[0_4px_12px_rgba(11,61,145,0.3)] mb-1">
              {formatPrice(property.price)}
            </div>
            <div className="w-3 h-3 bg-navy rotate-45 -translate-y-1.5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactAgentForm({ agent }) {
  if (!agent) return null;
  return (
    <div className="bg-white rounded-[20px] p-6 border border-line shadow-sm">
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-line">
        <img src={agent.image} alt={agent.name} className="w-[60px] h-[60px] rounded-full object-cover" />
        <div>
          <strong className="font-serif text-[18px] font-semibold text-ink block">{agent.name}</strong>
          <span className="font-sans text-[13px] text-slate">{agent.role}</span>
        </div>
      </div>
      <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Your name" className="w-full border border-line rounded-[10px] px-4 py-3 text-[14px] outline-none focus:border-navy bg-warm transition-colors" />
        <input type="email" placeholder="Your email" className="w-full border border-line rounded-[10px] px-4 py-3 text-[14px] outline-none focus:border-navy bg-warm transition-colors" />
        <input type="tel" placeholder="Phone number" className="w-full border border-line rounded-[10px] px-4 py-3 text-[14px] outline-none focus:border-navy bg-warm transition-colors" />
        <textarea placeholder="I am interested in this property..." rows={3} className="w-full border border-line rounded-[10px] px-4 py-3 text-[14px] outline-none focus:border-navy bg-warm transition-colors resize-y"></textarea>
        <button type="submit" className="w-full bg-navy text-white rounded-[10px] py-[14px] font-bold text-[15px] hover:bg-blue transition-colors cursor-pointer border-none mt-2">
          Contact Agent
        </button>
      </form>
    </div>
  );
}

function TourScheduler() {
  const [selectedDate, setSelectedDate] = useState(TOUR_DATES[0].id);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="bg-white rounded-[20px] p-6 border border-line shadow-sm">
      <h3 className="font-serif text-[18px] font-semibold text-ink mb-5">Schedule a tour</h3>
      
      <p className="font-sans text-[12px] font-bold text-slate uppercase tracking-[1px] mb-3">Select date</p>
      <div className="flex overflow-x-auto gap-2.5 pb-2 mb-4 snap-x no-scrollbar">
        {TOUR_DATES.map(d => (
          <button 
            key={d.id}
            className={`flex-shrink-0 w-[64px] rounded-[12px] py-2 flex flex-col items-center justify-center border transition-all snap-start cursor-pointer ${
              selectedDate === d.id ? "border-navy bg-navy text-white" : "border-line bg-warm text-ink hover:border-slate"
            }`}
            onClick={() => setSelectedDate(d.id)}
          >
            <span className="text-[11px] uppercase tracking-[0.5px] opacity-80 mb-0.5">{d.day}</span>
            <span className="text-[18px] font-bold font-serif">{d.num}</span>
          </button>
        ))}
      </div>

      <p className="font-sans text-[12px] font-bold text-slate uppercase tracking-[1px] mb-3">Select time</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {TOUR_TIMES.map(t => (
          <button 
            key={t}
            className={`rounded-[8px] py-2 text-[13px] font-medium border transition-colors cursor-pointer ${
              selectedTime === t ? "border-navy bg-paleBlue text-navy" : "border-line bg-white text-slate hover:border-navy hover:text-navy"
            }`}
            onClick={() => setSelectedTime(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <button className="w-full bg-white border-[2px] border-navy text-navy rounded-[10px] py-[13px] font-bold text-[15px] hover:bg-navy hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={!selectedTime}>
        Request Tour
      </button>
    </div>
  );
}

function SimilarHomes({ homes }) {
  if (!homes || homes.length === 0) return null;
  return (
    <section className="w-full max-w-[1400px] mx-auto px-5 md:px-10 py-[80px]">
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[1.5px] text-navy mb-2">Explore more</p>
          <h2 className="font-serif text-[28px] font-semibold text-ink">Similar homes</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homes.map(h => (
          <PropertyCard key={h.id} listing={h} />
        ))}
      </div>
    </section>
  );
}

export default function PropertyDetailPage({ property, similarProperties = [] }) {
  if (!property) return <div className="p-20 text-center font-sans text-xl">Property not found</div>;

  return (
    <div className="min-h-screen bg-warm">
      <Navbar />
      <HeroGallery property={property} />
      
      <main className="w-full max-w-[1400px] mx-auto px-5 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="flex flex-col gap-8">
          <Description property={property} />
          <PropertyMap property={property} />
        </div>
        <aside className="flex flex-col gap-6">
          <ContactAgentForm agent={property.agent} />
          <TourScheduler />
        </aside>
      </main>

      <SimilarHomes homes={similarProperties} />
    </div>
  );
}
