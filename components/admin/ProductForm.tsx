'use client';

interface ProductFormProps {
  title: string;
  setTitle: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
  editingId: number | null;
  message: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancelEdit: () => void;
}

export function ProductForm({ 
  title, setTitle, price, setPrice, editingId, message, onSubmit, onCancelEdit 
}: ProductFormProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-8">
        <h2 className="mb-1 text-xl font-semibold">
          {editingId ? 'Editează Proprietate' : 'Adaugă Proprietate'}
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          {editingId ? 'Modifică informațiile proprietății selectate.' : 'Creează rapid o proprietate nouă.'}
        </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
              Titlu proprietate
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="iPhone 16 Pro"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Preț (MDL)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25000"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className={`w-full rounded-xl px-4 py-3 font-medium text-white transition ${
              editingId ? 'bg-amber-600 hover:bg-amber-500' : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            {editingId ? 'Actualizează Proprietatea' : 'Salvează Proprietatea'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="w-full rounded-xl bg-slate-100 px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-200 text-sm"
            >
              Anulează
            </button>
          )}
        </div>
      </form>

      {message && (
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700">
          {message}
        </div>
      )}
    </div>
  );
}