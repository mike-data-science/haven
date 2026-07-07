import Link from 'next/link';
import { IconBed, IconBath, IconArea } from './Icons';
import { formatPrice } from '../../lib/data';

export function PropertyCard({ listing, compact, selected, onSelect }) {
  const cardContent = (
    <>
      <div className={`relative ${compact ? "h-[124px]" : "h-[200px]"} overflow-hidden shrink-0 w-full`}>
        {listing.image ? (
          <img src={listing.image} alt={listing.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 block" />
        ) : (
          <div className="w-full h-full bg-slate-200 block" />
        )}
        <span className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-sm text-gold font-bold text-[13px] px-[11px] py-[5px] rounded-[8px] font-sans">
          {formatPrice(listing.price)}
        </span>
        {listing.agent && (
          listing.agent.image ? (
            <img
              className="absolute top-2.5 right-2.5 w-[30px] h-[30px] rounded-full object-cover border-[2px] border-white shadow-[0_2px_6px_rgba(26,26,24,0.25)]"
              src={listing.agent.image}
              alt={listing.agent.name}
              title={listing.agent.name}
            />
          ) : (
            <div
              className="absolute top-2.5 right-2.5 w-[30px] h-[30px] rounded-full bg-slate-200 border-[2px] border-white shadow-[0_2px_6px_rgba(26,26,24,0.25)] flex items-center justify-center text-slate-500 font-bold text-[11px]"
              title={listing.agent.name}
            >
              {listing.agent.name?.charAt(0) || "A"}
            </div>
          )
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow bg-white min-w-0">
        <div>
          <h3 className="font-serif text-[16px] font-semibold mb-1 text-ink truncate">{listing.title}</h3>
          <p className="text-slate text-[13px] mb-2 truncate">{listing.location}</p>
        </div>
        <div className="flex gap-2 text-[12px] text-slate-600 pt-3 border-t border-line mt-2">
          <span className="flex items-center gap-1.5 shrink-0 bg-slate-100 px-2.5 py-1.5 rounded-xl"><span className="text-navy flex-shrink-0"><IconBed /></span> {listing.beds}</span>
          <span className="flex items-center gap-1.5 shrink-0 bg-slate-100 px-2.5 py-1.5 rounded-xl"><span className="text-navy flex-shrink-0"><IconBath /></span> {listing.baths}</span>
          <span className="flex items-center gap-1.5 shrink-0 bg-slate-100 px-2.5 py-1.5 rounded-xl"><span className="text-navy flex-shrink-0"><IconArea /></span> {listing.sqft?.toLocaleString()} m²</span>
        </div>
      </div>
    </>
  );

  return (
    <Link
      href={`/property/${listing.id}`}
      className={`flex bg-white rounded-[16px] overflow-hidden border transition-all duration-200 cursor-pointer no-underline text-ink
        ${compact ? "flex-row h-auto items-stretch" : "flex-col h-full"}
        ${selected ? "border-navy ring-1 ring-navy shadow-[0_0_0_1px_#0B3D91]" : "border-line hover:-translate-y-[3px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)]"}`}
      onClick={(e) => {
        if (onSelect) {
          e.preventDefault();
          onSelect(listing.id);
        }
      }}
    >
      {compact ? (
         <>
           <div className="w-[110px] shrink-0 h-full relative overflow-hidden">
             {listing.image ? (
               <img src={listing.image} alt={listing.title} loading="lazy" className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-105" />
             ) : (
               <div className="w-full h-full bg-slate-200 absolute inset-0" />
             )}
             <span className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm text-gold font-bold text-[11px] px-2 py-1 rounded-[6px] font-sans">
               {formatPrice(listing.price)}
             </span>
           </div>
           <div className="p-3 flex flex-col justify-between flex-grow min-w-0 bg-white">
             <div>
               <h3 className="font-serif text-[15px] font-semibold text-ink mb-1 truncate">{listing.title}</h3>
               <p className="font-sans text-[12px] text-slate mb-2 truncate">{listing.location}</p>
             </div>
             <div className="flex gap-1.5 text-[11px] text-slate-600 pt-2 border-t border-line mt-2">
               <span className="flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-1 rounded-lg"><span className="w-3 h-3 text-navy"><IconBed /></span> {listing.beds}</span>
               <span className="flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-1 rounded-lg"><span className="w-3 h-3 text-navy"><IconBath /></span> {listing.baths}</span>
               <span className="flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-1 rounded-lg"><span className="w-3 h-3 text-navy"><IconArea /></span> {listing.sqft?.toLocaleString()}</span>
             </div>
           </div>
         </>
      ) : cardContent}
    </Link>
  );
}
