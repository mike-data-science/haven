'use client';

import { AdminProductRow } from './AdminProductRow';

interface AdminProductListProps {
  products: any[];
  loading: boolean;
  onDelete: (id: number) => void;
  onEdit: (product: any) => void;
}

export function AdminProductList({ products, loading, onDelete, onEdit }: AdminProductListProps) {
  if (loading) {
    return <p className="text-center text-slate-500 py-4">Se încarcă proprietățile...</p>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center text-slate-500 py-4">Nu există proprietăți disponibile.</p>;
  }
  
  return (
    <div className="space-y-3">
      {products.map((property) => (
        <AdminProductRow 
          key={property.id} 
          product={property} 
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}