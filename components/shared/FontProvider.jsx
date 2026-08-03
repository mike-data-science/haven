"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const FontContext = createContext();

export function FontProvider({ children }) {
  const [fontStyle, setFontStyle] = useState("urbanist"); // 'modern', 'minimalist', 'elegant', etc.
  const [pillWidth, setPillWidth] = useState("1400px"); // '1400px', '1240px', '1180px'

  useEffect(() => {
    // Migrate to default Urbanist and 1400px on first load
    const migrated = localStorage.getItem("haven-default-urbanist-v1");
    if (!migrated) {
      localStorage.setItem("haven-default-urbanist-v1", "true");
      localStorage.setItem("haven-font-style", "urbanist");
      localStorage.setItem("haven-pill-width", "1400px");
      setFontStyle("urbanist");
      setPillWidth("1400px");
    } else {
      const saved = localStorage.getItem("haven-font-style");
      if (saved) setFontStyle(saved);
      const savedWidth = localStorage.getItem("haven-pill-width");
      if (savedWidth) setPillWidth(savedWidth);
    }
  }, []);

  const toggleFontStyle = (style) => {
    setFontStyle(style);
    localStorage.setItem("haven-font-style", style);
  };

  const togglePillWidth = (width) => {
    setPillWidth(width);
    localStorage.setItem("haven-pill-width", width);
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
    <FontContext.Provider value={{ fontStyle, setFontStyle: toggleFontStyle, pillWidth, setPillWidth: togglePillWidth }}>
      {children}
    </FontContext.Provider>
  );
}

export const useFontTheme = () => useContext(FontContext);
