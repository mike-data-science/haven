"use client";

import React from "react";
import { Upload, MapPin, Home, DollarSign, Layout, Layers, Hash, Image as ImageIcon, X, Check, Sparkles, AlertCircle, Database, Server, Code, ChevronRight } from "lucide-react";
import { PropertyVariantProps } from "./types";

export default function Variant4StripeGrid(props: PropertyVariantProps) {
  const {
    formData, setFormData, selectedTag, setSelectedTag,
    selectedFeatures, toggleFeature, selectAllGroup, clearGroup,
    files, handleFileChange, removeFile,
    categories, SECTORS_CHISINAU,
    INDOOR_AMENITIES, BUILDING_FEATURES, HOUSE_RULES, NEARBY_INFRASTRUCTURE,
    loading, error, isEditing, handleSubmit, UniversalMap
  } = props;

  const totalSelected =
    selectedFeatures.indoor.length +
    selectedFeatures.building.length +
    selectedFeatures.rules.length +
    selectedFeatures.nearby.length;

  return (
    <div className="w-full">
      {/* SaaS Dashboard Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DF]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-bold bg-slate-900 text-white px-2.5 py-0.5 rounded uppercase tracking-wider">
              ENV: PRODUCTION
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              ID: {isEditing ? "EDT_RECORD" : "NEW_RECORD"}
            </span>
          </div>
          <h1 className="font-sans text-2xl font-extrabold text-[#1A1A18] tracking-tight m-0">
            {isEditing ? "Update Property Record" : "Create New Property Record"}
          </h1>
          <p className="font-sans text-xs text-slate-500 m-0 mt-1">
            High-density dashboard layout engineered for rapid data entry and institutional accuracy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-[#2B7FFF] hover:bg-[#1e58bd] text-white text-xs font-bold shadow transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Committing..." : "Commit Listing"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm font-medium">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Stripe Pro Layout: Left Navigation Anchor (3 cols) + Right Density Form (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Anchor Panel */}
        <div className="lg:col-span-3 lg:sticky lg:top-24 flex flex-col gap-2">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 mb-1">
            Form Navigation
          </div>
          {[
            { id: "#sec-overview", label: "01. Overview & Price", desc: "Title, pricing, tag" },
            { id: "#sec-location", label: "02. Location & Coordinates", desc: "Sector & lat/lng" },
            { id: "#sec-features", label: `03. Feature Matrix (${totalSelected})`, desc: "Amenities & rules" },
            { id: "#sec-media", label: `04. Media Repository (${files.length})`, desc: "Images & gallery" },
          ].map((nav) => (
            <a
              key={nav.id}
              href={nav.id}
              className="p-3 rounded-xl bg-white hover:bg-blue-50/50 border border-[#E8E5DF] hover:border-[#2B7FFF] transition-all no-underline group block"
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-bold text-[#1A1A18] group-hover:text-[#2B7FFF]">
                  {nav.label}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="font-sans text-[11px] text-slate-400 m-0 mt-0.5">{nav.desc}</p>
            </a>
          ))}
        </div>

        {/* Right High-Density Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-9 flex flex-col gap-8">
          {/* SEC 01: OVERVIEW */}
          <div id="sec-overview" className="bg-white rounded-2xl border border-[#E8E5DF] p-6 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E5DF]">
              <h2 className="font-sans text-base font-extrabold text-[#1A1A18] m-0">01. Overview & Price Specifications</h2>
              <span className="font-mono text-xs text-slate-400">SCHEMA: CORE_v2</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8">
                <label className="block font-sans text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. High-Yield Commercial Office Space in Rîșcani"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-lg px-3 py-2 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] font-medium"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block font-sans text-xs font-bold text-slate-700 mb-1">Price (€) *</label>
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="320000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-lg px-3 py-2 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] font-mono font-bold"
                />
              </div>

              <div className="md:col-span-6">
                <label className="block font-sans text-xs font-bold text-slate-700 mb-1">Category *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-lg px-3 py-2 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF]"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-6">
                <label className="block font-sans text-xs font-bold text-slate-700 mb-1">Listing Status Tag</label>
                <div className="flex flex-wrap gap-1.5">
                  {["For Sale", "For Rent", "New Building", "Exclusive", "Urgent"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedTag === tag
                          ? "bg-[#1A1A18] text-white"
                          : "bg-[#FAFAF8] text-slate-600 hover:bg-slate-200 border border-[#E8E5DF]"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact Specs Row */}
              <div className="md:col-span-3">
                <label className="block font-sans text-xs font-bold text-slate-700 mb-1">Rooms</label>
                <input
                  type="number"
                  name="rooms"
                  placeholder="3"
                  value={formData.rooms}
                  onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-lg px-3 py-2 text-sm font-mono"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block font-sans text-xs font-bold text-slate-700 mb-1">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  placeholder="2"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-lg px-3 py-2 text-sm font-mono"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block font-sans text-xs font-bold text-slate-700 mb-1">Area (m²)</label>
                <input
                  type="number"
                  name="area"
                  placeholder="120"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-lg px-3 py-2 text-sm font-mono"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block font-sans text-xs font-bold text-slate-700 mb-1">Floor</label>
                <input
                  type="text"
                  name="floor"
                  placeholder="3 / 5"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-lg px-3 py-2 text-sm font-mono"
                />
              </div>

              <div className="md:col-span-12">
                <label className="block font-sans text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Provide structured data and neighborhood highlights..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-lg p-3 text-sm font-medium resize-y"
                />
              </div>
            </div>
          </div>

          {/* SEC 02: LOCATION */}
          <div id="sec-location" className="bg-white rounded-2xl border border-[#E8E5DF] p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E5DF]">
              <h2 className="font-sans text-base font-extrabold text-[#1A1A18] m-0">02. Location & Coordinate Matrix</h2>
              <span className="font-mono text-xs text-slate-400">LAT/LNG ACCURACY</span>
            </div>

            <div>
              <label className="block font-sans text-xs font-bold text-slate-700 mb-1.5">Sector / District</label>
              <div className="flex flex-wrap gap-1.5">
                {SECTORS_CHISINAU.map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setFormData({ ...formData, city: sec })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      formData.city === sec
                        ? "bg-[#2B7FFF] text-white"
                        : "bg-[#FAFAF8] text-slate-600 hover:bg-slate-200 border border-[#E8E5DF]"
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-bold text-slate-700 mb-1.5">Street Address *</label>
              <input
                type="text"
                name="address"
                required
                placeholder="str. Decebal 80, ap. 15"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-lg px-3 py-2 text-sm font-medium"
              />
            </div>

            <div className="h-[280px] rounded-xl overflow-hidden border border-[#E8E5DF]">
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

          {/* SEC 03: FEATURES */}
          <div id="sec-features" className="bg-white rounded-2xl border border-[#E8E5DF] p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E5DF]">
              <h2 className="font-sans text-base font-extrabold text-[#1A1A18] m-0">03. Feature Matrix & Amenities</h2>
              <span className="font-mono text-xs text-[#2B7FFF] font-bold">{totalSelected} SELECTED</span>
            </div>

            {/* Indoor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-slate-500 uppercase">Indoor Amenities</span>
                <button type="button" onClick={() => selectAllGroup("indoor", INDOOR_AMENITIES.map(x => x.id))} className="text-xs text-[#2B7FFF] font-bold hover:underline cursor-pointer">Select All</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {INDOOR_AMENITIES.map((item) => {
                  const Icon = item.icon;
                  const active = selectedFeatures.indoor.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleFeature("indoor", item.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-[#1A1A18] text-white"
                          : "bg-[#FAFAF8] text-slate-700 hover:bg-slate-200 border border-[#E8E5DF]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Building */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-slate-500 uppercase">Building Security</span>
                <button type="button" onClick={() => selectAllGroup("building", BUILDING_FEATURES.map(x => x.id))} className="text-xs text-[#2B7FFF] font-bold hover:underline cursor-pointer">Select All</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BUILDING_FEATURES.map((item) => {
                  const Icon = item.icon;
                  const active = selectedFeatures.building.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleFeature("building", item.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-[#1A1A18] text-white"
                          : "bg-[#FAFAF8] text-slate-700 hover:bg-slate-200 border border-[#E8E5DF]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nearby */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-slate-500 uppercase">Nearby Infrastructure</span>
                <button type="button" onClick={() => selectAllGroup("nearby", NEARBY_INFRASTRUCTURE.map(x => x.id))} className="text-xs text-[#2B7FFF] font-bold hover:underline cursor-pointer">Select All</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {NEARBY_INFRASTRUCTURE.map((item) => {
                  const Icon = item.icon;
                  const active = selectedFeatures.nearby.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleFeature("nearby", item.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-[#1A1A18] text-white"
                          : "bg-[#FAFAF8] text-slate-700 hover:bg-slate-200 border border-[#E8E5DF]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SEC 04: MEDIA */}
          <div id="sec-media" className="bg-white rounded-2xl border border-[#E8E5DF] p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E5DF]">
              <h2 className="font-sans text-base font-extrabold text-[#1A1A18] m-0">04. Media Repository</h2>
              <span className="font-mono text-xs text-slate-400">MAX 10MB PER ASSET</span>
            </div>

            <label className="border-2 border-dashed border-[#E8E5DF] hover:border-[#2B7FFF] rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#FAFAF8]">
              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
              <Upload className="w-6 h-6 text-[#2B7FFF] mx-auto mb-2" />
              <p className="font-sans text-sm font-bold text-[#1A1A18] m-0">Click to upload assets</p>
              <p className="font-mono text-xs text-slate-400 m-0 mt-1">PNG, JPG, WEBP SUPPORTED</p>
            </label>

            {files.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-1">
                {files.map((file, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-[#E8E5DF] bg-slate-100 group">
                    <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center text-xs cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="bg-white rounded-2xl border border-[#E8E5DF] p-4 shadow-sm flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">READY_FOR_COMMIT</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 rounded-lg bg-[#2B7FFF] hover:bg-[#1e58bd] text-white text-xs font-bold shadow transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? "Committing..." : isEditing ? "Save Record" : "Create & Commit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
