import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SiteSettings } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, Menu, X, Shield, ArrowUpRight } from 'lucide-react';
import { cubicEntrance, springHover } from '../../lib/animations';

interface NavbarProps {
  settings?: SiteSettings;
  onOpenAdmin: () => void;
  onOpenCaseStudy: () => void;
}

export function Navbar({ settings, onOpenAdmin, onOpenCaseStudy }: NavbarProps) {
  const { mode, toggleMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
    <motion.header
      initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: cubicEntrance }}
      style={{ willChange: 'transform, opacity' }}
      className="sticky top-0 left-0 right-0 z-40 w-full bg-[#131315]/85 backdrop-blur-xl border-b border-[#2a2a2c]/60 shadow-[0_1px_8px_rgba(0,0,0,0.4)]"
    >
      <div className="h-20 max-w-7xl mx-auto px-5 lg:px-12 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <motion.img
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              transition={springHover}
              src={logoSrc}
              alt="RUSA TECH Emblem"
              className="h-8 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight text-[#e5e1e4] leading-tight">
                {settings?.siteTitle || (
                  <>RUSA <span className="text-[var(--color-primary)]">TECH</span></>
                )}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#869397]">
                Modern Web Agency
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-[#bcc9cd] hover:text-[#e5e1e4] text-xs font-medium tracking-wide transition-colors uppercase py-1 group"
            >
              <span>{link.label}</span>
              {/* Animated underline grows from left */}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </a>
          ))}
          <motion.button
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            onClick={onOpenCaseStudy}
            className="text-[var(--color-primary)] hover:underline text-xs font-semibold tracking-wide flex items-center gap-1 cursor-pointer group"
          >
            <span>NeuralStream V3</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </motion.button>
        </nav>

        {/* Zone 3: Actions (Theme toggle, Admin Portal, CTA) */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            onClick={toggleMode}
            aria-label="Toggle color theme"
            className="p-2 rounded-lg text-[#869397] hover:text-[#e5e1e4] hover:bg-[#201f22] transition-colors cursor-pointer"
          >
            {mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            onClick={onOpenAdmin}
            title="Open Admin CMS Deck"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1b1d] hover:bg-[#2a2a2c] text-[#bcc9cd] hover:text-[#e5e1e4] text-xs font-mono border border-[#3d494c]/40 transition-all cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Admin Deck</span>
          </motion.button>

          <motion.a
            href="#audit-booking"
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.03,
                    boxShadow: '0 0 28px rgba(6,182,212,0.6)',
                  }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            transition={springHover}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] text-white font-medium text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all cursor-pointer"
          >
            Start a Project
          </motion.a>

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
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-[#1c1b1d] border-b border-[#3d494c]/40 px-6 py-4 space-y-3"
        >
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
        </motion.div>
      )}
    </motion.header>
  );
}
