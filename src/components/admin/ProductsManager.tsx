import React, { useState } from 'react';
import { ProductItem } from '../../types';
import {
  createAdminResource,
  updateAdminResource,
  deleteAdminResource,
  toggleAdminResource,
  reorderAdminResource,
} from '../../services/api';
import { Toggle } from './ui/Toggle';
import { ImageUploader } from './ui/ImageUploader';
import { ConfirmDialog } from './ui/ConfirmDialog';
import {
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Layers,
  ArrowUp,
  ArrowDown,
  Check,
  X,
} from 'lucide-react';

interface ProductsManagerProps {
  products: ProductItem[];
  onRefresh: () => void;
}

export function ProductsManager({ products, onRefresh }: ProductsManagerProps) {
  const [items, setItems] = useState<ProductItem[]>([...products].sort((a, b) => a.order - b.order));
  const [editingItem, setEditingItem] = useState<Partial<ProductItem> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = async (item: ProductItem, isActive: boolean) => {
    try {
      await toggleAdminResource('products', item._id, isActive);
      setItems((prev) =>
        prev.map((p) => (p._id === item._id ? { ...p, isActive } : p))
      );
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to toggle product');
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setError('');

    try {
      if (editingItem._id) {
        await updateAdminResource('products', editingItem._id, editingItem);
      } else {
        await createAdminResource('products', {
          ...editingItem,
          order: items.length + 1,
        });
      }
      setEditingItem(null);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAdminResource('products', deleteTarget._id);
      setDeleteTarget(null);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to delete product');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const orderedPayload = newItems.map((item, idx) => ({
      id: item._id,
      order: idx + 1,
    }));

    setItems(
      newItems.map((item, idx) => ({
        ...item,
        order: idx + 1,
      }))
    );

    try {
      await reorderAdminResource('products', orderedPayload);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to reorder products');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d494c]/30 pb-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-[var(--color-primary)]" />
            <span>Built Products & Case Studies</span>
          </h2>
          <p className="text-xs font-mono text-[#869397] mt-1">
            Manage showcase applications, multi-image carousels, performance metrics, and optional external URLs.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingItem({
              title: '',
              description: '',
              images: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hQX_71e363t0WKA5wsEHXD99U5DcfthqsDvEAK30kKBzJgLSCvpoMdstHdoIo2voJ4HCoLfbORMU7dIyC61GXO-th-RNwie971yBgquKzwn4qkrRvt0vp8WtVA9xUyMpu-QCVDw530109VoDX7VbK6xK8UK1uVLQgydgZC5m-i7YA-lJ7Jtt32EWBtY_V5JEmXW3blBj1q8SvFuPyuhCjCU5N8TRN4FjH9OucatEGansE9oNrpU',
              ],
              url: '',
              tags: ['Next.js', 'PostgreSQL', 'Tailwind CSS'],
              category: 'Full-Stack SaaS Platform',
              metricHighlight: '45M+ Daily Inferences',
              metricLabel: 'Scale & Throughput',
              isActive: true,
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Products List */}
      <div className="bg-[#201f22] rounded-2xl border border-[#3d494c]/40 overflow-hidden divide-y divide-[#3d494c]/30">
        {items.map((item, index) => {
          const coverImg =
            item.images?.[0] ||
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hQX_71e363t0WKA5wsEHXD99U5DcfthqsDvEAK30kKBzJgLSCvpoMdstHdoIo2voJ4HCoLfbORMU7dIyC61GXO-th-RNwie971yBgquKzwn4qkrRvt0vp8WtVA9xUyMpu-QCVDw530109VoDX7VbK6xK8UK1uVLQgydgZC5m-i7YA-lJ7Jtt32EWBtY_V5JEmXW3blBj1q8SvFuPyuhCjCU5N8TRN4FjH9OucatEGansE9oNrpU';

          return (
            <div
              key={item._id}
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:bg-[#252427] transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Reorder handles */}
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

                {/* Thumbnail */}
                <div className="w-20 h-14 rounded-lg bg-[#2a2a2c] overflow-hidden shrink-0 border border-[#3d494c]/40">
                  <img src={coverImg} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-semibold text-white text-base">
                      {item.title}
                    </span>
                    {item.category && (
                      <span className="text-[10px] font-mono text-[var(--color-primary)] px-2 py-0.5 rounded bg-[var(--color-primary)]/10">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#869397] line-clamp-1 max-w-md">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {item.tags?.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-[#bcc9cd] bg-[#2a2a2c] px-1.5 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                    {item.url ? (
                      <span className="text-[10px] font-mono text-[#4edea3] flex items-center gap-1">
                        <ExternalLink className="w-2.5 h-2.5" />
                        URL active (Visit button visible)
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#869397]">
                        No URL (Visit button hidden)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions & Toggle */}
              <div className="flex items-center gap-4 self-end md:self-center">
                <Toggle
                  checked={item.isActive}
                  onChange={(checked) => handleToggle(item, checked)}
                  label={item.isActive ? 'Active' : 'Hidden'}
                />

                <button
                  onClick={() => setEditingItem(item)}
                  className="p-2 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-[#bcc9cd] hover:text-white transition-colors cursor-pointer"
                  title="Edit product"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-2 rounded-lg bg-[#2a2a2c] hover:bg-red-950/40 text-[#869397] hover:text-red-400 transition-colors cursor-pointer"
                  title="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit / Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div
            className="w-full max-w-2xl bg-[#1b1b1d] rounded-2xl border border-[#3d494c]/60 p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#3d494c]/30">
              <h3 className="font-heading font-bold text-xl text-white">
                {editingItem._id ? 'Edit Built Product' : 'Create Built Product'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-[#869397] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Product / App Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Category / Discipline
                </label>
                <input
                  type="text"
                  value={editingItem.category || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  placeholder="e.g. Full-Stack SaaS Platform"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                    Metric Highlight
                  </label>
                  <input
                    type="text"
                    value={editingItem.metricHighlight || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, metricHighlight: e.target.value })
                    }
                    placeholder="e.g. 45M+ Daily Inferences"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                    Metric Label
                  </label>
                  <input
                    type="text"
                    value={editingItem.metricLabel || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, metricLabel: e.target.value })
                    }
                    placeholder="e.g. Production Throughput"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  External URL (Optional - "Visit" button only renders if present)
                </label>
                <input
                  type="text"
                  value={editingItem.url || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] font-mono"
                />
              </div>

              <ImageUploader
                label="Primary Screenshot / Hero Image"
                value={editingItem.images?.[0] || ''}
                onChange={(url) =>
                  setEditingItem({
                    ...editingItem,
                    images: [url, ...(editingItem.images?.slice(1) || [])],
                  })
                }
              />

              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={editingItem.tags?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Next.js, Tailwind CSS, PostgreSQL"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Toggle
                  checked={editingItem.isActive !== false}
                  onChange={(checked) =>
                    setEditingItem({ ...editingItem, isActive: checked })
                  }
                  label="Visible on Public Portfolio"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#3d494c]/30 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#2a2a2c] hover:bg-[#353437] text-[#bcc9cd] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold hover:brightness-110 cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Persisting...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Built Product"
        message={`Are you sure you want to permanently remove "${deleteTarget?.title}"? This cannot be undone.`}
        confirmText="Delete Product"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
