import React, { useState, useEffect } from 'react';
import { OfferBanner } from '../../types';
import {
  fetchAdminResource,
  updateAdminResource,
  createAdminResource,
  deleteAdminResource,
} from '../../services/api';
import { Toggle } from './ui/Toggle';
import { ImageUploader } from './ui/ImageUploader';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Megaphone, Save, Trash2, Check, Clock, AlertCircle } from 'lucide-react';

interface OfferBannerManagerProps {
  onRefresh: () => void;
}

export function OfferBannerManager({ onRefresh }: OfferBannerManagerProps) {
  const [banner, setBanner] = useState<OfferBanner | null>(null);
  const [formData, setFormData] = useState<Partial<OfferBanner>>({
    text: '⚡ Q3 Architecture Sprint: 2 Spots Remaining for Low-Latency Performance Audits',
    buttonText: 'Claim Sprint Slot',
    buttonUrl: '#audit-booking',
    image: '',
    startsAt: '',
    endsAt: '',
    isActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [error, setError] = useState('');

  const loadBanner = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminResource<OfferBanner>('offer/current');
      if (res) {
        setBanner(res);
        setFormData({
          ...res,
          startsAt: res.startsAt ? res.startsAt.substring(0, 10) : '',
          endsAt: res.endsAt ? res.endsAt.substring(0, 10) : '',
        });
      }
    } catch {
      // none exist yet
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanner();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (banner?._id) {
        const updated = await updateAdminResource('offer', banner._id, formData);
        setBanner(updated);
      } else {
        const created = await createAdminResource('offer', formData);
        setBanner(created);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save offer banner');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!banner?._id) return;
    try {
      await deleteAdminResource('offer', banner._id);
      setBanner(null);
      setFormData({
        text: '',
        buttonText: '',
        buttonUrl: '',
        image: '',
        startsAt: '',
        endsAt: '',
        isActive: false,
      });
      setDeleteConfirm(false);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to remove banner');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d494c]/30 pb-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-[var(--color-primary)]" />
            <span>Announcement & Limited Offer Banner</span>
          </h2>
          <p className="text-xs font-mono text-[#869397] mt-1">
            Top-bar announcement banner. If inactive, expired, or deleted, the public endpoint returns null and nothing renders on the public site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {banner && (
            <button
              onClick={() => setDeleteConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-300 text-xs font-mono border border-red-500/30 cursor-pointer transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete to Hide</span>
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50"
          >
            {success ? (
              <>
                <Check className="w-4 h-4" />
                <span>Banner Published</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{saving ? 'Publishing...' : 'Save Banner'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Banner Rule Notice */}
      <div className="p-4 rounded-xl bg-[#2a2a2c]/60 border border-[#3d494c]/40 text-xs font-mono text-[#bcc9cd] flex items-start gap-3">
        <Clock className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
        <div>
          <span className="text-white font-semibold">Strict Visibility Guard:</span> The public API endpoint (<code className="text-[var(--color-primary)]">GET /api/public/offer</code>) strictly evaluates active status and UTC start/end timestamps. When invalid or inactive, it emits a 204 No Content so the frontend cleanly consumes zero vertical space.
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-[#201f22] rounded-2xl p-6 border border-[#3d494c]/40 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#3d494c]/30">
            <span className="font-heading font-semibold text-white text-base">Banner Status</span>
            <Toggle
              checked={formData.isActive !== false}
              onChange={(checked) => setFormData({ ...formData, isActive: checked })}
              label={formData.isActive ? 'Active & Displaying' : 'Deactivated (Hidden)'}
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
              Banner Text Content *
            </label>
            <input
              type="text"
              required
              value={formData.text || ''}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="e.g. ⚡ Q3 Architecture Sprint: 2 Spots Remaining"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Action Button Text (Optional)
              </label>
              <input
                type="text"
                value={formData.buttonText || ''}
                onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                placeholder="Claim Slot"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Action Button URL
              </label>
              <input
                type="text"
                value={formData.buttonUrl || ''}
                onChange={(e) => setFormData({ ...formData, buttonUrl: e.target.value })}
                placeholder="#audit-booking"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Active From Date (Optional)
              </label>
              <input
                type="date"
                value={formData.startsAt || ''}
                onChange={(e) => setFormData({ ...formData, startsAt: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                Expires Date (Optional)
              </label>
              <input
                type="date"
                value={formData.endsAt || ''}
                onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] font-mono text-xs"
              />
            </div>
          </div>

          <ImageUploader
            label="Banner Icon / Pill Graphic (Optional)"
            value={formData.image || ''}
            onChange={(url) => setFormData({ ...formData, image: url })}
          />
        </div>
      </form>

      <ConfirmDialog
        isOpen={deleteConfirm}
        title="Delete Announcement Banner"
        message="Deleting the banner clears its database document. The public endpoint will immediately return 204 No Content."
        confirmText="Confirm Deletion"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(false)}
      />
    </div>
  );
}
