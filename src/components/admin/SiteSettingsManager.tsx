import React, { useState } from 'react';
import { SiteSettings } from '../../types';
import { updateAdminResource } from '../../services/api';
import { ImageUploader } from './ui/ImageUploader';
import { Save, Check, Globe, Mail, Phone, MapPin, Share2 } from 'lucide-react';

interface SiteSettingsManagerProps {
  settings: SiteSettings;
  onRefresh: () => void;
}

export function SiteSettingsManager({ settings, onRefresh }: SiteSettingsManagerProps) {
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (settings) {
      setFormData({ ...settings });
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await updateAdminResource('settings', 'singleton', formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to update site settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d494c]/30 pb-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Site Settings & Global Branding</h2>
          <p className="text-xs font-mono text-[#869397] mt-1">
            Configure site metadata, brand logos, favicon, contact details, and SEO OpenGraph tags.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>Saved Successfully</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{saving ? 'Persisting...' : 'Save Site Settings'}</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Core Identity */}
        <div className="bg-[#201f22] rounded-2xl p-6 border border-[#3d494c]/40 space-y-6">
          <h3 className="font-heading text-base font-semibold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-[var(--color-primary)]" />
            <span>Brand Identity & Headlines</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Site Title
              </label>
              <input
                type="text"
                value={formData.siteTitle}
                onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Logo Management */}
          <div className="space-y-4 pt-2 border-t border-[#3d494c]/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono uppercase text-[#bcc9cd] font-semibold">
                Brand Emblem & Vector Logos
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const primary = formData.logoDark || formData.logoLight || '/logo-dark.svg';
                    setFormData({
                      ...formData,
                      logoDark: primary,
                      logoLight: primary,
                      favicon: formData.favicon || primary,
                    });
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-[11px] font-mono text-[var(--color-primary)] border border-[var(--color-primary)]/30 transition-colors cursor-pointer"
                  title="Make dark and light modes use the same primary logo"
                >
                  Sync to Both Modes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      logoDark: '/logo-dark.svg',
                      logoLight: '/logo-light.svg',
                      favicon: '/favicon.svg',
                    });
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-[11px] font-mono text-[#869397] hover:text-white border border-[#3d494c]/40 transition-colors cursor-pointer"
                  title="Reset to default high-resolution RUSA TECH vector emblems"
                >
                  Reset Default Vectors
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <ImageUploader
                  label="Logo Light Mode (for light theme)"
                  value={formData.logoLight}
                  placeholder="/logo-light.svg or https://..."
                  onChange={(url) => {
                    setFormData((prev) => ({
                      ...prev,
                      logoLight: url,
                      // If dark mode is empty or broken, auto-sync so the site immediately displays it!
                      logoDark: !prev.logoDark || prev.logoDark.includes('googleusercontent.com') ? url : prev.logoDark,
                    }));
                  }}
                />
              </div>

              <div className="space-y-2">
                <ImageUploader
                  label="Logo Dark Mode (for dark theme & navbar)"
                  value={formData.logoDark}
                  placeholder="/logo-dark.svg or https://..."
                  onChange={(url) => {
                    setFormData((prev) => ({
                      ...prev,
                      logoDark: url,
                      // If light mode is empty or broken, auto-sync
                      logoLight: !prev.logoLight || prev.logoLight.includes('googleusercontent.com') ? url : prev.logoLight,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="pt-2">
              <ImageUploader
                label="Favicon URL (Browser Tab Icon)"
                value={formData.favicon}
                placeholder="/favicon.svg or https://..."
                onChange={(url) => setFormData({ ...formData, favicon: url })}
              />
            </div>

            {/* Live Logo Previews */}
            <div className="pt-3 border-t border-[#3d494c]/30">
              <span className="block text-[11px] font-mono uppercase text-[#869397] mb-2.5">
                Live Rendering Previews
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dark Preview */}
                <div className="p-4 rounded-xl bg-[#131315] border border-[#2a2a2c] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={formData.logoDark || formData.logoLight || '/logo-dark.svg'}
                      alt="Dark Mode Preview"
                      className="h-8 w-auto max-w-[100px] object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/logo-dark.svg';
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="font-heading text-sm font-bold text-white">
                        {formData.siteTitle || 'RUSA TECH'}
                      </span>
                      <span className="font-mono text-[9px] text-[#869397]">Dark Navbar</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    Dark Live
                  </span>
                </div>

                {/* Light Preview */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={formData.logoLight || formData.logoDark || '/logo-light.svg'}
                      alt="Light Mode Preview"
                      className="h-8 w-auto max-w-[100px] object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/logo-light.svg';
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="font-heading text-sm font-bold text-slate-900">
                        {formData.siteTitle || 'RUSA TECH'}
                      </span>
                      <span className="font-mono text-[9px] text-slate-500">Light Navbar</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                    Light Live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO & Social Sharing */}
        <div className="bg-[#201f22] rounded-2xl p-6 border border-[#3d494c]/40 space-y-6">
          <h3 className="font-heading text-base font-semibold text-white flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[var(--color-secondary)]" />
            <span>SEO & OpenGraph Social Previews</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                SEO Meta Description
              </label>
              <input
                type="text"
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          <ImageUploader
            label="OpenGraph Share Banner (og:image)"
            value={formData.ogImage}
            onChange={(url) => setFormData({ ...formData, ogImage: url })}
          />
        </div>

        {/* Contact & Footer */}
        <div className="bg-[#201f22] rounded-2xl p-6 border border-[#3d494c]/40 space-y-6">
          <h3 className="font-heading text-base font-semibold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#4edea3]" />
            <span>Contact Information & Footer Legal</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Contact Email
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Studio Address / Base
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
              Footer Text / Copyright Statement
            </label>
            <input
              type="text"
              value={formData.footerText}
              onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
