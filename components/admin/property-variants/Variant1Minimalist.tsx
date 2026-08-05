"use client";

import React, { useState } from "react";
import { Upload, MapPin, Home, DollarSign, Layout, Layers, Hash, Image as ImageIcon, X, Check, Sparkles, AlertCircle } from "lucide-react";
import { PropertyVariantProps } from "./types";

export default function Variant1Minimalist(props: PropertyVariantProps) {
  const {
    formData, setFormData, selectedTag, setSelectedTag,
    selectedFeatures, toggleFeature, selectAllGroup, clearGroup,
    files, handleFileChange, removeFile,
    categories, SECTORS_CHISINAU,
    INDOOR_AMENITIES, BUILDING_FEATURES, HOUSE_RULES, NEARBY_INFRASTRUCTURE,
    loading, error, isEditing, handleSubmit, UniversalMap
  } = props;

  const [activeTab, setActiveTab] = useState<"all" | "core" | "location" | "amenities" | "media">("all");

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
      {/* Elegant Header Banner */}
      <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#2B7FFF] bg-blue-50 px-3 py-1 rounded-full mb-2">
            Minimalist Studio Design
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A18] m-0">
            {isEditing ? "Edit Property Listing" : "Create New Property Listing"}
          </h1>
          <p className="font-sans text-sm text-slate-500 m-0 mt-1">
            Clean Apple-inspired layout with structured cards and intuitive pill selectors.
          </p>
        </div>

        {/* Quick Section Nav */}
        <div className="flex flex-wrap gap-1.5 bg-[#FAFAF8] p-1.5 rounded-2xl border border-[#E8E5DF]">
          {[
            { id: "all", label: "All Sections" },
            { id: "core", label: "Core Info" },
            { id: "location", label: "Location" },
            { id: "amenities", label: "Amenities" },
            { id: "media", label: "Photos" }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-[#1A1A18] shadow-sm"
                  : "text-slate-500 hover:text-[#1A1A18]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm font-medium">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* SECTION 1: CORE & PRICING */}
      {(activeTab === "all" || activeTab === "core") && (
        <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E5DF]">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1A18] m-0">1. Core Information & Pricing</h2>
              <p className="font-sans text-xs text-slate-500 m-0 mt-0.5">Title, listing tag, category, price, and primary specs</p>
            </div>
            <Home className="w-5 h-5 text-[#2B7FFF]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#1A1A18] mb-2">
                Property Title *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Penthouse de Lux cu Vedere Panoramică în Centru"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Listing Tag */}
            <div className="md:col-span-2">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#1A1A18] mb-2">
                Listing Tag
              </label>
              <div className="flex flex-wrap gap-2">
                {["For Sale", "For Rent", "New Building", "Exclusive", "Urgent"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedTag === tag
                        ? "bg-[#1A1A18] text-white shadow-sm"
                        : "bg-[#FAFAF8] text-slate-600 hover:bg-slate-200 border border-[#E8E5DF]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#1A1A18] mb-2">
                Price (€) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="245000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl pl-10 pr-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#1A1A18] mb-2">
                Category *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] focus:bg-white transition-all font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Specs Grid */}
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#1A1A18] mb-2">
                Rooms
              </label>
              <input
                type="number"
                name="rooms"
                placeholder="3"
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] focus:bg-white transition-all font-medium"
              />
            </div>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#1A1A18] mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                placeholder="2"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] focus:bg-white transition-all font-medium"
              />
            </div>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#1A1A18] mb-2">
                Total Area (m²)
              </label>
              <input
                type="number"
                name="area"
                placeholder="110"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] focus:bg-white transition-all font-medium"
              />
            </div>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#1A1A18] mb-2">
                Floor / Total Floors
              </label>
              <input
                type="text"
                name="floor"
                placeholder="4 / 10"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#1A1A18] mb-2">
                Property Description
              </label>
              <textarea
                name="description"
                rows={5}
                placeholder="Provide a compelling description of the property, neighborhood, and unique qualities..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl p-4 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] focus:bg-white transition-all font-medium resize-y"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: LOCATION & MAP */}
      {(activeTab === "all" || activeTab === "location") && (
        <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E5DF]">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1A18] m-0">2. Location & Map Position</h2>
              <p className="font-sans text-xs text-slate-500 m-0 mt-0.5">Select Chișinău sector and pin the exact street coordinates</p>
            </div>
            <MapPin className="w-5 h-5 text-[#2B7FFF]" />
          </div>

          <div className="flex flex-col gap-6">
            {/* Sector Selector */}
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#1A1A18] mb-2">
                Chișinău Sector
              </label>
              <div className="flex flex-wrap gap-2">
                {SECTORS_CHISINAU.map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setFormData({ ...formData, city: sec })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      formData.city === sec
                        ? "bg-[#2B7FFF] text-white shadow-sm"
                        : "bg-[#FAFAF8] text-slate-600 hover:bg-slate-200 border border-[#E8E5DF]"
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#1A1A18] mb-2">
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                required
                placeholder="e.g. str. Ștefan cel Mare 102, ap. 45"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#2B7FFF] focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Interactive Map Picker */}
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#1A1A18] mb-2">
                Interactive Pin (Click to position)
              </label>
              <div className="h-[320px] rounded-2xl overflow-hidden border border-[#E8E5DF]">
                <UniversalMap
                  latitude={parseFloat(formData.latitude) || 47.0245}
                  longitude={parseFloat(formData.longitude) || 28.8322}
                  interactive={true}
                  onLocationSelect={(lat: number, lng: number) => {
                    setFormData({
                      ...formData,
                      latitude: lat.toFixed(6),
                      longitude: lng.toFixed(6)
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: AMENITIES & FEATURES */}
      {(activeTab === "all" || activeTab === "amenities") && (
        <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E5DF]">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1A18] m-0">3. Amenities & Features</h2>
              <p className="font-sans text-xs text-slate-500 m-0 mt-0.5">Toggle indoor amenities, building features, rules, and nearby infrastructure</p>
            </div>
            <Sparkles className="w-5 h-5 text-[#2B7FFF]" />
          </div>

          <div className="flex flex-col gap-8">
            {/* Indoor Amenities */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-sans text-sm font-bold text-[#1A1A18] m-0">Ce e înăuntru (Indoor)</h3>
                <div className="flex gap-2 text-xs">
                  <button type="button" onClick={() => selectAllGroup("indoor", INDOOR_AMENITIES.map(x => x.id))} className="text-[#2B7FFF] hover:underline font-semibold cursor-pointer">Select All</button>
                  <span className="text-slate-300">|</span>
                  <button type="button" onClick={() => clearGroup("indoor")} className="text-slate-400 hover:text-slate-600 font-semibold cursor-pointer">Clear</button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {INDOOR_AMENITIES.map((item) => {
                  const Icon = item.icon;
                  const active = selectedFeatures.indoor.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleFeature("indoor", item.id)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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

            {/* Building Features */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-sans text-sm font-bold text-[#1A1A18] m-0">Caracteristicile clădirii</h3>
                <div className="flex gap-2 text-xs">
                  <button type="button" onClick={() => selectAllGroup("building", BUILDING_FEATURES.map(x => x.id))} className="text-[#2B7FFF] hover:underline font-semibold cursor-pointer">Select All</button>
                  <span className="text-slate-300">|</span>
                  <button type="button" onClick={() => clearGroup("building")} className="text-slate-400 hover:text-slate-600 font-semibold cursor-pointer">Clear</button>
                </div>
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
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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

            {/* House Rules */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-sans text-sm font-bold text-[#1A1A18] m-0">Regulile casei</h3>
                <div className="flex gap-2 text-xs">
                  <button type="button" onClick={() => selectAllGroup("rules", HOUSE_RULES.map(x => x.id))} className="text-[#2B7FFF] hover:underline font-semibold cursor-pointer">Select All</button>
                  <span className="text-slate-300">|</span>
                  <button type="button" onClick={() => clearGroup("rules")} className="text-slate-400 hover:text-slate-600 font-semibold cursor-pointer">Clear</button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {HOUSE_RULES.map((item) => {
                  const Icon = item.icon;
                  const active = selectedFeatures.rules.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleFeature("rules", item.id)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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

            {/* Nearby Infrastructure */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-sans text-sm font-bold text-[#1A1A18] m-0">Infrastructură în apropiere</h3>
                <div className="flex gap-2 text-xs">
                  <button type="button" onClick={() => selectAllGroup("nearby", NEARBY_INFRASTRUCTURE.map(x => x.id))} className="text-[#2B7FFF] hover:underline font-semibold cursor-pointer">Select All</button>
                  <span className="text-slate-300">|</span>
                  <button type="button" onClick={() => clearGroup("nearby")} className="text-slate-400 hover:text-slate-600 font-semibold cursor-pointer">Clear</button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {NEARBY_INFRASTRUCTURE.map((item) => {
                  const Icon = item.icon;
                  const active = selectedFeatures.nearby.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleFeature("nearby", item.id)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
        </div>
      )}

      {/* SECTION 4: PHOTOS */}
      {(activeTab === "all" || activeTab === "media") && (
        <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E5DF]">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1A18] m-0">4. Property Gallery</h2>
              <p className="font-sans text-xs text-slate-500 m-0 mt-0.5">Upload high-resolution photos of the living areas and exterior</p>
            </div>
            <ImageIcon className="w-5 h-5 text-[#2B7FFF]" />
          </div>

          <div className="flex flex-col gap-4">
            <label className="border-2 border-dashed border-[#E8E5DF] hover:border-[#2B7FFF] rounded-2xl p-8 text-center cursor-pointer transition-colors bg-[#FAFAF8] hover:bg-blue-50/30">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="w-8 h-8 text-[#2B7FFF] mx-auto mb-2" />
              <p className="font-sans text-sm font-bold text-[#1A1A18] m-0">Click to upload photos</p>
              <p className="font-sans text-xs text-slate-400 m-0 mt-1">PNG, JPG, WEBP up to 10MB each</p>
            </label>

            {files.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-2">
                {files.map((file, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-[#E8E5DF] bg-slate-100 group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
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
        </div>
      )}

      {/* Submit Bar */}
      <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl border border-[#E8E5DF] text-slate-600 hover:bg-slate-100 text-sm font-bold transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-[#0B3D91] hover:bg-[#1e58bd] text-white text-sm font-bold shadow-lg transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? "Saving Property..." : isEditing ? "Save Changes" : "Create Listing"}
        </button>
      </div>
    </form>
  );
}
