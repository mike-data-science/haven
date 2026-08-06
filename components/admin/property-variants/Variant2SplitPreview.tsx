"use client";

import React, { useState, useEffect } from "react";
import { Upload, MapPin, Home, DollarSign, Layout, Layers, Hash, Image as ImageIcon, X, Check, Sparkles, AlertCircle, Eye, BedDouble, Bath as BathIcon, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyVariantProps } from "./types";

export default function Variant2SplitPreview(props: PropertyVariantProps) {
  const {
    formData, setFormData, selectedTag, setSelectedTag,
    selectedFeatures, toggleFeature, selectAllGroup, clearGroup,
    files, handleFileChange, removeFile,
    categories, SECTORS_CHISINAU,
    INDOOR_AMENITIES, BUILDING_FEATURES, HOUSE_RULES, NEARBY_INFRASTRUCTURE,
    loading, error, isEditing, handleSubmit, UniversalMap
  } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lastAddress, setLastAddress] = useState(formData.address || "");

  useEffect(() => {
    if (!formData.address || formData.address === lastAddress) return;
    
    const timeoutId = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.address + ", Moldova")}&limit=1`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat).toFixed(6);
            const lon = parseFloat(data[0].lon).toFixed(6);
            setFormData(prev => ({
              ...prev,
              latitude: lat,
              longitude: lon
            }));
            setLastAddress(formData.address);
          }
        })
        .catch(err => console.error("Forward geocoding error:", err));
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, [formData.address, lastAddress, setFormData]);

  useEffect(() => {
    if (files.length > 0 && currentImageIndex >= files.length) {
      setCurrentImageIndex(0);
    }
  }, [files, currentImageIndex]);

  // Total count of selected amenities
  const totalAmenities =
    selectedFeatures.indoor.length +
    selectedFeatures.building.length +
    selectedFeatures.rules.length +
    selectedFeatures.nearby.length;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A18] m-0">
            {isEditing ? "Edit & Preview Listing" : "Create & Preview Listing"}
          </h1>
          <p className="font-sans text-sm text-slate-500 m-0 mt-1">
            Real-time interactive preview shows exactly how buyers will experience your listing card.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm font-medium">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: INTERACTIVE FORM (8 Cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          {/* Card 1: Essential Info */}
          <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 shadow-sm flex flex-col gap-5">
            <h2 className="font-serif text-lg font-bold text-[#1A1A18] m-0">Primary Listing Details</h2>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Property Title *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Modern Apartment with Terrace in Botanica"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#0B3D91] focus:bg-white transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Price (€) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="145000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#0B3D91] focus:bg-white transition-all font-medium"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Category *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#0B3D91] focus:bg-white transition-all font-medium"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Listing Tag
              </label>
              <div className="flex flex-wrap gap-2">
                {["For Sale", "For Rent", "New Building", "Exclusive", "Urgent"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedTag === tag
                        ? "bg-[#0B3D91] text-white shadow-sm"
                        : "bg-[#FAFAF8] text-slate-600 hover:bg-slate-200 border border-[#E8E5DF]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Rooms</label>
                <input
                  type="number"
                  name="rooms"
                  placeholder="3"
                  value={formData.rooms}
                  onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-3 py-2.5 text-sm text-[#1A1A18] outline-none focus:border-[#0B3D91] font-medium"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Baths</label>
                <input
                  type="number"
                  name="bathrooms"
                  placeholder="2"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-3 py-2.5 text-sm text-[#1A1A18] outline-none focus:border-[#0B3D91] font-medium"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Area (m²)</label>
                <input
                  type="number"
                  name="area"
                  placeholder="95"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-3 py-2.5 text-sm text-[#1A1A18] outline-none focus:border-[#0B3D91] font-medium"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Floor</label>
                <input
                  type="text"
                  name="floor"
                  placeholder="5 / 9"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-3 py-2.5 text-sm text-[#1A1A18] outline-none focus:border-[#0B3D91] font-medium"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Year Built *</label>
                <input
                  type="number"
                  name="yearBuilt"
                  required
                  placeholder="2024"
                  value={formData.yearBuilt}
                  onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-3 py-2.5 text-sm text-[#1A1A18] outline-none focus:border-[#0B3D91] font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Highlight unique advantages, sunlight, and neighborhood qualities..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl p-3.5 text-sm text-[#1A1A18] outline-none focus:border-[#0B3D91] font-medium resize-y"
              />
            </div>
          </div>

          {/* Card 2: Location & Map */}
          <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 shadow-sm flex flex-col gap-4">
            <h2 className="font-serif text-lg font-bold text-[#1A1A18] m-0">Location & Map</h2>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Chișinău Sector
              </label>
              <div className="flex flex-wrap gap-2">
                {SECTORS_CHISINAU.map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setFormData({ ...formData, city: sec })}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      formData.city === sec
                        ? "bg-[#0B3D91] text-white shadow-sm"
                        : "bg-[#FAFAF8] text-slate-600 hover:bg-slate-200 border border-[#E8E5DF]"
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                required
                placeholder="str. Alba Iulia 180, ap. 12"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#FAFAF8] border border-[#E8E5DF] rounded-xl px-4 py-3 text-sm text-[#1A1A18] outline-none focus:border-[#0B3D91] font-medium"
              />
            </div>

            <div className="h-[260px] rounded-2xl overflow-hidden border border-[#E8E5DF]">
              <UniversalMap
                latitude={parseFloat(formData.latitude) || 47.0245}
                longitude={parseFloat(formData.longitude) || 28.8322}
                mode="picker"
                onChange={(lat: number, lng: number) => {
                  setFormData({
                    ...formData,
                    latitude: lat.toFixed(6),
                    longitude: lng.toFixed(6)
                  });
                  
                  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                    .then(res => res.json())
                    .then(data => {
                      if (data && data.address) {
                        const street = data.address.road || "";
                        const houseNumber = data.address.house_number || "";
                        const city = data.address.city || data.address.town || data.address.village || "";
                        let newAddress = street;
                        if (houseNumber) newAddress += ` ${houseNumber}`;
                        if (!newAddress && city) newAddress = city;
                        
                        if (newAddress) {
                          setLastAddress(newAddress);
                          setFormData(prev => ({ ...prev, address: newAddress, latitude: lat.toFixed(6), longitude: lng.toFixed(6) }));
                        }
                      }
                    })
                    .catch(err => console.error("Reverse geocoding error:", err));
                }}
              />
            </div>
          </div>

          {/* Card 3: Amenities */}
          <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 shadow-sm flex flex-col gap-6">
            <h2 className="font-serif text-lg font-bold text-[#1A1A18] m-0">Features & Amenities</h2>

            {/* Indoor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500 m-0">Indoor Amenities</h3>
                <button type="button" onClick={() => selectAllGroup("indoor", INDOOR_AMENITIES.map(x => x.id))} className="text-xs text-[#0B3D91] font-bold hover:underline cursor-pointer">Select All</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {INDOOR_AMENITIES.map((item) => {
                  const Icon = item.icon;
                  const active = selectedFeatures.indoor.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleFeature("indoor", item.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-[#0B3D91] text-white shadow-sm"
                          : "bg-[#FAFAF8] text-slate-700 hover:bg-slate-200 border border-[#E8E5DF]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Building */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500 m-0">Building & Security</h3>
                <button type="button" onClick={() => selectAllGroup("building", BUILDING_FEATURES.map(x => x.id))} className="text-xs text-[#0B3D91] font-bold hover:underline cursor-pointer">Select All</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {BUILDING_FEATURES.map((item) => {
                  const Icon = item.icon;
                  const active = selectedFeatures.building.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleFeature("building", item.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-[#0B3D91] text-white shadow-sm"
                          : "bg-[#FAFAF8] text-slate-700 hover:bg-slate-200 border border-[#E8E5DF]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nearby */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500 m-0">Nearby Infrastructure</h3>
                <button type="button" onClick={() => selectAllGroup("nearby", NEARBY_INFRASTRUCTURE.map(x => x.id))} className="text-xs text-[#0B3D91] font-bold hover:underline cursor-pointer">Select All</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {NEARBY_INFRASTRUCTURE.map((item) => {
                  const Icon = item.icon;
                  const active = selectedFeatures.nearby.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleFeature("nearby", item.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-[#0B3D91] text-white shadow-sm"
                          : "bg-[#FAFAF8] text-slate-700 hover:bg-slate-200 border border-[#E8E5DF]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 4: Media Upload */}
          <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 shadow-sm flex flex-col gap-4">
            <h2 className="font-serif text-lg font-bold text-[#1A1A18] m-0">Property Photos</h2>
            <label className="border-2 border-dashed border-[#E8E5DF] hover:border-[#0B3D91] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-[#FAFAF8]">
              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
              <Upload className="w-7 h-7 text-[#0B3D91] mx-auto mb-2" />
              <p className="font-sans text-sm font-bold text-[#1A1A18] m-0">Click to upload photos</p>
              <p className="font-sans text-xs text-slate-400 m-0 mt-1">High resolution images recommended</p>
            </label>

            {files.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-1">
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

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
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
              {loading ? "Saving Property..." : isEditing ? "Save Changes" : "Create & Publish"}
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN: STICKY REAL-TIME PREVIEW CARD (4 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 flex flex-col gap-4">
          <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#0B3D91] font-bold text-xs uppercase tracking-wider">
                <Eye className="w-4 h-4" />
                <span>Live Buyer Preview</span>
              </div>
              <span className="text-[11px] font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-200">
                ● Live Updates
              </span>
            </div>

            {/* Preview Property Card */}
            <div className="rounded-2xl overflow-hidden border border-[#E8E5DF] bg-white shadow-md transition-all">
              {/* Image Header */}
              <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden group">
                {files.length > 0 ? (
                  <>
                    <img src={URL.createObjectURL(files[currentImageIndex])} alt={`preview ${currentImageIndex}`} className="w-full h-full object-cover transition-opacity duration-300" />
                    {files.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setCurrentImageIndex(prev => prev === 0 ? files.length - 1 : prev - 1); }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setCurrentImageIndex(prev => prev === files.length - 1 ? 0 : prev + 1); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                          {files.map((_, idx) => (
                            <span key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                    <ImageIcon className="w-10 h-10" />
                    <span className="text-xs font-semibold">No Image Uploaded</span>
                  </div>
                )}
                {/* Tag Badge */}
                <div className="absolute top-3 left-3 bg-[#1A1A18]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  {selectedTag}
                </div>
                {/* Sector Badge */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#1A1A18] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#0B3D91]" />
                  <span>{formData.city || "Centru"}</span>
                </div>

              </div>

              {/* Card Content */}
              <div className="p-4 flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-xl font-bold text-[#1A1A18]">
                    {formData.price ? `€${Number(formData.price).toLocaleString()}` : "€0"}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase">
                    {formData.categoryId ? categories.find(c => String(c.id) === String(formData.categoryId))?.name : "Residential"}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#1A1A18] leading-snug line-clamp-2 m-0">
                  {formData.title || "Untitled Property Title"}
                </h3>

                <p className="font-sans text-xs text-slate-500 m-0 truncate">
                  {formData.address || "No street address provided"}
                </p>

                {/* Specs Row */}
                <div className="flex items-center gap-4 pt-2 border-t border-[#E8E5DF] text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-1">
                    <BedDouble className="w-3.5 h-3.5 text-[#0B3D91]" />
                    <span>{formData.rooms || "0"} r.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BathIcon className="w-3.5 h-3.5 text-[#0B3D91]" />
                    <span>{formData.bathrooms || "0"} ba.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-[#0B3D91]" />
                    <span>{formData.area || "0"} m²</span>
                  </div>
                  <div className="ml-auto text-[11px] text-[#0B3D91] font-bold">
                    +{totalAmenities} features
                  </div>
                </div>
              </div>
            </div>

            {/* Helper Hint */}
            <div className="bg-[#FAFAF8] rounded-xl p-3 border border-[#E8E5DF] text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Great photos and 5+ amenities increase buyer clicks by 42%.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
