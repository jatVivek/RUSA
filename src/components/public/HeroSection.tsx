import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HeroContent } from '../../types';
import { ArrowUpRight, ArrowDown, Bolt, ShieldCheck, Lock, Monitor } from 'lucide-react';
import {
  cubicEntrance,
  springHover,
  AnimatedCounter,
  MagneticButton,
} from '../../lib/animations';

interface HeroSectionProps {
  hero: HeroContent | null;
}

export function HeroSection({ hero }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!hero || !hero.isActive) return null;

  // Stagger container for hero elements
  const heroContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: cubicEntrance },
    },
  };

  // Headline line-by-line masked reveals
  const headlineMaskVariants = {
    hidden: { y: '100%' },
    visible: (i: number) => ({
      y: '0%',
      transition: {
        duration: 0.8,
        ease: cubicEntrance,
        delay: 0.15 + i * 0.1,
      },
    }),
  };

  return (
    <section className="relative w-full px-5 lg:px-12 pt-12 pb-16 overflow-hidden">
      {/* Ambient Luminescence Backdrops */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[var(--color-primary)]/15 via-[var(--color-secondary)]/15 to-[#10b981]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy & Actions */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          variants={heroContentVariants}
          className="lg:col-span-7 flex flex-col items-start gap-6"
        >
          {/* Telemetry Status Chip */}
          <motion.div
            variants={fadeUpItem}
            className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#201f22]/80 backdrop-blur-md border border-[#3d494c]/40 shadow-[0_0_15px_rgba(78,222,163,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#4edea3] font-medium">
              {hero.badge || 'Full-Stack Web Engineering & UI/UX Studio'}
            </span>
            <span className="text-[10px] text-[#869397] font-mono border-l border-[#3d494c]/50 pl-2">
              {hero.badgeStatus || 'Q3 ACTIVE'}
            </span>
          </motion.div>

          {/* Hero Headline Line-by-Line Masked Reveal */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#e5e1e4] tracking-tight font-bold leading-[1.15] max-w-2xl">
            <span className="block overflow-hidden py-0.5">
              <motion.span
                custom={0}
                initial={shouldReduceMotion ? false : 'hidden'}
                animate="visible"
                variants={headlineMaskVariants}
                style={{ willChange: 'transform' }}
                className="inline-block"
              >
                We Build{' '}
              </motion.span>
            </span>

            <span className="block overflow-hidden py-0.5">
              <motion.span
                custom={1}
                initial={shouldReduceMotion ? false : 'hidden'}
                animate="visible"
                variants={headlineMaskVariants}
                style={{ willChange: 'transform' }}
                className="inline-block"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[#4edea3] animate-gradient-shimmer">
                  {hero.highlightText || 'High-Performance Web Applications'}
                </span>
              </motion.span>
            </span>

            <span className="block overflow-hidden py-0.5">
              <motion.span
                custom={2}
                initial={shouldReduceMotion ? false : 'hidden'}
                animate="visible"
                variants={headlineMaskVariants}
                style={{ willChange: 'transform' }}
                className="inline-block"
              >
                That Scale Your Business
              </motion.span>
            </span>
          </h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUpItem}
            className="text-[#bcc9cd] text-base lg:text-lg max-w-xl leading-relaxed"
          >
            {hero.subheadline ||
              'RUSA TECH is a premier full-stack web engineering and UI/UX studio. We design, architect, and ship production-grade SaaS platforms, bespoke e-commerce engines, and high-conversion digital experiences.'}
          </motion.p>

          {/* Action Triggers with Magnetic Button and Arrow slide */}
          <motion.div variants={fadeUpItem} className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <MagneticButton
              href={hero.primaryCtaUrl || '#audit-booking'}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] text-white font-medium text-sm shadow-[0_0_24px_rgba(6,182,212,0.4)] group cursor-pointer"
            >
              <span>{hero.primaryCtaText || 'Schedule Scoping Call'}</span>
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </MagneticButton>

            <motion.a
              href={hero.secondaryCtaUrl || '#featured-projects'}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              transition={springHover}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#2a2a2c]/80 text-[#e5e1e4] font-medium text-sm hover:bg-[#353437] transition-colors border border-[#3d494c]/30 cursor-pointer group"
            >
              <span>{hero.secondaryCtaText || 'Explore Client Work'}</span>
              <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-1" />
            </motion.a>
          </motion.div>

          {/* Trust Badges Strip (4 Columns) with Animated Counter */}
          <motion.div variants={fadeUpItem} className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 w-full">
            {(hero.metrics || []).map((m, idx) => (
              <motion.div
                key={idx}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                transition={springHover}
                className="flex flex-col p-2.5 rounded-lg bg-[#201f22]/70 border border-[#3d494c]/30"
              >
                <span className={`font-heading text-lg font-bold ${m.colorClass || 'text-[var(--color-primary)]'}`}>
                  <AnimatedCounter value={m.value} duration={1.8} />
                </span>
                <span className="font-mono text-[11px] text-[#869397] leading-tight mt-0.5">
                  {m.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Web App Mockup Showcase */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Float-in and continuous ambient float container */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 40 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : {
                    opacity: 1,
                    scale: 1,
                    y: [0, -8, 0, 8, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.8 }
                : {
                    opacity: { duration: 0.8, ease: cubicEntrance },
                    scale: { duration: 0.8, ease: cubicEntrance },
                    y: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.8,
                    },
                  }
            }
            style={{ willChange: 'transform' }}
            className="relative w-full max-w-lg rounded-2xl bg-[#0e0e10] border border-[#3d494c]/50 p-2.5 shadow-[0_0_50px_rgba(76,215,246,0.18)]"
          >
            {/* Top Chrome Header Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a2a2c]/60 bg-[#1c1b1d]/80 rounded-t-xl mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="px-3 py-0.5 rounded-md bg-[#201f22] text-[#869397] font-mono text-[11px] flex items-center gap-1.5 border border-[#3d494c]/20">
                <Lock className="w-3 h-3 text-[#4edea3]" />
                <span>{hero.previewAppUrl || 'https://app.prism-analytics.io/dashboard'}</span>
              </div>
              <Monitor className="w-3.5 h-3.5 text-[#869397]" />
            </div>

            {/* Internal App Screen with Faint Scanline & Grid Overlay */}
            <div className="relative rounded-lg overflow-hidden border border-[#3d494c]/30 bg-[#131315] group">
              <img
                src={
                  hero.previewAppImage ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hQX_71e363t0WKA5wsEHXD99U5DcfthqsDvEAK30kKBzJgLSCvpoMdstHdoIo2voJ4HCoLfbORMU7dIyC61GXO-th-RNwie971yBgquKzwn4qkrRvt0vp8WtVA9xUyMpu-QCVDw530109VoDX7VbK6xK8UK1uVLQgydgZC5m-i7YA-lJ7Jtt32EWBtY_V5JEmXW3blBj1q8SvFuPyuhCjCU5N8TRN4FjH9OucatEGansE9oNrpU'
                }
                alt="High-performance modern web application dashboard interface"
                className="w-full h-72 object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Faint animated grid / scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)]/40 to-transparent animate-scanline pointer-events-none opacity-40" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#e5e1e4]">
                    {hero.previewAppTitle || 'Prism Cloud Web App'}
                  </p>
                  <p className="font-mono text-[11px] text-[var(--color-primary)]">
                    {hero.previewAppSubtitle || 'React 19 • Next.js 15 • Tailwind'}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#1bbd85]/20 text-[#4edea3] font-mono text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                  60 FPS
                </span>
              </div>
            </div>
          </motion.div>

          {/* Floating Performance Glass Pill 1 (Top Left Overlap) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: cubicEntrance }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            className="absolute -top-3 -left-3 sm:-left-6 bg-[#201f22]/95 border border-[#3d494c]/60 backdrop-blur-xl px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2.5 z-10"
          >
            <div className="p-1.5 rounded-lg bg-[#1bbd85]/20 text-[#4edea3]">
              <Bolt className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-[9px] text-[#869397] uppercase tracking-wider">
                FIRST CONTENTFUL PAINT
              </div>
              <div className="font-heading text-sm font-bold text-[#4edea3]">
                <AnimatedCounter value="0.8s" duration={1.5} />
              </div>
            </div>
          </motion.div>

          {/* Floating Performance Glass Pill 2 (Bottom Right Overlap) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: cubicEntrance }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            className="absolute -bottom-4 -right-2 sm:-right-4 bg-[#201f22]/95 border border-[#3d494c]/60 backdrop-blur-xl px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2.5 z-10"
          >
            <div className="p-1.5 rounded-lg bg-[#06b6d4]/20 text-[var(--color-primary)]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-[9px] text-[#869397] uppercase tracking-wider">
                STANDARDS COMPLIANT
              </div>
              <div className="font-heading text-sm font-bold text-[var(--color-primary)]">
                SOC2 & WCAG AA
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
