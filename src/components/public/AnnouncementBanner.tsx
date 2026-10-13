import React, { useEffect, useState } from 'react';
import { fetchOfferBanner } from '../../services/api';
import { OfferBanner } from '../../types';
import { X, Sparkles } from 'lucide-react';

export function AnnouncementBanner() {
  const [banner, setBanner] = useState<OfferBanner | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetchOfferBanner()
      .then((data) => {
        if (!data || !data.isActive) {
          setBanner(null);
          return;
        }
        // Check localStorage dismissal
        const isDismissed = localStorage.getItem(`dismissed_banner_${data._id}`) === 'true';
        if (isDismissed) {
          setDismissed(true);
        } else {
          setBanner(data);
        }
      })
      .catch(() => setBanner(null));
  }, []);

  if (!banner || dismissed) {
    return null; // Return NOTHING, zero space
  }

  const handleDismiss = () => {
    localStorage.setItem(`dismissed_banner_${banner._id}`, 'true');
    setDismissed(true);
  };

  return (
    <div
      id="announcement-bar"
      className="w-full bg-[#1c1b1d]/95 backdrop-blur-md px-4 lg:px-12 py-2 transition-all duration-300 border-b border-[#3d494c]/30 relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 mx-auto text-[#bcc9cd]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
          </span>
          <span className="font-medium text-[#e5e1e4] tracking-wide">{banner.text}</span>
          {banner.buttonUrl && (
            <>
              <span className="text-[#869397] hidden sm:inline">—</span>
              <a
                href={banner.buttonUrl}
                className="text-[#4cd7f6] hover:text-[#acedff] transition-colors underline underline-offset-4 font-medium"
              >
                {banner.buttonText || 'Learn More →'}
              </a>
            </>
          )}
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="text-[#869397] hover:text-[#e5e1e4] p-1 transition-colors rounded cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
