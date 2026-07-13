"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { updateThemeColor } from "./actions";

const PRESET_COLORS = [
  { name: "Blue", value: "#2563eb" },
  { name: "Orange", value: "#f97316" },
  { name: "Emerald", value: "#10b981" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Slate", value: "#64748b" },
];

export default function SettingsClient({ initialColor, userId }: { initialColor: string, userId: number }) {
  const { themeColor, setThemeColor } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const [customColor, setCustomColor] = useState(
    PRESET_COLORS.some(c => c.value === initialColor) ? "" : initialColor
  );

  const handleColorChange = async (color: string) => {
    setThemeColor(color);
    setIsSaving(true);
    try {
      await updateThemeColor(color);
    } catch (error) {
      console.error("Failed to save theme color", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-[9px] mb-[14px]">
        {PRESET_COLORS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => {
              setCustomColor("");
              handleColorChange(preset.value);
            }}
            className={`w-[27px] h-[27px] rounded-full border-4 transition-all ${
              themeColor === preset.value && !customColor
                ? "border-slate-800 scale-110"
                : "border-transparent hover:scale-105"
            }`}
            style={{ backgroundColor: preset.value }}
            title={preset.name}
          />
        ))}
        
        {/* Custom Color Picker */}
        <div className="relative flex items-center">
          <input
            type="color"
            value={customColor || themeColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              handleColorChange(e.target.value);
            }}
            className={`w-[27px] h-[27px] p-[0px] border-0 rounded-full cursor-pointer overflow-hidden transition-all ${
              customColor ? "ring-4 ring-slate-800 scale-110" : ""
            }`}
            title="Custom Color"
          />
          <span className="ml-[7px] text-xs text-slate-500 font-medium">Custom Hex</span>
        </div>
      </div>
      
      {isSaving && <p className="text-xs text-slate-400">Saving preference...</p>}
      {!isSaving && <p className="text-xs text-green-600 opacity-0 transition-opacity" style={{ opacity: themeColor !== initialColor ? 1 : 0 }}>Preference saved.</p>}
    </div>
  );
}
