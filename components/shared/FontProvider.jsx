"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const FontContext = createContext();

export function FontProvider({ children }) {
  const [fontStyle, setFontStyle] = useState("default"); // 'default' or 'modern'

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem("haven-font-style");
    if (saved) {
      setFontStyle(saved);
    }
  }, []);

  const toggleFontStyle = (style) => {
    setFontStyle(style);
    localStorage.setItem("haven-font-style", style);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (fontStyle === 'modern') {
      root.style.setProperty('--font-sans', 'var(--font-inter), sans-serif');
      root.style.setProperty('--font-heading', 'var(--font-plus-jakarta-sans), sans-serif');
      root.style.setProperty('--font-serif', 'var(--font-plus-jakarta-sans), sans-serif');
    } else if (fontStyle === 'classic') {
      root.style.setProperty('--font-sans', 'var(--font-lato), sans-serif');
      root.style.setProperty('--font-heading', 'var(--font-playfair-display), serif');
      root.style.setProperty('--font-serif', 'var(--font-playfair-display), serif');
    } else if (fontStyle === 'minimalist') {
      root.style.setProperty('--font-sans', 'var(--font-open-sans), sans-serif');
      root.style.setProperty('--font-heading', 'var(--font-montserrat), sans-serif');
      root.style.setProperty('--font-serif', 'var(--font-montserrat), sans-serif');
    } else if (fontStyle === 'elegant') {
      root.style.setProperty('--font-sans', 'var(--font-manrope), sans-serif');
      root.style.setProperty('--font-heading', 'var(--font-manrope), sans-serif');
      root.style.setProperty('--font-serif', 'var(--font-manrope), sans-serif');
    } else if (fontStyle === 'sora') {
      root.style.setProperty('--font-sans', 'var(--font-sora), sans-serif');
      root.style.setProperty('--font-heading', 'var(--font-sora), sans-serif');
      root.style.setProperty('--font-serif', 'var(--font-sora), sans-serif');
    } else if (fontStyle === 'outfit') {
      root.style.setProperty('--font-sans', 'var(--font-outfit), sans-serif');
      root.style.setProperty('--font-heading', 'var(--font-outfit), sans-serif');
      root.style.setProperty('--font-serif', 'var(--font-outfit), sans-serif');
    } else if (fontStyle === 'dm-sans') {
      root.style.setProperty('--font-sans', 'var(--font-dm-sans), sans-serif');
      root.style.setProperty('--font-heading', 'var(--font-dm-sans), sans-serif');
      root.style.setProperty('--font-serif', 'var(--font-dm-sans), sans-serif');
    } else if (fontStyle === 'urbanist') {
      root.style.setProperty('--font-sans', 'var(--font-urbanist), sans-serif');
      root.style.setProperty('--font-heading', 'var(--font-urbanist), sans-serif');
      root.style.setProperty('--font-serif', 'var(--font-urbanist), sans-serif');
    } else if (fontStyle === 'space-grotesk') {
      root.style.setProperty('--font-sans', 'var(--font-space-grotesk), sans-serif');
      root.style.setProperty('--font-heading', 'var(--font-space-grotesk), sans-serif');
      root.style.setProperty('--font-serif', 'var(--font-space-grotesk), sans-serif');
    } else {
      root.style.setProperty('--font-sans', 'var(--font-geist-sans), sans-serif');
      root.style.setProperty('--font-heading', 'var(--font-geist-sans), sans-serif');
      root.style.setProperty('--font-serif', 'var(--font-geist-sans), sans-serif');
    }
  }, [fontStyle]);

  return (
    <FontContext.Provider value={{ fontStyle, setFontStyle: toggleFontStyle }}>
      {children}
    </FontContext.Provider>
  );
}

export const useFontTheme = () => useContext(FontContext);
