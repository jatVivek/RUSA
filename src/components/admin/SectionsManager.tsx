import React, { useState } from 'react';
import { Section } from '../../types';
import { toggleAdminResource, reorderAdminResource } from '../../services/api';
import { Toggle } from './ui/Toggle';
import { ArrowUp, ArrowDown, Layers, ShieldCheck, Check } from 'lucide-react';

interface SectionsManagerProps {
  sections: Section[];
  onRefresh: () => void;
}

export function SectionsManager({ sections, onRefresh }: SectionsManagerProps) {
  const [items, setItems] = useState<Section[]>([...sections].sort((a, b) => a.order - b.order));
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = async (section: Section, isActive: boolean) => {
    try {
      await toggleAdminResource('sections', section._id, isActive);
      setItems((prev) =>
        prev.map((s) => (s._id === section._id ? { ...s, isActive } : s))
      );
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to toggle section');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // Reassign order
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

    setUpdating(true);
    try {
      await reorderAdminResource('sections', orderedPayload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to reorder sections');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-[#3d494c]/30 pb-5">
        <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-[var(--color-primary)]" />
          <span>Dynamic Section Flow & Visibility</span>
        </h2>
        <p className="text-xs font-mono text-[#869397] mt-1">
          Reorder public page sections and toggle visibility. Toggling a section off completely removes it from the public payload. Mandatory sections are protected from deletion.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 rounded-xl bg-[#10b981]/20 border border-[#10b981]/40 text-[#4edea3] text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Section sequence updated successfully in database</span>
        </div>
      )}

      <div className="bg-[#201f22] rounded-2xl border border-[#3d494c]/40 overflow-hidden divide-y divide-[#3d494c]/30">
        {items.map((section, index) => {
          return (
            <div
              key={section._id}
              className="p-5 flex items-center justify-between gap-4 hover:bg-[#252427] transition-colors"
            >
              {/* Left: Reorder handles + info */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <button
                    disabled={index === 0 || updating}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1.5 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-[#bcc9cd] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Move section up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === items.length - 1 || updating}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1.5 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-[#bcc9cd] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Move section down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-8 h-8 rounded-lg bg-[#2a2a2c] border border-[#3d494c]/40 flex items-center justify-center font-mono text-xs text-[var(--color-primary)] font-semibold">
                  {section.order}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-semibold text-sm text-white">
                      {section.title}
                    </span>
                    {section.isMandatory && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#869397] bg-[#2a2a2c] px-2 py-0.5 rounded border border-[#3d494c]/30">
                        <ShieldCheck className="w-3 h-3 text-[#4edea3]" />
                        <span>Core Section</span>
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-[#869397] mt-0.5">
                    key: <span className="text-[var(--color-primary)]">"{section.key}"</span>
                  </div>
                </div>
              </div>

              {/* Right: Toggle */}
              <div className="flex items-center gap-4">
                <Toggle
                  checked={section.isActive}
                  onChange={(checked) => handleToggle(section, checked)}
                  label={section.isActive ? 'Active on Public Site' : 'Hidden from Public'}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
