'use client';

import { useState, useEffect } from 'react';
import { ProductForm } from '@/components/admin/ProductForm';
import { AdminProductList } from '@/components/admin/AdminProductList';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, price: Number(price) }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(`✅ Proprietatea "${data.title}" a fost adăugată.`);
      setTitle('');
      setPrice('');
      fetchProperties();
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  const handleCancelEdit = () => {
    setTitle('');
    setPrice('');
    setMessage('');
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/properties', { cache: 'no-store' });
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Admin Proprietăți</h1>
          <p className="mt-2 text-slate-600">
            Adaugă o proprietate nouă în aplicație.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sticky top-6">
              <ProductForm
                title={title}
                setTitle={setTitle}
                price={price}
                setPrice={setPrice}
                editingId={null}
                message={message}
                onSubmit={handleSubmit}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold mb-2">Proprietăți existente</h2>
              <AdminProductList
                products={properties}
                loading={loading}
                onDelete={async (id: number) => {
                  if (!confirm('Sigur dorești să ștergi această proprietate?')) return;
                  await fetch(`/api/properties/${id}`, { method: 'DELETE' });
                  fetchProperties();
                }}
                onEdit={(p: any) => {
                  setTitle(p.title || '');
                  setPrice(p.price?.toString?.() || '');
                  setMessage(`✍️ Editezi acum: "${p.title}"`);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
