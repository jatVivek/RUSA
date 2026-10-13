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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <ImageUploader
              label="Logo Light Mode"
              value={formData.logoLight}
              onChange={(url) => setFormData({ ...formData, logoLight: url })}
            />
            <ImageUploader
              label="Logo Dark Mode"
              value={formData.logoDark}
              onChange={(url) => setFormData({ ...formData, logoDark: url })}
            />
          </div>

          <div className="pt-2">
            <ImageUploader
              label="Favicon URL"
              value={formData.favicon}
              onChange={(url) => setFormData({ ...formData, favicon: url })}
            />
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
