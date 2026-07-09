"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, XCircle, Eye, Edit } from "lucide-react";
import ImageCarousel from "@/components/front/ImageCarousel";

export default function MyPropertiesClient({ initialProperties }: { initialProperties: any[] }) {
  const [properties, setProperties] = useState(initialProperties);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
            You don't have any properties yet.
            <div className="mt-4">
              <Link href="/dashboard/properties/new" className="px-5 py-3 rounded-3xl bg-[#0B3D91] text-white font-semibold transition-colors hover:bg-[#0B3D91]/90">
                List your first property
              </Link>
            </div>
          </div>
        )}
        
        {properties.slice(0, 30).map((prop) => (
          <div key={prop.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col transition-shadow hover:shadow-md">
            <div className="relative aspect-[4/3] w-full bg-slate-100">
              <ImageCarousel 
                images={prop.images?.length > 0 ? prop.images.map((i: any) => i.url) : []} 
                alt={prop.title} 
              />
              
              {/* Status Badge */}
              <div className={`absolute top-3 left-3 px-2 py-1 text-white text-xs font-bold rounded-md flex items-center gap-1 shadow-sm ${
                prop.status === 'APPROVED' ? 'bg-green-500' :
                prop.status === 'REJECTED' ? 'bg-red-500' :
                'bg-amber-500'
              }`}>
                {prop.status === 'PENDING' && <Clock className="w-3 h-3" />}
                {prop.status === 'APPROVED' && <CheckCircle2 className="w-3 h-3" />}
                {prop.status === 'REJECTED' && <XCircle className="w-3 h-3" />}
                {prop.status}
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{prop.title}</h3>
                <span className="font-semibold text-[var(--theme-accent)]">${(prop.price / 1000).toFixed(0)}k</span>
              </div>
              <p className="text-slate-500 text-sm mt-1">{prop.city} • {prop.category?.name || 'Uncategorized'}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-100 flex-1">
                <div className="text-xs text-slate-500 mt-1">
                  Listed on {new Date(prop.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <Link 
                  href={`/property/${prop.id}`}
                  className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg flex justify-center items-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" /> View
                </Link>
                <Link
                  href={`/dashboard/properties/new`}
                  className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg flex justify-center items-center transition-colors"
                  title="Edit Property"
                >
                  <Edit className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
