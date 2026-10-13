import React, { useState } from 'react';
import { AboutContent } from '../../types';
import { updateAdminResource } from '../../services/api';
import { ImageUploader } from './ui/ImageUploader';
import { Toggle } from './ui/Toggle';
import { Save, Check, UserCheck, Plus, Trash2 } from 'lucide-react';

interface AboutEditorProps {
  about: AboutContent | null;
  onRefresh: () => void;
}

export function AboutEditor({ about, onRefresh }: AboutEditorProps) {
  const [formData, setFormData] = useState<AboutContent>({
    title: about?.title || 'About Synthetix Studio',
    headline:
      about?.headline ||
      'Obsessive attention to web speed, elegant ergonomics, and enterprise-grade durability.',
    bio:
      about?.bio ||
      `Synthetix Studio was founded on a singular premise: modern web applications should not only look visually striking, they must execute with ruthless precision, sub-100ms response times, and resilient fault-tolerance.\n\nWe collaborate directly with founders, CTOs, and product directors to design and deploy complex web software—translating ambition into market-dominating production reality.`,
    avatar:
      about?.avatar ||
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRB5o4N_T0B9Z-81nS1_e0T7l9xHqYj8BfD0sW21aX-9xJ7Y7Kz0P4sZt2vD7z8lQ=s400',
    stats: about?.stats || [
      { label: 'Client Revenue Influenced', value: '$120M+' },
      { label: 'Production Uptime Delivered', value: '99.99%' },
      { label: 'Median Global P95 TTFB', value: '14ms' },
    ],
    isActive: about?.isActive !== false,
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await updateAdminResource('about', about?._id || 'singleton', formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to update about section');
    } finally {
      setSaving(false);
    }
  };

  const handleAddStat = () => {
    setFormData({
      ...formData,
      stats: [...formData.stats, { label: 'New Metric', value: '100%' }],
    });
  };

  const handleRemoveStat = (index: number) => {
    setFormData({
      ...formData,
      stats: formData.stats.filter((_, i) => i !== index),
    });
  };

  const handleStatChange = (index: number, key: 'label' | 'value', val: string) => {
    const updated = [...formData.stats];
    updated[index] = { ...updated[index], [key]: val };
    setFormData({ ...formData, stats: updated });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d494c]/30 pb-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-[var(--color-primary)]" />
            <span>About Studio & Principal Architect</span>
          </h2>
          <p className="text-xs font-mono text-[#869397] mt-1">
            Edit studio architectural philosophy, biography, portrait avatar, and quantifiable achievements.
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
              <span>{saving ? 'Saving...' : 'Save About Section'}</span>
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

          <div>
            <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
              Architectural Headline
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
              Studio Biography / Philosophy (Markdown supported)
            </label>
            <textarea
              rows={6}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] font-mono text-xs leading-relaxed"
            />
          </div>

          <ImageUploader
            label="Principal Architect Avatar / Studio Portrait"
            value={formData.avatar}
            onChange={(url) => setFormData({ ...formData, avatar: url })}
          />
        </div>

        {/* Quantifiable Stats */}
        <div className="bg-[#201f22] rounded-2xl p-6 border border-[#3d494c]/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-base font-semibold text-white">
              Studio Track Record & Stats Cards
            </h3>
            <button
              type="button"
              onClick={handleAddStat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-xs font-mono text-[var(--color-primary)] border border-[#3d494c]/40 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {formData.stats?.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 space-y-3 relative group"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveStat(idx)}
                  className="absolute top-2 right-2 p-1 text-[#869397] hover:text-red-400 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                  title="Delete stat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#869397] mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#201f22] border border-[#3d494c]/40 text-sm font-mono text-[var(--color-primary)] font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#869397] mb-1">
                    Metric Label
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#201f22] border border-[#3d494c]/40 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
