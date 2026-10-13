import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-md bg-[#201f22] rounded-2xl border border-[#3d494c]/60 p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#869397] hover:text-white hover:bg-[#2a2a2c] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isDestructive
                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading font-semibold text-lg text-white">{title}</h3>
            <p className="text-sm text-[#869397] leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-[#3d494c]/30 font-mono text-xs">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-[#bcc9cd] hover:text-white transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                : 'bg-[var(--color-primary)] text-black hover:brightness-110'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
