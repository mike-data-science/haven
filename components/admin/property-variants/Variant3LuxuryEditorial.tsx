"use client";

import React from "react";
import { Upload, MapPin, Home, DollarSign, Layout, Layers, Hash, Image as ImageIcon, X, Check, Sparkles, AlertCircle, Award, Compass, Shield } from "lucide-react";
import { PropertyVariantProps } from "./types";

export default function Variant3LuxuryEditorial(props: PropertyVariantProps) {
  const {
    formData, setFormData, selectedTag, setSelectedTag,
    selectedFeatures, toggleFeature, selectAllGroup, clearGroup,
    files, handleFileChange, removeFile,
    categories, SECTORS_CHISINAU,
    INDOOR_AMENITIES, BUILDING_FEATURES, HOUSE_RULES, NEARBY_INFRASTRUCTURE,
    loading, error, isEditing, handleSubmit, UniversalMap
  } = props;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto flex flex-col gap-10 bg-[#FAFAF8] p-4 sm:p-8 rounded-3xl border border-[#E8E5DF]">
      {/* Editorial Header */}
      <div className="text-center pb-8 border-b-2 border-[#1A1A18]/10">
        <div className="inline-flex items-center gap-2 bg-amber-900/10 text-amber-900 px-4 py-1.5 rounded-full text-xs font-serif font-bold tracking-widest uppercase mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Atelier Luxury Editorial Design</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A18] tracking-tight m-0">
          {isEditing ? "Curate Property Residence" : "Curate Property Residence"}
        </h1>
        <p className="font-serif italic text-base text-[#6B7280] m-0 mt-2 max-w-xl mx-auto">
          An editorial approach for verified residences and luxury estates across Moldova.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm font-medium">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* SECTION I */}
      <div className="bg-white rounded-2xl p-8 border border-[#E8E5DF] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-4">
          <span className="font-serif text-xs font-bold tracking-widest uppercase text-amber-900">
            I. PRIMARY ATELIER METRICS
          </span>
          <span className="font-serif text-xs text-[#6B7280]">Est. Valuation & Nomenclature</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block font-serif text-sm font-bold text-[#1A1A18] mb-2">
              Estate Title *
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Architectural Masterpiece with Private Garden"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3.5 text-sm text-[#1A1A18] font-serif outline-none focus:border-[#1A1A18] transition-all"
            />
          </div>

          <div>
            <label className="block font-serif text-sm font-bold text-[#1A1A18] mb-2">
              Valuation (€) *
            </label>
            <input
              type="number"
              name="price"
              required
              placeholder="480000"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3.5 text-sm text-[#1A1A18] font-serif outline-none focus:border-[#1A1A18] transition-all"
            />
          </div>

          <div>
            <label className="block font-serif text-sm font-bold text-[#1A1A18] mb-2">
              Architectural Category *
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3.5 text-sm text-[#1A1A18] font-serif outline-none focus:border-[#1A1A18] transition-all"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-serif text-sm font-bold text-[#1A1A18] mb-2">
              Residence Designation
            </label>
            <div className="flex flex-wrap gap-2.5">
              {["For Sale", "For Rent", "New Building", "Exclusive", "Urgent"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-serif font-bold tracking-wide uppercase transition-all cursor-pointer ${
                    selectedTag === tag
                      ? "bg-[#1A1A18] text-white shadow-md"
                      : "bg-[#FAFAF8] text-slate-700 hover:bg-slate-200 border border-[#E8E5DF]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:col-span-2">
            <div>
              <label className="block font-serif text-xs font-bold text-[#1A1A18] mb-1">Rooms</label>
              <input
                type="number"
                name="rooms"
                placeholder="4"
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-3 py-3 text-sm text-[#1A1A18] font-serif outline-none focus:border-[#1A1A18]"
              />
            </div>
            <div>
              <label className="block font-serif text-xs font-bold text-[#1A1A18] mb-1">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                placeholder="3"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-3 py-3 text-sm text-[#1A1A18] font-serif outline-none focus:border-[#1A1A18]"
              />
            </div>
            <div>
              <label className="block font-serif text-xs font-bold text-[#1A1A18] mb-1">Total Area (m²)</label>
              <input
                type="number"
                name="area"
                placeholder="210"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-3 py-3 text-sm text-[#1A1A18] font-serif outline-none focus:border-[#1A1A18]"
              />
            </div>
            <div>
              <label className="block font-serif text-xs font-bold text-[#1A1A18] mb-1">Floor Elevation</label>
              <input
                type="text"
                name="floor"
                placeholder="2 / 4"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-3 py-3 text-sm text-[#1A1A18] font-serif outline-none focus:border-[#1A1A18]"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block font-serif text-sm font-bold text-[#1A1A18] mb-2">
              Editorial Narrative
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Compose an editorial overview of architectural provenance and craftsmanship..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl p-4 text-sm text-[#1A1A18] font-serif outline-none focus:border-[#1A1A18] resize-y"
            />
          </div>
        </div>
      </div>

      {/* SECTION II */}
      <div className="bg-white rounded-2xl p-8 border border-[#E8E5DF] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-4">
          <span className="font-serif text-xs font-bold tracking-widest uppercase text-amber-900">
            II. GEOGRAPHIC PROVENANCE
          </span>
          <Compass className="w-4 h-4 text-amber-900" />
        </div>

        <div>
          <label className="block font-serif text-sm font-bold text-[#1A1A18] mb-2.5">
            Chișinău District
          </label>
          <div className="flex flex-wrap gap-2.5">
            {SECTORS_CHISINAU.map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setFormData({ ...formData, city: sec })}
                className={`px-5 py-2.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer ${
                  formData.city === sec
                    ? "bg-[#1A1A18] text-white shadow-md"
                    : "bg-[#FAFAF8] text-slate-700 hover:bg-slate-200 border border-[#E8E5DF]"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-serif text-sm font-bold text-[#1A1A18] mb-2">
            Exact Street Nomenclature *
          </label>
          <input
            type="text"
            name="address"
            required
            placeholder="str. Pușkin 24, Residences"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3.5 text-sm text-[#1A1A18] font-serif outline-none focus:border-[#1A1A18]"
          />
        </div>

        <div className="h-[280px] rounded-2xl overflow-hidden border border-[#E8E5DF]">
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

      {/* SECTION III */}
      <div className="bg-white rounded-2xl p-8 border border-[#E8E5DF] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-4">
          <span className="font-serif text-xs font-bold tracking-widest uppercase text-amber-900">
            III. RESIDENTIAL APPOINTMENTS & AMENITIES
          </span>
          <Shield className="w-4 h-4 text-amber-900" />
        </div>

        {/* Indoor */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-base font-bold text-[#1A1A18] m-0">Interior Specifications</h3>
            <button type="button" onClick={() => selectAllGroup("indoor", INDOOR_AMENITIES.map(x => x.id))} className="text-xs text-amber-900 font-serif font-bold hover:underline cursor-pointer">Select All</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {INDOOR_AMENITIES.map((item) => {
              const Icon = item.icon;
              const active = selectedFeatures.indoor.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleFeature("indoor", item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-[#1A1A18] text-white shadow-sm"
                      : "bg-[#FAFAF8] text-slate-700 hover:bg-slate-200 border border-[#E8E5DF]"
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
            <h3 className="font-serif text-base font-bold text-[#1A1A18] m-0">Estate Security & Infrastructure</h3>
            <button type="button" onClick={() => selectAllGroup("building", BUILDING_FEATURES.map(x => x.id))} className="text-xs text-amber-900 font-serif font-bold hover:underline cursor-pointer">Select All</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BUILDING_FEATURES.map((item) => {
              const Icon = item.icon;
              const active = selectedFeatures.building.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleFeature("building", item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-[#1A1A18] text-white shadow-sm"
                      : "bg-[#FAFAF8] text-slate-700 hover:bg-slate-200 border border-[#E8E5DF]"
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
            <h3 className="font-serif text-base font-bold text-[#1A1A18] m-0">Surrounding Precincts</h3>
            <button type="button" onClick={() => selectAllGroup("nearby", NEARBY_INFRASTRUCTURE.map(x => x.id))} className="text-xs text-amber-900 font-serif font-bold hover:underline cursor-pointer">Select All</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {NEARBY_INFRASTRUCTURE.map((item) => {
              const Icon = item.icon;
              const active = selectedFeatures.nearby.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleFeature("nearby", item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-[#1A1A18] text-white shadow-sm"
                      : "bg-[#FAFAF8] text-slate-700 hover:bg-slate-200 border border-[#E8E5DF]"
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

      {/* SECTION IV */}
      <div className="bg-white rounded-2xl p-8 border border-[#E8E5DF] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-4">
          <span className="font-serif text-xs font-bold tracking-widest uppercase text-amber-900">
            IV. CURATED VISUAL PORTFOLIO
          </span>
          <ImageIcon className="w-4 h-4 text-amber-900" />
        </div>

        <label className="border-2 border-dashed border-[#E8E5DF] hover:border-[#1A1A18] rounded-2xl p-8 text-center cursor-pointer transition-colors bg-[#FAFAF8]">
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
          <Upload className="w-8 h-8 text-[#1A1A18] mx-auto mb-2" />
          <p className="font-serif text-sm font-bold text-[#1A1A18] m-0">Upload Estate Portfolio Photographs</p>
          <p className="font-serif italic text-xs text-slate-400 m-0 mt-1">Select architectural photography up to 10MB each</p>
        </label>

        {files.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-2">
            {files.map((file, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-[#E8E5DF] bg-slate-100 group">
                <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Bar */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8E5DF] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl border border-[#E8E5DF] text-slate-600 hover:bg-slate-100 text-sm font-serif font-bold transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-3.5 rounded-xl bg-[#1A1A18] hover:bg-black text-white text-sm font-serif font-bold tracking-wide uppercase shadow-lg transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? "Curating Listing..." : isEditing ? "Save Estate Portfolio" : "Publish to Portfolio"}
        </button>
      </div>
    </form>
  );
}
