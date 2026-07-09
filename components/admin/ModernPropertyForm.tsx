"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, MapPin, Home, DollarSign, Layout, Layers, Hash, Calendar, Image as ImageIcon, X } from "lucide-react";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/admin/MapPicker"), { ssr: false });

interface ModernPropertyFormProps {
  categories: { id: number; name: string }[];
}

export default function ModernPropertyForm({ categories }: ModernPropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    address: "",
    rooms: "",
    bathrooms: "",
    area: "",
    floor: "",
    yearBuilt: "",
    categoryId: categories[0]?.id?.toString() || "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Create property (Defaults to DRAFT status per apiEntities)
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create property");
      }

      const savedProp = await res.json();

      // 2. Upload images in the background (Fire and forget)
      if (files.length > 0) {
        const uploadData = new FormData();
        uploadData.append("propertyId", String(savedProp.id));
        files.forEach(f => uploadData.append("files", f));

        // Don't await this, let it process in the background
        fetch("/api/upload", { method: "POST", body: uploadData }).catch(console.error);
      }

      // 3. Redirect instantly to My Properties
      router.push("/dashboard/my-properties");
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-[#18181b] p-6 text-white">
        <h2 className="text-2xl font-bold font-serif">List a New Property</h2>
        <p className="text-slate-400 text-sm mt-1">Fill in the details below to create a new property listing.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold border border-red-100">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">Basic Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title <span className="text-red-500">*</span></label>
            <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)] outline-none transition-all bg-slate-50" placeholder="e.g. Modern Luxury Villa in the Hills" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Property Type <span className="text-red-500">*</span></label>
              <div className="relative">
                <Home className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <select required name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)] outline-none transition-all bg-slate-50 appearance-none">
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price ($) <span className="text-red-500">*</span></label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)] outline-none transition-all bg-slate-50" placeholder="500000" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description <span className="text-red-500">*</span></label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)] outline-none transition-all bg-slate-50 resize-none" placeholder="Describe the property's best features..." />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">Location</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">City <span className="text-red-500">*</span></label>
              <input required name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)] outline-none transition-all bg-slate-50" placeholder="e.g. San Francisco" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address <span className="text-red-500">*</span></label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input required name="address" value={formData.address} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)] outline-none transition-all bg-slate-50" placeholder="123 Main St" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Pin on Map <span className="text-slate-400 font-normal">(Optional)</span></label>
            <div className="h-[300px] w-full rounded-2xl overflow-hidden border border-slate-200 relative z-0">
              <MapPicker
                latitude={formData.latitude ? Number(formData.latitude) : undefined}
                longitude={formData.longitude ? Number(formData.longitude) : undefined}
                onChange={(lat, lng) => setFormData(prev => ({ ...prev, latitude: String(lat), longitude: String(lng) }))}
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">Property Details</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Rooms <span className="text-red-500">*</span></label>
              <input required type="number" name="rooms" value={formData.rooms} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)] outline-none transition-all bg-slate-50" placeholder="3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Baths <span className="text-red-500">*</span></label>
              <input required type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)] outline-none transition-all bg-slate-50" placeholder="2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Area (sqm) <span className="text-red-500">*</span></label>
              <input required type="number" name="area" value={formData.area} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)] outline-none transition-all bg-slate-50" placeholder="120" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Floor <span className="text-red-500">*</span></label>
              <input required type="number" name="floor" value={formData.floor} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)] outline-none transition-all bg-slate-50" placeholder="1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Year Built <span className="text-red-500">*</span></label>
              <input required type="number" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)] outline-none transition-all bg-slate-50" placeholder="2022" />
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">Photos</h3>
          
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-slate-50 transition-colors relative">
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <div className="w-16 h-16 bg-blue-100 text-[var(--theme-accent)] rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8" />
              </div>
              <p className="font-semibold text-slate-700 text-lg">Click or drag images here</p>
              <p className="text-sm text-slate-500 mt-1">Upload up to 10 high-quality photos (JPG, PNG)</p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 border border-slate-200">
                  <ImageIcon className="w-4 h-4 text-slate-400" />
                  <span className="truncate max-w-[150px]">{f.name}</span>
                  <button type="button" onClick={() => removeFile(i)} className="p-1 hover:bg-red-100 text-red-500 rounded-lg transition-colors ml-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-8 border-t border-slate-200 flex justify-end gap-4">
          <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-8 py-3 rounded-xl bg-[var(--theme-accent)] font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 flex items-center gap-2">
            {loading ? "Creating Property..." : "Create Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
