"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  themeColor: string;
  setThemeColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialColor,
}: {
  children: React.ReactNode;
  initialColor: string;
}) {
  const [themeColor, setThemeColor] = useState(initialColor);

  useEffect(() => {
    // Apply the theme color as a CSS variable to the root element for global scope
    document.documentElement.style.setProperty("--theme-accent", themeColor);
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
