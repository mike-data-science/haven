import React from "react";

export interface PropertyVariantProps {
  formData: {
    title: string;
    description: string;
    price: string;
    city: string;
    address: string;
    rooms: string;
    bathrooms: string;
    area: string;
    floor: string;
    yearBuilt: string;
    categoryId: string;
    latitude: string;
    longitude: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  selectedFeatures: {
    indoor: string[];
    building: string[];
    rules: string[];
    nearby: string[];
  };
  toggleFeature: (group: "indoor" | "building" | "rules" | "nearby", id: string) => void;
  selectAllGroup: (group: "indoor" | "building" | "rules" | "nearby", allIds: string[]) => void;
  clearGroup: (group: "indoor" | "building" | "rules" | "nearby") => void;
  files: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  categories: { id: number; name: string }[];
  SECTORS_CHISINAU: string[];
  INDOOR_AMENITIES: Array<{ id: string; label: string; icon: any }>;
  BUILDING_FEATURES: Array<{ id: string; label: string; icon: any }>;
  HOUSE_RULES: Array<{ id: string; label: string; icon: any }>;
  NEARBY_INFRASTRUCTURE: Array<{ id: string; label: string; icon: any }>;
  loading: boolean;
  error: string;
  isEditing: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  UniversalMap: any;
}
