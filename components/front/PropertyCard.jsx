import Link from 'next/link';
import { IconBed, IconBath, IconArea } from './Icons';
import { formatPrice } from '../../lib/data';

export function PropertyCard({ listing, compact, selected, onSelect }) {
  const cardContent = (
    <>
      <div className="relative h-[200px] w-full overflow-hidden">
        <img src={listing.image} alt={listing.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        <span className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-sm text-gold font-bold text-[13px] px-[11px] py-[5px] rounded-[8px] font-sans">
          {formatPrice(listing.price)}
        </span>
        {listing.agent && (
          <img
            className="absolute top-2.5 right-2.5 w-[30px] h-[30px] rounded-full object-cover border-[2px] border-white shadow-[0_2px_6px_rgba(26,26,24,0.25)]"
            src={listing.agent.image}
            alt={listing.agent.name}
            title={listing.agent.name}
          />
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow bg-white">
        <div>
          <h3 className="font-serif text-[16px] font-semibold mb-1 text-ink">{listing.title}</h3>
          <p className="text-slate text-[13px] mb-2">{listing.location}</p>
        </div>
        <div className="flex gap-[14px] text-[12px] text-slate pt-2.5 border-t border-line mt-2">
          <span className="flex items-center gap-1"><span className="text-navy flex-shrink-0"><IconBed /></span> {listing.beds}</span>
          <span className="flex items-center gap-1"><span className="text-navy flex-shrink-0"><IconBath /></span> {listing.baths}</span>
          <span className="flex items-center gap-1"><span className="text-navy flex-shrink-0"><IconArea /></span> {listing.sqft?.toLocaleString()} m²</span>
        </div>
      </div>
    </>
  );

  return (
    <Link
      href={`/property/${listing.id}`}
      className={`flex flex-col rounded-[16px] overflow-hidden border transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] no-underline text-ink ${
        selected ? "border-navy ring-1 ring-navy shadow-[0_0_0_1px_#0B3D91]" : "border-line"
      } ${compact ? "h-auto" : "h-full"}`}
      onClick={(e) => {
        if (onSelect) {
          e.preventDefault();
          onSelect(listing.id);
        }
      }}
    >
      {cardContent}
    </Link>
  );
}
