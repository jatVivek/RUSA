import React, { useState } from 'react';
import { SiteSettings } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, Menu, X, Shield, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  settings?: SiteSettings;
  onOpenAdmin: () => void;
  onOpenCaseStudy: () => void;
}

export function Navbar({ settings, onOpenAdmin, onOpenCaseStudy }: NavbarProps) {
  const { mode, toggleMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const siteTitle = settings?.siteTitle || 'Synthetix.studio';
  const logoSrc =
    (mode === 'dark' ? settings?.logoDark : settings?.logoLight) ||
    'https://lh3.googleusercontent.com/aida/AEtjO1XMwk0vjmYiG-c-mPIGezb_SacR2QHiT-jJmxkFIRLbYg6hxGgvBAJZ8xdNGaTI-553skyNG9OIv3004qS_euzSWtAcmRUjp6M284egBBGUx_On4CP8IAlBsSEWtdMu9jPycgPveUabo0r4hPlNbRAbdkZZxvQ4ARXe_zooVS8hB87gbnUQzVRAs91rXA28bTBF0mlj22qUO9vVnCkhPtLZIABLoyh0KBKRT9fr9gxnky5oHdAvWR9gdQ';

  const navLinks = [
    { label: 'Work', href: '#featured-projects' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Engagements', href: '#pricing' },
    { label: 'Stack', href: '#stack' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-40 w-full bg-[#131315]/85 backdrop-blur-xl border-b border-[#2a2a2c]/60 shadow-[0_1px_8px_rgba(0,0,0,0.4)] transition-all">
      <div className="h-20 max-w-7xl mx-auto px-5 lg:px-12 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <img
              src={logoSrc}
              alt="Synthetix Studio Emblem"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight text-[#e5e1e4] leading-tight">
                Synthetix<span className="text-[var(--color-primary)]">.studio</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#869397]">
                Modern Web Agency
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Clean 3-zone contract) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#bcc9cd] hover:text-[#e5e1e4] text-xs font-medium tracking-wide transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenCaseStudy}
            className="text-[var(--color-primary)] hover:underline text-xs font-semibold tracking-wide flex items-center gap-1 cursor-pointer"
          >
            <span>NeuralStream V3</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </nav>

        {/* Zone 3: Actions (Theme toggle, Admin Portal, CTA) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMode}
            aria-label="Toggle color theme"
            className="p-2 rounded-lg text-[#869397] hover:text-[#e5e1e4] hover:bg-[#201f22] transition-colors cursor-pointer"
          >
            {mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenAdmin}
            title="Open Admin CMS Deck"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1b1d] hover:bg-[#2a2a2c] text-[#bcc9cd] hover:text-[#e5e1e4] text-xs font-mono border border-[#3d494c]/40 transition-all cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Admin Deck</span>
          </button>

          <a
            href="#audit-booking"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] text-white font-medium text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_28px_rgba(139,92,246,0.6)] hover:brightness-110 transition-all cursor-pointer"
          >
            Start a Project
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#869397] hover:text-[#e5e1e4] hover:bg-[#201f22]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1c1b1d] border-b border-[#3d494c]/40 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#bcc9cd] hover:text-[var(--color-primary)] text-sm py-1 font-medium"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCaseStudy();
            }}
            className="w-full text-left text-[var(--color-primary)] text-sm py-1 font-semibold flex items-center justify-between"
          >
            <span>Case Study: NeuralStream V3</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <div className="pt-2 border-t border-[#3d494c]/40 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex-1 py-2 rounded-lg bg-[#2a2a2c] text-[#e5e1e4] text-xs font-mono text-center"
            >
              Admin CMS Deck
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
