"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Tv, Refrigerator, Shirt, Bath, Armchair, Microwave, ShowerHead, Droplets, 
  Wind, Video, Activity, Lock, ArrowUpDown, ShieldCheck, Ban, ShoppingCart, 
  Landmark, Cross, Smile, Store
} from "lucide-react";
import dynamic from "next/dynamic";
import Variant2SplitPreview from "./property-variants/Variant2SplitPreview";

const UniversalMap = dynamic(() => import("@/components/shared/UniversalMap"), { ssr: false });

interface ModernPropertyFormProps {
  categories: { id: number; name: string }[];
  initialData?: any;
}

const SECTORS_CHISINAU = [
  "Centru",
  "Botanica",
  "Buiucani",
  "Ciocana",
  "Rîșcani",
  "Telecentru"
];

const INDOOR_AMENITIES = [
  { id: "tv", label: "Televizor", icon: Tv },
  { id: "refrigerator", label: "Frigider", icon: Refrigerator },
  { id: "washer", label: "Mașină de spălat", icon: Shirt },
  { id: "toilet", label: "Toaletă", icon: Bath },
  { id: "furnished", label: "Mobilat", icon: Armchair },
  { id: "microwave", label: "Cuptor cu microunde", icon: Microwave },
  { id: "shower", label: "Cabină de duș", icon: ShowerHead },
  { id: "bidet", label: "Bideu", icon: Droplets },
  { id: "ac", label: "Aparat de aer condiționat", icon: Wind },
  { id: "video_intercom", label: "Interfon Video", icon: Video },
  { id: "dryer", label: "Uscător", icon: Wind },
];

const BUILDING_FEATURES = [
  { id: "ramp", label: "Rampă", icon: Activity },
  { id: "gated", label: "Zona închisă", icon: Lock },
  { id: "elevator", label: "Lift", icon: ArrowUpDown },
  { id: "security", label: "Securitate", icon: ShieldCheck },
];

const HOUSE_RULES = [
  { id: "no_pets", label: "Interzis cu animale", icon: Ban },
  { id: "no_smoking", label: "Fumatul interzis", icon: Ban },
];

const NEARBY_INFRASTRUCTURE = [
  { id: "shopping", label: "Shoping", icon: ShoppingCart },
  { id: "bank", label: "Bancă", icon: Landmark },
  { id: "pharmacy", label: "Farmacie", icon: Cross },
  { id: "dentist", label: "Dentist", icon: Smile },
  { id: "supermarket", label: "Supermarket", icon: Store },
];

export default function ModernPropertyForm({ categories, initialData }: ModernPropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  // Parse initial tag and features from existing description if available
  const parseInitialMeta = () => {
    let cleanDesc = initialData?.description || "";
    let tag = "For Sale";
    let features = {
      indoor: ["tv", "refrigerator", "washer", "toilet", "furnished", "ac", "shower"],
      building: ["elevator", "security", "gated"],
      rules: ["no_pets"],
      nearby: ["shopping", "supermarket", "pharmacy", "bank"],
    };

    if (cleanDesc) {
      const match = cleanDesc.match(/<!--HAVEN_META:(.*?)-->/);
      if (match && match[1]) {
        try {
          const parsed = JSON.parse(match[1]);
          if (parsed.tag) tag = parsed.tag;
          if (parsed.features) features = parsed.features;
        } catch (e) {}
        cleanDesc = cleanDesc.replace(/<!--HAVEN_META:.*?-->/, "").trim();
      }
    }
    return { cleanDesc, tag, features };
  };

  const initialMeta = parseInitialMeta();

  // Tag / Transaction status shown on detail page
  const [selectedTag, setSelectedTag] = useState(initialMeta.tag);

  // Selected features matching the exact sections on PropertyDetailPage
  const [selectedFeatures, setSelectedFeatures] = useState<{
    indoor: string[];
    building: string[];
    rules: string[];
    nearby: string[];
  }>(initialMeta.features);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialMeta.cleanDesc,
    price: initialData?.price ? String(initialData.price) : "",
    city: initialData?.city || "Centru",
    address: initialData?.address || "",
    rooms: initialData?.rooms ? String(initialData.rooms) : "",
    bathrooms: initialData?.bathrooms ? String(initialData.bathrooms) : "",
    area: initialData?.area ? String(initialData.area) : "",
    floor: initialData?.floor ? String(initialData.floor) : "",
    yearBuilt: initialData?.yearBuilt ? String(initialData.yearBuilt) : "",
    categoryId: initialData?.categoryId ? String(initialData.categoryId) : (categories[0]?.id?.toString() || ""),
    latitude: initialData?.latitude ? String(initialData.latitude) : "47.0245",
    longitude: initialData?.longitude ? String(initialData.longitude) : "28.8322",
  });

  const isEditing = Boolean(initialData?.id);

  const toggleFeature = (group: "indoor" | "building" | "rules" | "nearby", id: string) => {
    setSelectedFeatures(prev => {
      const current = prev[group];
      const exists = current.includes(id);
      const updated = exists ? current.filter(x => x !== id) : [...current, id];
      return { ...prev, [group]: updated };
    });
  };

  const selectAllGroup = (group: "indoor" | "building" | "rules" | "nearby", allIds: string[]) => {
    setSelectedFeatures(prev => ({ ...prev, [group]: allIds }));
  };

  const clearGroup = (group: "indoor" | "building" | "rules" | "nearby") => {
    setSelectedFeatures(prev => ({ ...prev, [group]: [] }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files as FileList)]);
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
      const metaObj = {
        tag: selectedTag,
        features: selectedFeatures
      };
      const finalDescription = `${formData.description.trim()}\n\n<!--HAVEN_META:${JSON.stringify(metaObj)}-->`;

      const payload = {
        ...formData,
        description: finalDescription
      };

      const endpoint = isEditing ? `/api/properties/${initialData.id}` : "/api/properties";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.details) {
          const msgs = Object.entries(data.details)
            .filter(([k]) => k !== '_errors')
            .map(([k, v]: any) => `${k.toUpperCase()}: ${v?._errors?.join(', ')}`);
          if (data.details._errors?.length) {
            msgs.push(`GENERAL: ${data.details._errors.join(', ')}`);
          }
          throw new Error(`Validation Error: ${msgs.join(' | ')}`);
        }
        throw new Error(data.error || `Failed to ${isEditing ? "update" : "create"} property`);
      }

      const savedProp = await res.json();
      const propId = savedProp.id || initialData?.id;

      if (files.length > 0 && propId) {
        const uploadData = new FormData();
        uploadData.append("propertyId", String(propId));
        files.forEach(f => uploadData.append("files", f));

        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
        if (!uploadRes.ok) {
          const uploadErrData = await uploadRes.json().catch(() => ({}));
          throw new Error(uploadErrData.error || "Failed to upload property images");
        }
      }

      router.push("/dashboard/my-properties");
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const variantProps = {
    formData,
    setFormData,
    selectedTag,
    setSelectedTag,
    selectedFeatures,
    toggleFeature,
    selectAllGroup,
    clearGroup,
    files,
    handleFileChange,
    removeFile,
    categories,
    SECTORS_CHISINAU,
    INDOOR_AMENITIES,
    BUILDING_FEATURES,
    HOUSE_RULES,
    NEARBY_INFRASTRUCTURE,
    loading,
    error,
    isEditing,
    handleSubmit,
    UniversalMap,
  };

  return (
    <div className="w-full pb-16 font-sans">
      <Variant2SplitPreview {...variantProps} />
    </div>
  );
}
