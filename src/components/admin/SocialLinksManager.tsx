import React, { useState } from 'react';
import { SocialLink } from '../../types';
import {
  createAdminResource,
  updateAdminResource,
  deleteAdminResource,
  toggleAdminResource,
  reorderAdminResource,
} from '../../services/api';
import { Toggle } from './ui/Toggle';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Plus, Trash2, Edit2, Share2, ArrowUp, ArrowDown, ExternalLink, X } from 'lucide-react';

interface SocialLinksManagerProps {
  socials: SocialLink[];
  onRefresh: () => void;
}

export function SocialLinksManager({ socials, onRefresh }: SocialLinksManagerProps) {
  const [items, setItems] = useState<SocialLink[]>([...socials].sort((a, b) => a.order - b.order));
  const [editingItem, setEditingItem] = useState<Partial<SocialLink> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SocialLink | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = async (item: SocialLink, isActive: boolean) => {
    try {
      await toggleAdminResource('socials', item._id, isActive);
      setItems((prev) =>
        prev.map((s) => (s._id === item._id ? { ...s, isActive } : s))
      );
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to toggle social link');
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setError('');

    try {
      if (editingItem._id) {
        await updateAdminResource('socials', editingItem._id, editingItem);
      } else {
        await createAdminResource('socials', {
          ...editingItem,
          order: items.length + 1,
        });
      }
      setEditingItem(null);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save social link');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAdminResource('socials', deleteTarget._id);
      setDeleteTarget(null);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to delete social link');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const payload = newItems.map((item, idx) => ({ id: item._id, order: idx + 1 }));
    setItems(newItems.map((item, idx) => ({ ...item, order: idx + 1 })));

    try {
      await reorderAdminResource('socials', payload);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to reorder social links');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d494c]/30 pb-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <Share2 className="w-6 h-6 text-[var(--color-primary)]" />
            <span>Social Network & Community Channels</span>
          </h2>
          <p className="text-xs font-mono text-[#869397] mt-1">
            Social links are stored and read strictly from the database. Reorder or toggle off at any time.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingItem({
              platform: 'GitHub',
              label: 'GitHub',
              url: 'https://github.com',
              icon: 'github',
              isActive: true,
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Link</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Socials List */}
      <div className="bg-[#201f22] rounded-2xl border border-[#3d494c]/40 overflow-hidden divide-y divide-[#3d494c]/30">
        {items.map((item, index) => (
          <div
            key={item._id}
            className="p-5 flex items-center justify-between gap-4 hover:bg-[#252427] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <button
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1 rounded bg-[#2a2a2c] hover:bg-[#353437] text-[#bcc9cd] disabled:opacity-30 cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={index === items.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1 rounded bg-[#2a2a2c] hover:bg-[#353437] text-[#bcc9cd] disabled:opacity-30 cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-semibold text-white text-base">
                    {item.label}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded">
                    {item.platform}
                  </span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-[#869397] hover:text-[var(--color-primary)] flex items-center gap-1 mt-0.5"
                >
                  <span>{item.url}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
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
            className="w-full max-w-md bg-[#1b1b1d] rounded-2xl border border-[#3d494c]/60 p-6 shadow-2xl relative space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#3d494c]/30">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingItem._id ? 'Edit Social Channel' : 'Add Social Channel'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-[#869397] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Platform Name
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.platform || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, platform: e.target.value })}
                  placeholder="e.g. GitHub, Twitter, LinkedIn"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Display Label
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.label || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                  placeholder="e.g. RUSA TECH GitHub"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Destination URL
                </label>
                <input
                  type="url"
                  required
                  value={editingItem.url || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Toggle
                  checked={editingItem.isActive !== false}
                  onChange={(checked) => setEditingItem({ ...editingItem, isActive: checked })}
                  label="Visible in Footer & Header"
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
                  {saving ? 'Saving...' : 'Save Channel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Social Channel"
        message={`Are you sure you want to remove "${deleteTarget?.label}"?`}
        confirmText="Delete Channel"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
