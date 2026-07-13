'use client';

import Link from 'next/link';
import { useState } from 'react';


interface AdminProductRowProps {
  product: any;
  onDelete: (id: number) => void;
  onEdit: (product: any) => void;
}

export function AdminProductRow({ product, onDelete, onEdit }: AdminProductRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 shadow-sm transition hover:bg-slate-100/70">
      <div className="flex items-center justify-between p-3 gap-3">
        <div className="flex items-center gap-3">
          {product.images && product.images[0] && (
            <img src={product.images[0].url} alt={product.images[0].alt || ''} className="w-15 h-9 object-cover rounded-md" />
          )}

          <div>
            <div className="text-slate-700 font-medium">{product.title}</div>
            <div className="text-xs text-slate-500">{product.city || ''}</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="text-slate-700 font-medium mr-5">{product.price} MDL</div>

          <button 
            type="button"
            onClick={() => onEdit(product)}
            className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1.5 rounded-lg shadow-sm hover:bg-amber-100 transition"
          >
            Edit
          </button>

          <button 
            type="button"
            onClick={() => onDelete(product.id)}
            className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-2 py-1.5 rounded-lg shadow-sm hover:bg-red-100 transition"
          >
            Delete
          </button>

          <Link href={`/properties/${product.id}`} className="text-xs text-blue-600 hover:underline font-medium inline-flex items-center gap-1">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}