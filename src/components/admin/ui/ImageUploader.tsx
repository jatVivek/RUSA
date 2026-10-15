import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, X } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export function ImageUploader({
  value,
  onChange,
  label = 'Asset Image',
  placeholder = 'https://...',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('rusatech_admin_token') || localStorage.getItem('synthetix_admin_token');
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || 'Image upload failed');
      }

      onChange(json.data.url);
    } catch (err: any) {
      setError(err.message || 'Failed to upload asset');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono uppercase tracking-wider text-[#bcc9cd]">
        {label}
      </label>

      <div className="flex gap-4 items-start">
        {/* Preview Frame */}
        <div className="w-24 h-24 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/50 overflow-hidden shrink-0 relative group flex items-center justify-center">
          {value ? (
            <>
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
                title="Remove image"
              >
                <X className="w-5 h-5 text-red-400" />
              </button>
            </>
          ) : (
            <ImageIcon className="w-8 h-8 text-[#869397]/50" />
          )}
        </div>

        {/* Input & Upload Controls */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <LinkIcon className="w-4 h-4 text-[#869397] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-xs text-white placeholder-[#869397] focus:outline-none focus:border-[var(--color-primary)] font-mono"
              />
            </div>

            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#353437] hover:bg-[#3d3c40] text-white text-xs font-mono transition-colors shrink-0">
              <UploadCloud className="w-4 h-4 text-[var(--color-primary)]" />
              <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="sr-only"
              />
            </label>
          </div>

          {error && <p className="text-[11px] text-red-400 font-mono">{error}</p>}
          <p className="text-[11px] text-[#869397] font-mono">
            Direct CDN URL, hotlinked asset, or upload JPEG/PNG/WebP/SVG (max 5MB).
          </p>
        </div>
      </div>
    </div>
  );
}
