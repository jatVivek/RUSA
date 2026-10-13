import React, { useState } from 'react';
import { BlogPost } from '../../types';
import {
  createAdminResource,
  updateAdminResource,
  deleteAdminResource,
  toggleAdminResource,
} from '../../services/api';
import { Toggle } from './ui/Toggle';
import { ImageUploader } from './ui/ImageUploader';
import { ConfirmDialog } from './ui/ConfirmDialog';
import {
  Plus,
  Trash2,
  Edit2,
  BookOpen,
  FileText,
  Clock,
  Eye,
  Check,
  X,
} from 'lucide-react';

interface BlogManagerProps {
  blogs: BlogPost[];
  onRefresh: () => void;
}

export function BlogManager({ blogs, onRefresh }: BlogManagerProps) {
  const [items, setItems] = useState<BlogPost[]>([...blogs]);
  const [editingItem, setEditingItem] = useState<Partial<BlogPost> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = async (item: BlogPost, isActive: boolean) => {
    try {
      await toggleAdminResource('blogs', item._id, isActive);
      setItems((prev) =>
        prev.map((b) => (b._id === item._id ? { ...b, isActive } : b))
      );
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to toggle paper');
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setError('');

    // Auto-generate slug if missing
    const slug =
      editingItem.slug ||
      editingItem.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    try {
      if (editingItem._id) {
        await updateAdminResource('blogs', editingItem._id, {
          ...editingItem,
          slug,
        });
      } else {
        await createAdminResource('blogs', {
          ...editingItem,
          slug,
          publishedAt: new Date().toISOString(),
          order: items.length + 1,
        });
      }
      setEditingItem(null);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save paper');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAdminResource('blogs', deleteTarget._id);
      setDeleteTarget(null);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to delete blog post');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d494c]/30 pb-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[var(--color-primary)]" />
            <span>Technical Papers & Whitepapers Manager</span>
          </h2>
          <p className="text-xs font-mono text-[#869397] mt-1">
            Author and publish peer-grade engineering research, architecture analyses, DOIs, and markdown whitepapers.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingItem({
              title: '',
              slug: '',
              excerpt: '',
              content: `# Architectural Abstract\n\nProvide the problem definition, benchmarks, and experimental telemetry.\n\n## 1. System Implementation\n\nDetail the algorithm or edge architecture.\n\n\`\`\`ts\n// Distributed lock algorithm\nasync function acquireLock(key: string) {}\n\`\`\`\n\n## 2. Empirical Results\n\nDocument median latency, memory footprint, and fault tolerance.`,
              coverImage: '',
              tags: ['Distributed Systems', 'Performance', 'Architecture'],
              status: 'published',
              readTime: '6 min read',
              doi: '10.1145/synthetix.2024.12',
              isActive: true,
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Author New Whitepaper</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Blogs Table */}
      <div className="bg-[#201f22] rounded-2xl border border-[#3d494c]/40 overflow-hidden divide-y divide-[#3d494c]/30">
        {items.map((blog) => {
          const isPublished = blog.status === 'published';

          return (
            <div
              key={blog._id}
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:bg-[#252427] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2a2a2c] flex items-center justify-center text-[var(--color-primary)] border border-[#3d494c]/40 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-semibold text-white text-base">
                      {blog.title}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        isPublished
                          ? 'bg-[#10b981]/20 text-[#4edea3] border border-[#10b981]/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#869397] line-clamp-1 max-w-lg">
                    {blog.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#869397] pt-0.5">
                    <span>slug: /{blog.slug}</span>
                    <span>•</span>
                    <span>{blog.readTime || '5 min'}</span>
                    {blog.doi && (
                      <>
                        <span>•</span>
                        <span className="text-[var(--color-primary)]">DOI: {blog.doi}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 self-end md:self-center">
                <Toggle
                  checked={blog.isActive}
                  onChange={(checked) => handleToggle(blog, checked)}
                  label={blog.isActive ? 'Active' : 'Hidden'}
                />

                <button
                  onClick={() => setEditingItem(blog)}
                  className="p-2 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-[#bcc9cd] hover:text-white transition-colors cursor-pointer"
                  title="Edit post"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDeleteTarget(blog)}
                  className="p-2 rounded-lg bg-[#2a2a2c] hover:bg-red-950/40 text-[#869397] hover:text-red-400 transition-colors cursor-pointer"
                  title="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Author / Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div
            className="w-full max-w-3xl bg-[#1b1b1d] rounded-2xl border border-[#3d494c]/60 p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#3d494c]/30">
              <h3 className="font-heading font-bold text-xl text-white">
                {editingItem._id ? 'Edit Engineering Whitepaper' : 'Author Whitepaper'}
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
                  Whitepaper Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Sub-10ms Global State Synchronization with CRDTs"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                    URL Slug (auto-generated if empty)
                  </label>
                  <input
                    type="text"
                    value={editingItem.slug || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    placeholder="sub-10ms-state-sync"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                    Digital Object Identifier (DOI)
                  </label>
                  <input
                    type="text"
                    value={editingItem.doi || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, doi: e.target.value })}
                    placeholder="10.1145/synthetix.2024.08"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                  Abstract / Executive Excerpt *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.excerpt || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Markdown Content Editor / Preview Switcher */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono uppercase text-[#bcc9cd]">
                    Full Paper Content (Markdown / Technical Report) *
                  </label>

                  <div className="flex rounded-lg bg-[#2a2a2c] p-0.5 border border-[#3d494c]/40">
                    <button
                      type="button"
                      onClick={() => setActiveTab('write')}
                      className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                        activeTab === 'write' ? 'bg-[#353437] text-white font-semibold' : 'text-[#869397]'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                        activeTab === 'preview' ? 'bg-[#353437] text-white font-semibold' : 'text-[#869397]'
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {activeTab === 'write' ? (
                  <textarea
                    rows={12}
                    required
                    value={editingItem.content || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-xs font-mono text-white leading-relaxed focus:outline-none focus:border-[var(--color-primary)]"
                  />
                ) : (
                  <div className="p-4 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 min-h-[250px] max-h-[350px] overflow-y-auto prose prose-invert text-xs leading-relaxed whitespace-pre-line text-[#bcc9cd]">
                    {editingItem.content || 'Nothing to preview yet.'}
                  </div>
                )}
              </div>

              <ImageUploader
                label="Cover Image (Optional)"
                value={editingItem.coverImage || ''}
                onChange={(url) => setEditingItem({ ...editingItem, coverImage: url })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={editingItem.status || 'published'}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        status: e.target.value as 'draft' | 'published',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                  >
                    <option value="published">Published (Visible to public)</option>
                    <option value="draft">Draft (Private admin view only)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#bcc9cd] mb-1.5">
                    Estimated Reading Time
                  </label>
                  <input
                    type="text"
                    value={editingItem.readTime || '6 min read'}
                    onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] font-mono text-xs"
                  />
                </div>
              </div>

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
                  placeholder="Distributed Systems, Performance, CRDT"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Toggle
                  checked={editingItem.isActive !== false}
                  onChange={(checked) =>
                    setEditingItem({ ...editingItem, isActive: checked })
                  }
                  label="Visible in Research Section"
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
                  {saving ? 'Publishing...' : 'Save Whitepaper'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Whitepaper"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"?`}
        confirmText="Delete Paper"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
