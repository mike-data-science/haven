"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const FontContext = createContext();

export function FontProvider({ children }) {
  const [fontStyle, setFontStyle] = useState("minimalist");
  const [pillWidth, setPillWidth] = useState("1240px");
  const [themeColor, setThemeColor] = useState("light-gradient");
  const [cardStyle, setCardStyle] = useState("variant3");
  const [propertyTypeStyle, setPropertyTypeStyle] = useState("photo");
  const [promoStyle, setPromoStyle] = useState("full");

  useEffect(() => {
    // Migrate to default settings on first load
    const migrated = localStorage.getItem("haven-default-v3");
    if (!migrated) {
      localStorage.setItem("haven-default-v3", "true");
      localStorage.setItem("haven-font-style", "minimalist");
      localStorage.setItem("haven-pill-width", "1240px");
      localStorage.setItem("haven-theme-color", "light-gradient");
      localStorage.setItem("haven-card-style", "variant3");
      localStorage.setItem("haven-property-style", "photo");
      localStorage.setItem("haven-promo-style", "full");
      setFontStyle("minimalist");
      setPillWidth("1240px");
      setThemeColor("light-gradient");
      setCardStyle("variant3");
      setPropertyTypeStyle("photo");
      setPromoStyle("full");
    } else {
      const saved = localStorage.getItem("haven-font-style");
      if (saved) setFontStyle(saved);
      const savedWidth = localStorage.getItem("haven-pill-width");
      if (savedWidth) setPillWidth(savedWidth);
      const savedColor = localStorage.getItem("haven-theme-color");
      if (savedColor) setThemeColor(savedColor);
      const savedCardStyle = localStorage.getItem("haven-card-style");
      if (savedCardStyle) setCardStyle(savedCardStyle);
      const savedPropertyStyle = localStorage.getItem("haven-property-style");
      if (savedPropertyStyle) setPropertyTypeStyle(savedPropertyStyle);
      const savedPromoStyle = localStorage.getItem("haven-promo-style");
      if (savedPromoStyle) setPromoStyle(savedPromoStyle);
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

  const toggleThemeColor = (color) => {
    setThemeColor(color);
    localStorage.setItem("haven-theme-color", color);
  };

  const toggleCardStyle = (style) => {
    setCardStyle(style);
    localStorage.setItem("haven-card-style", style);
  };

  const togglePropertyTypeStyle = (style) => {
    setPropertyTypeStyle(style);
    localStorage.setItem("haven-property-style", style);
  };

  const togglePromoStyle = (style) => {
    setPromoStyle(style);
    localStorage.setItem("haven-promo-style", style);
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
    <FontContext.Provider value={{ fontStyle, setFontStyle: toggleFontStyle, pillWidth, setPillWidth: togglePillWidth, themeColor, setThemeColor: toggleThemeColor, cardStyle, setCardStyle: toggleCardStyle, propertyTypeStyle, setPropertyTypeStyle: togglePropertyTypeStyle, promoStyle, setPromoStyle: togglePromoStyle }}>
      {children}
    </FontContext.Provider>
  );
}

export const useFontTheme = () => useContext(FontContext);
