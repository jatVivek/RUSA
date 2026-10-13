import React, { useState } from 'react';
import { Theme, ThemeColors } from '../../types';
import { updateAdminResource, resetThemePreset } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { Palette, RefreshCw, Check, Sparkles, Sliders, Type } from 'lucide-react';

interface ThemeManagerProps {
  theme: Theme;
  onRefresh: () => void;
}

export function ThemeManager({ theme, onRefresh }: ThemeManagerProps) {
  const { setTheme, mode } = useTheme();
  const [formData, setFormData] = useState<Theme>({ ...theme });
  const [activeTab, setActiveTab] = useState<'dark' | 'light'>('dark');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const palettes = theme.presets || {};

  const handleApplyPreset = (presetName: string) => {
    const p = palettes[presetName];
    if (!p) return;

    const updated: Theme = {
      ...formData,
      activePreset: presetName,
      colors: {
        dark: { ...p.dark },
        light: { ...p.light },
      },
    };

    setFormData(updated);
    setTheme(updated);
  };

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    const updated: Theme = {
      ...formData,
      colors: {
        ...formData.colors,
        [activeTab]: {
          ...formData.colors[activeTab],
          [key]: value,
        },
      },
    };
    setFormData(updated);
    setTheme(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      const saved = await updateAdminResource('theme', 'singleton', formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
      setTheme(saved);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to update theme configuration');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset theme to factory default palette (Obsidian Aurora)?')) return;
    try {
      const reset = await resetThemePreset();
      setFormData(reset);
      setTheme(reset);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to reset theme');
    }
  };

  const activeColors = formData.colors?.[activeTab] || formData.colors?.dark;

  const colorKeys: Array<{ key: keyof ThemeColors; label: string }> = [
    { key: 'primary', label: 'Primary Brand / Glow' },
    { key: 'secondary', label: 'Secondary Violet' },
    { key: 'accent', label: 'Accent / Terminal Emerald' },
    { key: 'background', label: 'Background Canvas' },
    { key: 'surface', label: 'Card Surface' },
    { key: 'text', label: 'Headline Text' },
    { key: 'muted', label: 'Muted Subtext' },
    { key: 'border', label: 'Border Line' },
    { key: 'gradientStart', label: 'Gradient Start' },
    { key: 'gradientEnd', label: 'Gradient End' },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d494c]/30 pb-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <Palette className="w-6 h-6 text-[var(--color-primary)]" />
            <span>Obsidian Aurora Theme Engine</span>
          </h2>
          <p className="text-xs font-mono text-[#869397] mt-1">
            Real-time CSS variable mapper, preset palettes, typography selection, and border radiuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2a2a2c] hover:bg-[#353437] text-xs font-mono text-[#bcc9cd] border border-[#3d494c]/40 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Factory</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50"
          >
            {success ? (
              <>
                <Check className="w-4 h-4" />
                <span>Live Changes Saved</span>
              </>
            ) : (
              <span>{saving ? 'Publishing...' : 'Save & Publish Theme'}</span>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Preset Palettes */}
      <div className="bg-[#201f22] rounded-2xl p-6 border border-[#3d494c]/40 space-y-4">
        <h3 className="font-heading text-base font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
          <span>Curated Studio Palettes</span>
        </h3>
        <p className="text-xs text-[#869397]">
          Select an engineered color palette to instantly rebrand both light and dark themes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          {Object.keys(palettes).map((name) => {
            const p = palettes[name];
            const isSelected = formData.activePreset === name;

            return (
              <button
                type="button"
                key={name}
                onClick={() => handleApplyPreset(name)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                  isSelected
                    ? 'bg-[#2a2a2c] border-[var(--color-primary)] shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                    : 'bg-[#201f22] border-[#3d494c]/40 hover:border-[#869397]'
                }`}
              >
                <div>
                  <div className="font-heading font-semibold text-sm text-white">{name}</div>
                  <div className="text-[10px] font-mono text-[#869397] mt-0.5">
                    {isSelected ? 'Active Preset' : 'Click to apply'}
                  </div>
                </div>

                {/* Swatches */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div
                    className="w-4 h-4 rounded-full border border-black/30"
                    style={{ backgroundColor: p.dark.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-black/30"
                    style={{ backgroundColor: p.dark.secondary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-black/30"
                    style={{ backgroundColor: p.dark.accent }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-black/30"
                    style={{ backgroundColor: p.dark.background }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Switcher for Custom Swatches */}
      <div className="bg-[#201f22] rounded-2xl p-6 border border-[#3d494c]/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-base font-semibold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[var(--color-secondary)]" />
              <span>Granular Color Channel Tuning</span>
            </h3>
            <p className="text-xs text-[#869397] mt-0.5">
              Changes reflect instantly in the application via live CSS variables.
            </p>
          </div>

          <div className="flex rounded-xl bg-[#2a2a2c] p-1 border border-[#3d494c]/40 self-start">
            <button
              type="button"
              onClick={() => setActiveTab('dark')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'dark' ? 'bg-[#353437] text-white font-semibold' : 'text-[#869397]'
              }`}
            >
              Dark Mode (Active)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('light')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'light' ? 'bg-[#353437] text-white font-semibold' : 'text-[#869397]'
              }`}
            >
              Light Mode
            </button>
          </div>
        </div>

        {/* Color Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {colorKeys.map(({ key, label }) => {
            const val = activeColors?.[key] || '#000000';
            return (
              <div
                key={key}
                className="p-3.5 rounded-xl bg-[#2a2a2c]/60 border border-[#3d494c]/30 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-heading font-medium text-white">{label}</div>
                  <div className="text-[10px] font-mono text-[#869397] mt-0.5">{val}</div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={val}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-9 h-9 rounded-lg border border-[#3d494c]/60 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-24 px-2 py-1.5 rounded-lg bg-[#201f22] border border-[#3d494c]/40 text-xs font-mono text-white text-center"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Typography & Geometry */}
      <div className="bg-[#201f22] rounded-2xl p-6 border border-[#3d494c]/40 space-y-6">
        <h3 className="font-heading text-base font-semibold text-white flex items-center gap-2">
          <Type className="w-4 h-4 text-[#4edea3]" />
          <span>Typography & Spatial Geometry</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
              Heading Font Family
            </label>
            <input
              type="text"
              value={formData.fontHeading || 'Cabinet Grotesk'}
              onChange={(e) => setFormData({ ...formData, fontHeading: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-xs text-white font-mono focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
              Body Font Family
            </label>
            <input
              type="text"
              value={formData.fontBody || 'Inter'}
              onChange={(e) => setFormData({ ...formData, fontBody: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-xs text-white font-mono focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
              Border Radius Base
            </label>
            <input
              type="text"
              value={formData.borderRadius || '0.75rem'}
              onChange={(e) => setFormData({ ...formData, borderRadius: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-xs text-white font-mono focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
