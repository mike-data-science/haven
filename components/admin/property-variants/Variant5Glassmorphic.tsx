"use client";

import React from "react";
import { Upload, MapPin, Home, DollarSign, Layout, Layers, Hash, Image as ImageIcon, X, Check, Sparkles, AlertCircle, Zap, ShieldCheck } from "lucide-react";
import { PropertyVariantProps } from "./types";

export default function Variant5Glassmorphic(props: PropertyVariantProps) {
  const {
    formData, setFormData, selectedTag, setSelectedTag,
    selectedFeatures, toggleFeature, selectAllGroup, clearGroup,
    files, handleFileChange, removeFile,
    categories, SECTORS_CHISINAU,
    INDOOR_AMENITIES, BUILDING_FEATURES, HOUSE_RULES, NEARBY_INFRASTRUCTURE,
    loading, error, isEditing, handleSubmit, UniversalMap
  } = props;

  return (
    <div className="w-full relative">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Vibrant Gradient Boutique Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#2B7FFF] to-[#1e58bd] p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Boutique Glassmorphic Design</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight m-0 text-white">
                {isEditing ? "Refine Exclusive Listing" : "Craft Exclusive Listing"}
              </h1>
              <p className="font-sans text-sm text-blue-100 m-0 mt-2 max-w-xl">
                State-of-the-art translucent frosted glass aesthetic with glowing interactive components.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50/90 backdrop-blur-md border border-red-200 text-red-700 flex items-center gap-3 text-sm font-medium shadow-md">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* GLASS CARD 1: CORE DETAILS */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-[0_8px_32px_rgba(31,38,135,0.06)] flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1A18] m-0">Primary Listing Profile</h2>
              <p className="font-sans text-xs text-slate-500 m-0 mt-0.5">Headline, category, pricing & key dimensions</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2B7FFF]">
              <Home className="w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Property Headline *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Glassmorphic Penthouse with Smart Home System"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-3.5 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] focus:shadow-md transition-all font-medium"
              />
            </div>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Price (€) *
              </label>
              <input
                type="number"
                name="price"
                required
                placeholder="390000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-3.5 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] focus:shadow-md transition-all font-semibold"
              />
            </div>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Category *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-3.5 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] focus:shadow-md transition-all font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Listing Badge
              </label>
              <div className="flex flex-wrap gap-2.5">
                {["For Sale", "For Rent", "New Building", "Exclusive", "Urgent"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      selectedTag === tag
                        ? "bg-gradient-to-r from-[#0B3D91] to-[#2B7FFF] text-white shadow-lg shadow-blue-500/20 scale-105"
                        : "bg-white/90 text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:col-span-2">
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Rooms</label>
                <input
                  type="number"
                  name="rooms"
                  placeholder="3"
                  value={formData.rooms}
                  onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                  className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] font-medium"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  placeholder="2"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] font-medium"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Total Area (m²)</label>
                <input
                  type="number"
                  name="area"
                  placeholder="140"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] font-medium"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Floor</label>
                <input
                  type="text"
                  name="floor"
                  placeholder="7 / 12"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] font-medium"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Property Narrative
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Highlight unique architectural merits, natural light, and lifestyle benefits..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white/90 border border-slate-200/80 rounded-2xl p-4 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] font-medium resize-y"
              />
            </div>
          </div>
        </div>

        {/* GLASS CARD 2: LOCATION */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-[0_8px_32px_rgba(31,38,135,0.06)] flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1A18] m-0">Location & Coordinate Map</h2>
              <p className="font-sans text-xs text-slate-500 m-0 mt-0.5">District selection & street positioning</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2B7FFF]">
              <MapPin className="w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              Chișinău Sector
            </label>
            <div className="flex flex-wrap gap-2.5">
              {SECTORS_CHISINAU.map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setFormData({ ...formData, city: sec })}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    formData.city === sec
                      ? "bg-gradient-to-r from-[#0B3D91] to-[#2B7FFF] text-white shadow-lg shadow-blue-500/20 scale-105"
                      : "bg-white/90 text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Exact Street Address *
            </label>
            <input
              type="text"
              name="address"
              required
              placeholder="str. Calea Orheiului 111, Towers"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-3.5 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] font-medium"
            />
          </div>

          <div className="h-[280px] rounded-2xl overflow-hidden border border-white shadow-sm">
            <UniversalMap
              latitude={parseFloat(formData.latitude) || 47.0245}
              longitude={parseFloat(formData.longitude) || 28.8322}
              interactive={true}
              onLocationSelect={(lat: number, lng: number) => {
                setFormData({ ...formData, latitude: lat.toFixed(6), longitude: lng.toFixed(6) });
              }}
            />
          </div>
        </div>

        {/* GLASS CARD 3: FEATURES */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-[0_8px_32px_rgba(31,38,135,0.06)] flex flex-col gap-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1A18] m-0">Features & Amenities Matrix</h2>
              <p className="font-sans text-xs text-slate-500 m-0 mt-0.5">Toggle interior features, security, rules, and nearby infrastructure</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2B7FFF]">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* Indoor */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-sans text-sm font-bold text-[#1A1A18] m-0">Ce e înăuntru (Indoor)</h3>
              <button type="button" onClick={() => selectAllGroup("indoor", INDOOR_AMENITIES.map(x => x.id))} className="text-xs text-[#2B7FFF] font-bold hover:underline cursor-pointer">Select All</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {INDOOR_AMENITIES.map((item) => {
                const Icon = item.icon;
                const active = selectedFeatures.indoor.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleFeature("indoor", item.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? "bg-gradient-to-r from-[#0B3D91] to-[#2B7FFF] text-white shadow-md"
                        : "bg-white/90 text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Building */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-sans text-sm font-bold text-[#1A1A18] m-0">Caracteristicile clădirii</h3>
              <button type="button" onClick={() => selectAllGroup("building", BUILDING_FEATURES.map(x => x.id))} className="text-xs text-[#2B7FFF] font-bold hover:underline cursor-pointer">Select All</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BUILDING_FEATURES.map((item) => {
                const Icon = item.icon;
                const active = selectedFeatures.building.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleFeature("building", item.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? "bg-gradient-to-r from-[#0B3D91] to-[#2B7FFF] text-white shadow-md"
                        : "bg-white/90 text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nearby */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-sans text-sm font-bold text-[#1A1A18] m-0">Infrastructură în apropiere</h3>
              <button type="button" onClick={() => selectAllGroup("nearby", NEARBY_INFRASTRUCTURE.map(x => x.id))} className="text-xs text-[#2B7FFF] font-bold hover:underline cursor-pointer">Select All</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {NEARBY_INFRASTRUCTURE.map((item) => {
                const Icon = item.icon;
                const active = selectedFeatures.nearby.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleFeature("nearby", item.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? "bg-gradient-to-r from-[#0B3D91] to-[#2B7FFF] text-white shadow-md"
                        : "bg-white/90 text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* GLASS CARD 4: PHOTOS */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-[0_8px_32px_rgba(31,38,135,0.06)] flex flex-col gap-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1A18] m-0">High-Resolution Gallery</h2>
              <p className="font-sans text-xs text-slate-500 m-0 mt-0.5">Upload photos of interiors and exterior views</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2B7FFF]">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>

          <label className="border-2 border-dashed border-slate-300 hover:border-[#2B7FFF] rounded-2xl p-8 text-center cursor-pointer transition-colors bg-white/60 hover:bg-blue-50/40">
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
            <Upload className="w-8 h-8 text-[#2B7FFF] mx-auto mb-2" />
            <p className="font-sans text-sm font-bold text-[#1A1A18] m-0">Click to upload images</p>
            <p className="font-sans text-xs text-slate-400 m-0 mt-1">PNG, JPG, WEBP up to 10MB each</p>
          </label>

          {files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-2">
              {files.map((file, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-white/80 shadow-sm group">
                  <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Bar */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-6 shadow-[0_8px_32px_rgba(31,38,135,0.06)] flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-2xl border border-slate-300 text-slate-600 hover:bg-slate-100 text-sm font-bold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#0B3D91] to-[#2B7FFF] hover:opacity-95 text-white text-sm font-bold shadow-lg shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Publishing Listing..." : isEditing ? "Save Changes" : "Publish Exclusive Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}
