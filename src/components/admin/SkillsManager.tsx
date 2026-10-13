import React, { useState } from 'react';
import { SkillItem } from '../../types';
import {
  createAdminResource,
  updateAdminResource,
  deleteAdminResource,
  toggleAdminResource,
} from '../../services/api';
import { Toggle } from './ui/Toggle';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Plus, Trash2, Edit2, Cpu, X } from 'lucide-react';

interface SkillsManagerProps {
  skills: SkillItem[];
  onRefresh: () => void;
}

export function SkillsManager({ skills, onRefresh }: SkillsManagerProps) {
  const [items, setItems] = useState<SkillItem[]>([...skills]);
  const [editingItem, setEditingItem] = useState<Partial<SkillItem> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SkillItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Frontend & UI',
    'Backend & DB',
    'DevOps & Cloud',
    'Performance & Architecture',
  ];

  const handleToggle = async (item: SkillItem, isActive: boolean) => {
    try {
      await toggleAdminResource('skills', item._id, isActive);
      setItems((prev) =>
        prev.map((s) => (s._id === item._id ? { ...s, isActive } : s))
      );
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to toggle skill');
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setError('');

    try {
      if (editingItem._id) {
        await updateAdminResource('skills', editingItem._id, editingItem);
      } else {
        await createAdminResource('skills', {
          ...editingItem,
          order: items.length + 1,
        });
      }
      setEditingItem(null);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save skill');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAdminResource('skills', deleteTarget._id);
      setDeleteTarget(null);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to delete skill');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d494c]/30 pb-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[var(--color-primary)]" />
            <span>Technical Skills Matrix & Tooling</span>
          </h2>
          <p className="text-xs font-mono text-[#869397] mt-1">
            Categorized technical stack competencies with proficiency ratings.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingItem({
              name: '',
              category: 'Frontend & UI',
              level: 95,
              icon: 'Code',
              isActive: true,
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="p-4 rounded-xl bg-[#201f22] border border-[#3d494c]/40 flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {item.level}%
                </span>
              </div>
              <h4 className="font-heading font-semibold text-white text-base">
                {item.name}
              </h4>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#3d494c]/30">
              <Toggle
                checked={item.isActive}
                onChange={(checked) => handleToggle(item, checked)}
                label={item.isActive ? 'Active' : 'Off'}
              />

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-1.5 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-[#bcc9cd] hover:text-white cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-1.5 rounded-lg bg-[#2a2a2c] hover:bg-red-950/40 text-[#869397] hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
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
                {editingItem._id ? 'Edit Skill' : 'Add Skill'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-[#869397] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Skill / Tool Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. Next.js 15, PostgreSQL, Redis"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Discipline Category
                </label>
                <select
                  value={editingItem.category || 'Frontend & UI'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  <span>Proficiency Level</span>
                  <span className="text-[var(--color-primary)] font-bold">{editingItem.level}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={editingItem.level || 90}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, level: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-[var(--color-primary)] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Toggle
                  checked={editingItem.isActive !== false}
                  onChange={(checked) => setEditingItem({ ...editingItem, isActive: checked })}
                  label="Display in Skills Radar"
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
                  {saving ? 'Saving...' : 'Save Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Skill"
        message={`Delete "${deleteTarget?.name}" from the technical matrix?`}
        confirmText="Delete Skill"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
