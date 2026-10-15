import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeColors } from '../types';

interface ThemeContextType {
  mode: 'dark' | 'light';
  toggleMode: () => void;
  setMode: (mode: 'dark' | 'light') => void;
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  applyThemeColors: (themeData: Theme, activeMode: 'dark' | 'light') => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<'dark' | 'light'>('dark');
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    // Read persisted mode
    const saved = (localStorage.getItem('rusatech_theme_mode') || localStorage.getItem('synthetix_theme_mode')) as 'dark' | 'light' | null;
    if (saved) {
      setModeState(saved);
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const setMode = (newMode: 'dark' | 'light') => {
    setModeState(newMode);
    localStorage.setItem('rusatech_theme_mode', newMode);
    if (newMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (theme) {
      applyThemeColors(theme, newMode);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const applyThemeColors = (themeData: Theme, activeMode: 'dark' | 'light') => {
    if (!themeData?.colors) return;
    const colors: ThemeColors =
      activeMode === 'dark' ? themeData.colors.dark : themeData.colors.light;

    if (!colors) return;

    const root = document.documentElement;

    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-muted', colors.muted);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-gradient-start', colors.gradientStart);
    root.style.setProperty('--color-gradient-end', colors.gradientEnd);

    if (themeData.borderRadius) {
      root.style.setProperty('--border-radius', themeData.borderRadius);
    }
    if (themeData.fontHeading) {
      root.style.setProperty('--font-heading', `'${themeData.fontHeading}', sans-serif`);
    }
    if (themeData.fontBody) {
      root.style.setProperty('--font-body', `'${themeData.fontBody}', sans-serif`);
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeColors(newTheme, mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
        setMode,
        theme,
        setTheme,
        applyThemeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
