import mongoose from 'mongoose';
import { createModel } from './store.js';

export const PRESET_PALETTES = {
  'Obsidian Aurora': {
    name: 'Obsidian Aurora',
    dark: {
      primary: '#06b6d4', // Cyan
      secondary: '#8b5cf6', // Violet
      accent: '#f43f5e', // Rose/Red
      background: '#0e0e10', // Deep obsidian
      surface: '#1c1b1d', // Midnight zinc
      text: '#e5e1e4', // High-contrast on-surface
      muted: '#869397', // Muted text
      border: '#3d494c', // Hairline border
      gradientStart: '#06b6d4',
      gradientEnd: '#8b5cf6',
    },
    light: {
      primary: '#0891b2',
      secondary: '#7c3aed',
      accent: '#e11d48',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#0f172a',
      muted: '#64748b',
      border: '#e2e8f0',
      gradientStart: '#0891b2',
      gradientEnd: '#7c3aed',
    },
  },
  'Cyber Neon': {
    name: 'Cyber Neon',
    dark: {
      primary: '#10b981', // Emerald neon
      secondary: '#06b6d4', // Cyan
      accent: '#f59e0b', // Amber
      background: '#0a0a0f',
      surface: '#13141f',
      text: '#f1f5f9',
      muted: '#94a3b8',
      border: '#1e293b',
      gradientStart: '#10b981',
      gradientEnd: '#06b6d4',
    },
    light: {
      primary: '#059669',
      secondary: '#0284c7',
      accent: '#d97706',
      background: '#f0fdf4',
      surface: '#ffffff',
      text: '#064e3b',
      muted: '#64748b',
      border: '#dcfce7',
      gradientStart: '#059669',
      gradientEnd: '#0284c7',
    },
  },
  'Hyper Minimal': {
    name: 'Hyper Minimal',
    dark: {
      primary: '#f8fafc', // Monochrome bright
      secondary: '#94a3b8', // Slate
      accent: '#38bdf8', // Sky
      background: '#09090b',
      surface: '#18181b',
      text: '#f4f4f5',
      muted: '#71717a',
      border: '#27272a',
      gradientStart: '#f8fafc',
      gradientEnd: '#94a3b8',
    },
    light: {
      primary: '#09090b',
      secondary: '#475569',
      accent: '#0284c7',
      background: '#ffffff',
      surface: '#f4f4f5',
      text: '#18181b',
      muted: '#71717a',
      border: '#e4e4e7',
      gradientStart: '#09090b',
      gradientEnd: '#475569',
    },
  },
  'Midnight Emerald': {
    name: 'Midnight Emerald',
    dark: {
      primary: '#4edea3', // Mint / emerald
      secondary: '#38bdf8', // Electric blue
      accent: '#ec4899', // Pink
      background: '#091310',
      surface: '#10221c',
      text: '#e6f4ef',
      muted: '#7aa092',
      border: '#1b3b31',
      gradientStart: '#4edea3',
      gradientEnd: '#38bdf8',
    },
    light: {
      primary: '#059669',
      secondary: '#0284c7',
      accent: '#db2777',
      background: '#f7fee7',
      surface: '#ffffff',
      text: '#064e3b',
      muted: '#4d7c0f',
      border: '#d9f99d',
      gradientStart: '#059669',
      gradientEnd: '#0284c7',
    },
  },
};

const themeSchema = new mongoose.Schema(
  {
    activePreset: { type: String, default: 'Obsidian Aurora' },
    defaultMode: { type: String, enum: ['dark', 'light'], default: 'dark' },
    fontHeading: { type: String, default: 'Space Grotesk' },
    fontBody: { type: String, default: 'Inter' },
    fontMono: { type: String, default: 'Geist' },
    borderRadius: { type: String, default: '0.5rem' },
    colors: {
      dark: {
        primary: { type: String, default: '#06b6d4' },
        secondary: { type: String, default: '#8b5cf6' },
        accent: { type: String, default: '#f43f5e' },
        background: { type: String, default: '#0e0e10' },
        surface: { type: String, default: '#1c1b1d' },
        text: { type: String, default: '#e5e1e4' },
        muted: { type: String, default: '#869397' },
        border: { type: String, default: '#3d494c' },
        gradientStart: { type: String, default: '#06b6d4' },
        gradientEnd: { type: String, default: '#8b5cf6' },
      },
      light: {
        primary: { type: String, default: '#0891b2' },
        secondary: { type: String, default: '#7c3aed' },
        accent: { type: String, default: '#e11d48' },
        background: { type: String, default: '#f8fafc' },
        surface: { type: String, default: '#ffffff' },
        text: { type: String, default: '#0f172a' },
        muted: { type: String, default: '#64748b' },
        border: { type: String, default: '#e2e8f0' },
        gradientStart: { type: String, default: '#0891b2' },
        gradientEnd: { type: String, default: '#7c3aed' },
      },
    },
    presets: { type: Object, default: PRESET_PALETTES },
  },
  { timestamps: true }
);

const MongooseTheme = mongoose.models.Theme || mongoose.model('Theme', themeSchema);
export const Theme = createModel('Theme', themeSchema, MongooseTheme);
