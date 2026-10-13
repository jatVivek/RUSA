import React from 'react';
import { SiteSettings, SocialLink } from '../../types';
import { Github, Twitter, Linkedin, Terminal, Shield, ArrowUp, Lock } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  socials: SocialLink[];
  onOpenAdminLogin: () => void;
}

const socialIconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-4 h-4" />,
  twitter: <Twitter className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
};

export function Footer({ settings, socials, onOpenAdminLogin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeSocials = socials?.filter((s) => s.isActive) || [];

  return (
    <footer className="w-full bg-[#1b1b1d] border-t border-[#3d494c]/40 pt-16 pb-12 px-5 lg:px-12 text-[#869397]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              {settings.logoLight ? (
                <img
                  src={settings.logoLight}
                  alt={settings.siteTitle}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30 flex items-center justify-center font-mono font-bold">
                  S
                </div>
              )}
              <span className="font-heading font-bold text-lg text-white">
                {settings.siteTitle || 'Synthetix Studio'}
              </span>
            </div>

            <p className="text-xs leading-relaxed max-w-sm text-[#bcc9cd]">
              {settings.tagline ||
                'High-performance web applications, sub-100ms TTFB engineering, and scalable distributed systems.'}
            </p>

            {/* Operational Telemetry Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#201f22] border border-[#3d494c]/40 font-mono text-[11px] text-[#4edea3]">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
              <span>EDGE RUNTIMES: 99.99% HEALTHY</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-white font-semibold uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#featured-projects" className="hover:text-[var(--color-primary)] transition-colors">
                  // 01: Featured Work
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--color-primary)] transition-colors">
                  // 02: Capabilities
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[var(--color-primary)] transition-colors">
                  // 03: Architecture & Bio
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[var(--color-primary)] transition-colors">
                  // 04: Technical Papers
                </a>
              </li>
              <li>
                <a href="#audit-booking" className="hover:text-[var(--color-primary)] transition-colors">
                  // 05: Book Audit Scope
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-white font-semibold uppercase tracking-wider">
              Network Links
            </div>
            <div className="flex flex-wrap gap-2.5">
              {activeSocials.map((social) => {
                const icon =
                  socialIconMap[social.platform.toLowerCase()] || (
                    <Terminal className="w-4 h-4" />
                  );
                return (
                  <a
                    key={social._id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-[#201f22] hover:bg-[#2a2a2c] text-[#bcc9cd] hover:text-[var(--color-primary)] border border-[#3d494c]/40 transition-colors inline-flex items-center gap-2"
                  >
                    {icon}
                    <span className="text-[11px]">{social.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-2 text-[11px] text-[#869397]">
              Contact: {settings.contactEmail || 'lead@synthetix.studio'}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Portal Access & Scroll To Top */}
        <div className="pt-8 border-t border-[#3d494c]/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div>
            {settings.footerText ||
              `© ${new Date().getFullYear()} Synthetix Studio Inc. All rights reserved.`}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdminLogin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#201f22] hover:bg-[#2a2a2c] text-[#bcc9cd] hover:text-white border border-[#3d494c]/40 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>Admin CMS Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#201f22] hover:bg-[#2a2a2c] text-[#bcc9cd] hover:text-[var(--color-primary)] border border-[#3d494c]/40 transition-colors cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
