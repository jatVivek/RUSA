import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, X, AlertTriangle } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

/**
 * Optimizes an image file client-side into a high-fidelity, compact base64 data URL.
 * Preserves vector SVGs and scales large raster photos down to max 1600px width/height.
 */
function processImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // 1. Vector graphics (SVG) or tiny icons: keep pristine
    if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg') || file.size < 300 * 1024) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
      return;
    }

    // 2. Raster images: scale down if needed on canvas for optimal performance and crisp display
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 1600;
        let { width, height } = img;

        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        try {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return resolve(e.target?.result as string);
          }

          ctx.drawImage(img, 0, 0, width, height);
          // Prefer WebP for modern compression, fallback to JPEG
          const webp = canvas.toDataURL('image/webp', 0.88);
          if (webp && webp.startsWith('data:image/webp')) {
            resolve(webp);
          } else {
            resolve(canvas.toDataURL('image/jpeg', 0.88));
          }
        } catch {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function ImageUploader({
  value,
  onChange,
  label = 'Asset Image',
  placeholder = 'https://...',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewError, setPreviewError] = useState(false);

  React.useEffect(() => {
    setPreviewError(false);
  }, [value]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');
    setPreviewError(false);

    try {
      // 1. Process client-side immediately: guarantees instant attachment & preview
      const localDataUrl = await processImageFile(file);
      onChange(localDataUrl);

      // 2. Also attempt server-side upload sync if API is accessible
      try {
        const token = localStorage.getItem('rusatech_admin_token') || localStorage.getItem('synthetix_admin_token');
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: formData,
        });

        if (res.ok) {
          const json = await res.json();
          if (json.data?.url) {
            onChange(json.data.url);
          }
        }
      } catch {
        // Retain localDataUrl; no disruption to user
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to process image file');
    } finally {
      setIsUploading(false);
      // Reset input value so selecting the same file again works
      e.target.value = '';
    }
  };

  const isInvalidUploadPath = value && (value.startsWith('/uploads/') || previewError);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#bcc9cd]">
          {label}
        </label>
        {value && !previewError && (
          <span className="text-[10px] font-mono text-[var(--color-primary)]">
            ● Attached
          </span>
        )}
      </div>

      <div className="flex gap-4 items-start">
        {/* Preview Frame */}
        <div className="w-24 h-24 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/50 overflow-hidden shrink-0 relative group flex items-center justify-center p-2">
          {value && !previewError ? (
            <>
              <img
                src={value}
                alt="Preview"
                onError={() => setPreviewError(true)}
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setPreviewError(false);
                }}
                className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
                title="Remove image"
              >
                <X className="w-5 h-5 text-red-400" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 text-[#869397]/60 text-center px-1">
              {isInvalidUploadPath ? (
                <>
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                  <span className="text-[9px] text-amber-400 font-mono leading-tight">Needs Image</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-7 h-7" />
                  <span className="text-[9px] font-mono">No Asset</span>
                </>
              )}
            </div>
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
                onChange={(e) => {
                  setPreviewError(false);
                  onChange(e.target.value);
                }}
                placeholder={placeholder}
                className={`w-full pl-9 pr-8 py-2 rounded-xl bg-[#2a2a2c] border ${
                  previewError ? 'border-amber-500/60 text-amber-200' : 'border-[#3d494c]/40 text-white'
                } text-xs placeholder-[#869397] focus:outline-none focus:border-[var(--color-primary)] font-mono`}
              />
              {value && (
                <button
                  type="button"
                  onClick={() => {
                    onChange('');
                    setPreviewError(false);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#869397] hover:text-white"
                  title="Clear input"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--color-primary)] text-black hover:brightness-110 font-semibold text-xs font-mono transition-all shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <UploadCloud className="w-4 h-4" />
              <span>{isUploading ? 'Attaching...' : 'Upload Image'}</span>
              <input
                type="file"
                accept="image/*,.svg,.ico,.avif"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="sr-only"
              />
            </label>
          </div>

          {previewError && (
            <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-mono">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Previous image link was invalid or unreachable. Click "Upload Image" to attach an image file.</span>
            </div>
          )}

          {error && <p className="text-[11px] text-red-400 font-mono">{error}</p>}

          <p className="text-[11px] text-[#869397] font-mono">
            Click <strong className="text-white">Upload Image</strong> to attach SVG, PNG, WebP, or JPEG directly, or paste any external CDN URL.
          </p>
        </div>
      </div>
    </div>
  );
}

