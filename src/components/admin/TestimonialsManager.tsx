import React, { useState } from 'react';
import { TestimonialItem } from '../../types';
import {
  createAdminResource,
  updateAdminResource,
  deleteAdminResource,
  toggleAdminResource,
} from '../../services/api';
import { Toggle } from './ui/Toggle';
import { ImageUploader } from './ui/ImageUploader';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Plus, Trash2, Edit2, Quote, X } from 'lucide-react';

interface TestimonialsManagerProps {
  testimonials: TestimonialItem[];
  onRefresh: () => void;
}

export function TestimonialsManager({
  testimonials,
  onRefresh,
}: TestimonialsManagerProps) {
  const [items, setItems] = useState<TestimonialItem[]>([...testimonials]);
  const [editingItem, setEditingItem] = useState<Partial<TestimonialItem> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TestimonialItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = async (item: TestimonialItem, isActive: boolean) => {
    try {
      await toggleAdminResource('testimonials', item._id, isActive);
      setItems((prev) =>
        prev.map((t) => (t._id === item._id ? { ...t, isActive } : t))
      );
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to toggle testimonial');
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setError('');

    try {
      if (editingItem._id) {
        await updateAdminResource('testimonials', editingItem._id, editingItem);
      } else {
        await createAdminResource('testimonials', {
          ...editingItem,
          order: items.length + 1,
        });
      }
      setEditingItem(null);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAdminResource('testimonials', deleteTarget._id);
      setDeleteTarget(null);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to delete testimonial');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d494c]/30 pb-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <Quote className="w-6 h-6 text-[var(--color-primary)]" />
            <span>Client Testimonials & Executive Endorsements</span>
          </h2>
          <p className="text-xs font-mono text-[#869397] mt-1">
            Founder quotes, verification badges, and company affiliations.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingItem({
              quote: '',
              authorName: '',
              authorRole: 'Founder & CEO',
              company: 'Venture Backed Studio',
              avatar: '',
              badgeText: 'Verified Client',
              isActive: true,
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Testimonials List */}
      <div className="bg-[#201f22] rounded-2xl border border-[#3d494c]/40 overflow-hidden divide-y divide-[#3d494c]/30">
        {items.map((item) => (
          <div
            key={item._id}
            className="p-5 flex items-center justify-between gap-4 hover:bg-[#252427] transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-semibold text-white text-base">
                  {item.authorName}
                </span>
                <span className="text-xs font-mono text-[var(--color-primary)]">
                  {item.authorRole} {item.company ? `• ${item.company}` : ''}
                </span>
              </div>
              <p className="text-xs text-[#869397] mt-1 max-w-xl italic">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Toggle
                checked={item.isActive}
                onChange={(checked) => handleToggle(item, checked)}
                label={item.isActive ? 'Active' : 'Hidden'}
              />

              <button
                onClick={() => setEditingItem(item)}
                className="p-2 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-[#bcc9cd] hover:text-white transition-colors cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setDeleteTarget(item)}
                className="p-2 rounded-lg bg-[#2a2a2c] hover:bg-red-950/40 text-[#869397] hover:text-red-400 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className="w-full max-w-lg bg-[#1b1b1d] rounded-2xl border border-[#3d494c]/60 p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#3d494c]/30">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingItem._id ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-[#869397] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                    Author Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.authorName || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, authorName: e.target.value })
                    }
                    placeholder="Elena Rostova"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                    Role & Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.authorRole || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, authorRole: e.target.value })
                    }
                    placeholder="VP of Engineering"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Company / Startup
                </label>
                <input
                  type="text"
                  value={editingItem.company || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, company: e.target.value })
                  }
                  placeholder="Apex Cloud Platforms"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.quote || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, quote: e.target.value })
                  }
                  placeholder="RUSA TECH refactored our core ingestion engine in 4 weeks..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <ImageUploader
                label="Author Avatar (Optional)"
                value={editingItem.avatar || ''}
                onChange={(url) => setEditingItem({ ...editingItem, avatar: url })}
              />

              <div className="flex items-center justify-between pt-2">
                <Toggle
                  checked={editingItem.isActive !== false}
                  onChange={(checked) => setEditingItem({ ...editingItem, isActive: checked })}
                  label="Display in Testimonials Section"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#3d494c]/30 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-[#2a2a2c] text-[#bcc9cd] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[var(--color-primary)] text-black font-semibold hover:brightness-110 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Testimonial"
        message={`Delete endorsement from "${deleteTarget?.authorName}"?`}
        confirmText="Delete Testimonial"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
