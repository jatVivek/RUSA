import React, { useState } from 'react';
import { ServiceItem } from '../../types';
import {
  createAdminResource,
  updateAdminResource,
  deleteAdminResource,
  toggleAdminResource,
} from '../../services/api';
import { Toggle } from './ui/Toggle';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Plus, Trash2, Edit2, Zap, X } from 'lucide-react';

interface ServicesManagerProps {
  services: ServiceItem[];
  onRefresh: () => void;
}

export function ServicesManager({ services, onRefresh }: ServicesManagerProps) {
  const [items, setItems] = useState<ServiceItem[]>([...services]);
  const [editingItem, setEditingItem] = useState<Partial<ServiceItem> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = async (item: ServiceItem, isActive: boolean) => {
    try {
      await toggleAdminResource('services', item._id, isActive);
      setItems((prev) =>
        prev.map((s) => (s._id === item._id ? { ...s, isActive } : s))
      );
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to toggle service');
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setError('');

    try {
      if (editingItem._id) {
        await updateAdminResource('services', editingItem._id, editingItem);
      } else {
        await createAdminResource('services', {
          ...editingItem,
          order: items.length + 1,
        });
      }
      setEditingItem(null);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAdminResource('services', deleteTarget._id);
      setDeleteTarget(null);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to delete service');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d494c]/30 pb-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-[var(--color-primary)]" />
            <span>Studio Services & Engineering Offerings</span>
          </h2>
          <p className="text-xs font-mono text-[#869397] mt-1">
            Core architectural disciplines, performance audits, and retainer services.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingItem({
              title: '',
              description: '',
              icon: 'Code2',
              tag: 'Full-Stack Web Dev',
              isActive: true,
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Services List */}
      <div className="bg-[#201f22] rounded-2xl border border-[#3d494c]/40 overflow-hidden divide-y divide-[#3d494c]/30">
        {items.map((item) => (
          <div
            key={item._id}
            className="p-5 flex items-center justify-between gap-4 hover:bg-[#252427] transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-semibold text-white text-base">
                  {item.title}
                </span>
                {item.tag && (
                  <span className="text-[10px] font-mono text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#869397] mt-1 max-w-xl">{item.description}</p>
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
            className="w-full max-w-md bg-[#1b1b1d] rounded-2xl border border-[#3d494c]/60 p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#3d494c]/30">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingItem._id ? 'Edit Service' : 'Add Service'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-[#869397] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Codebase Refactoring & Speed Optimization"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Tag / Discipline Badge
                </label>
                <input
                  type="text"
                  value={editingItem.tag || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value })}
                  placeholder="e.g. Sub-100ms TTFB"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Icon Identifier
                </label>
                <select
                  value={editingItem.icon || 'Code2'}
                  onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                >
                  <option value="Code2">Code2 (Full-Stack Dev)</option>
                  <option value="Layers">Layers (UI/UX Engineering)</option>
                  <option value="Database">Database (Low-Latency DB)</option>
                  <option value="Zap">Zap (Speed Optimization)</option>
                  <option value="Cpu">Cpu (Distributed Compute)</option>
                  <option value="ShieldCheck">ShieldCheck (Security & Compliance)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Toggle
                  checked={editingItem.isActive !== false}
                  onChange={(checked) => setEditingItem({ ...editingItem, isActive: checked })}
                  label="Display on Public Site"
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
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Service"
        message={`Delete "${deleteTarget?.title}" from services?`}
        confirmText="Delete Service"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
