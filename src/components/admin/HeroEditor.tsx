import React, { useState } from 'react';
import { HeroContent } from '../../types';
import { updateAdminResource } from '../../services/api';
import { ImageUploader } from './ui/ImageUploader';
import { Toggle } from './ui/Toggle';
import { Save, Check, Sparkles, Terminal } from 'lucide-react';

interface HeroEditorProps {
  hero: HeroContent | null;
  onRefresh: () => void;
}

export function HeroEditor({ hero, onRefresh }: HeroEditorProps) {
  const [formData, setFormData] = useState<HeroContent>({
    badge: hero?.badge || 'Full-Stack Web Engineering & UI/UX Studio',
    badgeStatus: hero?.badgeStatus || 'Q3 ACTIVE',
    headline: hero?.headline || 'We Build High-Performance Web Applications That Scale Your Business',
    highlightText: hero?.highlightText || 'High-Performance Web Applications',
    subheadline:
      hero?.subheadline ||
      'Synthetix is a premier full-stack web engineering and UI/UX studio. We design, architect, and ship production-grade SaaS platforms, bespoke e-commerce engines, and high-conversion digital experiences.',
    primaryCtaText: hero?.primaryCtaText || 'Schedule Scoping Call',
    primaryCtaUrl: hero?.primaryCtaUrl || '#audit-booking',
    secondaryCtaText: hero?.secondaryCtaText || 'Explore Shipped Work',
    secondaryCtaUrl: hero?.secondaryCtaUrl || '#featured-projects',
    metrics: hero?.metrics || [
      { value: '45M+', label: 'Daily Inferences Handled' },
      { value: '14ms', label: 'Median P95 TTFB' },
      { value: '99.99%', label: 'Production Uptime' },
    ],
    previewAppTitle: hero?.previewAppTitle || 'Aetheria Studio OS',
    previewAppSubtitle: hero?.previewAppSubtitle || 'Production Web App Canvas',
    previewAppUrl: hero?.previewAppUrl || '#featured-projects',
    previewAppImage:
      hero?.previewAppImage ||
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hQX_71e363t0WKA5wsEHXD99U5DcfthqsDvEAK30kKBzJgLSCvpoMdstHdoIo2voJ4HCoLfbORMU7dIyC61GXO-th-RNwie971yBgquKzwn4qkrRvt0vp8WtVA9xUyMpu-QCVDw530109VoDX7VbK6xK8UK1uVLQgydgZC5m-i7YA-lJ7Jtt32EWBtY_V5JEmXW3blBj1q8SvFuPyuhCjCU5N8TRN4FjH9OucatEGansE9oNrpU',
    isActive: hero?.isActive !== false,
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await updateAdminResource('hero', hero?._id || 'singleton', formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to update hero section');
    } finally {
      setSaving(false);
    }
  };

  const handleMetricChange = (index: number, key: 'value' | 'label', val: string) => {
    const updated = [...formData.metrics];
    updated[index] = { ...updated[index], [key]: val };
    setFormData({ ...formData, metrics: updated });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d494c]/30 pb-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[var(--color-primary)]" />
            <span>Hero Section Editor</span>
          </h2>
          <p className="text-xs font-mono text-[#869397] mt-1">
            Customize main value proposition, badge status, gradient headline highlights, and action triggers.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50"
        >
          {success ? (
            <>
              <Check className="w-4 h-4" />
              <span>Saved Successfully</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Hero Section'}</span>
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
        <div className="bg-[#201f22] rounded-2xl p-6 border border-[#3d494c]/40 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#3d494c]/30">
            <span className="font-heading font-semibold text-white text-base">Section Status</span>
            <Toggle
              checked={formData.isActive}
              onChange={(checked) => setFormData({ ...formData, isActive: checked })}
              label={formData.isActive ? 'Active on Public Site' : 'Hidden'}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Telemetry Status Badge
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Badge Status Tag
              </label>
              <input
                type="text"
                value={formData.badgeStatus}
                onChange={(e) => setFormData({ ...formData, badgeStatus: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
              Hero Gradient Highlight Text
            </label>
            <input
              type="text"
              value={formData.highlightText}
              onChange={(e) => setFormData({ ...formData, highlightText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
              Subheadline / Studio Mission
            </label>
            <textarea
              rows={3}
              value={formData.subheadline}
              onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                value={formData.primaryCtaText}
                onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Primary CTA Target URL
              </label>
              <input
                type="text"
                value={formData.primaryCtaUrl}
                onChange={(e) => setFormData({ ...formData, primaryCtaUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] font-mono"
              />
            </div>
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div className="bg-[#201f22] rounded-2xl p-6 border border-[#3d494c]/40 space-y-4">
          <h3 className="font-heading text-base font-semibold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#4edea3]" />
            <span>High-Impact Metrics Ticker</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {formData.metrics?.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/30 space-y-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#869397] mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={m.value}
                    onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#201f22] border border-[#3d494c]/40 text-sm font-mono text-[var(--color-primary)] font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#869397] mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={m.label}
                    onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#201f22] border border-[#3d494c]/40 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview App Showcase Image */}
        <div className="bg-[#201f22] rounded-2xl p-6 border border-[#3d494c]/40 space-y-6">
          <h3 className="font-heading text-base font-semibold text-white">
            Hero Right-Side Web App Showcase
          </h3>

          <ImageUploader
            label="Showcase Screen Asset"
            value={formData.previewAppImage}
            onChange={(url) => setFormData({ ...formData, previewAppImage: url })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Showcase App Title
              </label>
              <input
                type="text"
                value={formData.previewAppTitle}
                onChange={(e) => setFormData({ ...formData, previewAppTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Showcase Subtitle
              </label>
              <input
                type="text"
                value={formData.previewAppSubtitle}
                onChange={(e) => setFormData({ ...formData, previewAppSubtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
