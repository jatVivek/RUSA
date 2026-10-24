import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AboutContent, SkillItem } from '../../types';
import {
  cubicEntrance,
  springHover,
  defaultViewport,
  fadeUpVariant,
  staggerContainer,
  AnimatedCounter,
} from '../../lib/animations';

interface AboutSkillsSectionProps {
  about: AboutContent | null;
  skills: SkillItem[];
}

export function AboutSkillsSection({ about, skills }: AboutSkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const shouldReduceMotion = useReducedMotion();

  if (!about && (!skills || skills.length === 0)) return null;

  const categories = ['All', 'Frontend & UI', 'Backend & DB', 'DevOps & Cloud', 'Performance & Architecture'];

  const filteredSkills = skills.filter((s) => {
    if (!s.isActive) return false;
    if (activeCategory === 'All') return true;
    return s.category === activeCategory;
  });

  const avatarUrl =
    about?.avatar ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDRB5o4N_T0B9Z-81nS1_e0T7l9xHqYj8BfD0sW21aX-9xJ7Y7Kz0P4sZt2vD7z8lQ=s400';

  const sectionId = about ? 'about' : 'skills';

  return (
    <section className="w-full px-5 lg:px-12 py-20 relative" id={sectionId}>
      {about && <span id="about" className="absolute -top-24 pointer-events-none" />}
      {skills && <span id="stack" className="absolute -top-24 pointer-events-none" />}
      <div className="max-w-7xl mx-auto space-y-16">
        {/* About Studio Grid */}
        {about && about.isActive && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Avatar & Lead Card */}
            <motion.div
              initial={shouldReduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeUpVariant(0, 30, 0.7)}
              style={{ willChange: 'transform' }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-[#3d494c]/50 bg-[#201f22] p-4 shadow-xl">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#2a2a2c] group">
                  <motion.img
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                    transition={{ duration: 0.5, ease: cubicEntrance }}
                    src={avatarUrl}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('aida-public')) {
                        target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpeLYWljWwHHEy04ie4U-vx2scsaDxGmQLlpJVGmc_LJhtvGJsyBzJhEklZ3PhYmNlLuA0qrBAwj0tV5hpUhxf_xYCGTIk-21Hp1Q4ntRh7TIRK3jzBkEWFyuxhr52OJ3GSMSskLgstjWwn054Qacke3htz0VApieLIqCWQ-vsoaV8DmJG1-ObfJhL0FNlUiifCj5vkbH6uyHTsGV_4g_3NFUjgcdhNkJpGCK_y4vDgc_lUdnns1A';
                      }
                    }}
                    alt={about.title || 'Studio Principal'}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                    style={{ willChange: 'transform' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Status Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <div className="text-white font-heading font-semibold text-base">
                        RUSA TECH Lead Architect
                      </div>
                      <div className="text-xs font-mono text-[var(--color-primary)]">
                        SF Bay Area / Global Edge
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 text-[#4edea3] text-[10px] font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                      AVAILABLE
                    </span>
                  </div>
                </div>

                {/* Micro Metric Banner */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#3d494c]/30">
                  <div className="p-2.5 rounded-lg bg-[#2a2a2c]/60 border border-[#3d494c]/20">
                    <div className="text-lg font-mono font-bold text-[var(--color-primary)]">
                      <AnimatedCounter value="10+ Yrs" duration={1.8} />
                    </div>
                    <div className="text-[11px] text-[#869397]">Production Systems</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#2a2a2c]/60 border border-[#3d494c]/20">
                    <div className="text-lg font-mono font-bold text-[#4edea3]">
                      <AnimatedCounter value="100%" duration={1.8} />
                    </div>
                    <div className="text-[11px] text-[#869397]">Client Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Decorative Accent Glow */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--color-secondary)]/15 blur-3xl rounded-full pointer-events-none" />
            </motion.div>

            {/* Right: Studio Bio & Story */}
            <motion.div
              initial={shouldReduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer(0.12)}
              className="lg:col-span-7 space-y-6"
            >
              <motion.span
                variants={fadeUpVariant(0, 25, 0.7)}
                style={{ willChange: 'transform' }}
                className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)] block"
              >
                // 03: ARCHITECTURAL PHILOSOPHY & LEADERSHIP
              </motion.span>
              <motion.h2
                variants={fadeUpVariant(0.08, 25, 0.7)}
                style={{ willChange: 'transform' }}
                className="font-heading text-3xl sm:text-4xl font-bold text-[#e5e1e4] leading-tight"
              >
                {about.headline ||
                  'Obsessive attention to web speed, elegant ergonomics, and enterprise-grade durability.'}
              </motion.h2>

              <motion.div
                variants={fadeUpVariant(0.16, 25, 0.7)}
                style={{ willChange: 'transform' }}
                className="text-[#bcc9cd] text-base leading-relaxed space-y-4 whitespace-pre-line"
              >
                {about.bio ||
                  `RUSA TECH was founded on a singular premise: modern web applications should not only look visually striking, they must execute with ruthless precision, sub-100ms response times, and resilient fault-tolerance.\n\nWe collaborate directly with founders, CTOs, and product directors to design and deploy complex web software—translating ambition into market-dominating production reality.`}
              </motion.div>

              {/* Stats Highlights with Animated Counter */}
              {about.stats && about.stats.length > 0 && (
                <motion.div
                  variants={fadeUpVariant(0.24, 25, 0.7)}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4"
                >
                  {about.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                      transition={springHover}
                      className="p-4 rounded-xl bg-[#201f22]/70 border border-[#3d494c]/30 backdrop-blur-sm"
                    >
                      <div className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
                        <AnimatedCounter value={stat.value} duration={1.8} />
                      </div>
                      <div className="text-xs text-[#869397] mt-1 font-mono">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        )}

        {/* Skills & Technical Competencies */}
        {skills && skills.length > 0 && (
          <div className="space-y-8 pt-10 border-t border-[#3d494c]/30" id="skills">
            <motion.div
              initial={shouldReduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer(0.12)}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div className="space-y-1">
                <motion.span
                  variants={fadeUpVariant(0, 20, 0.6)}
                  className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)] block"
                >
                  // 04: TECHNICAL MATRIX & PROFICIENCIES
                </motion.span>
                <motion.h3
                  variants={fadeUpVariant(0.08, 25, 0.7)}
                  className="font-heading text-2xl sm:text-3xl font-bold text-[#e5e1e4]"
                >
                  Engineered Stack & Domain Tooling
                </motion.h3>
              </div>

              {/* Category Pills with animated sliding active indicator (layoutId) */}
              <div className="flex flex-wrap gap-2 relative">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer z-10 ${
                        isActive
                          ? 'text-black font-semibold'
                          : 'text-[#869397] hover:text-[#e5e1e4] bg-[#201f22] border border-[#3d494c]/30'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryIndicator"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          className="absolute inset-0 bg-[var(--color-primary)] rounded-lg -z-10 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                        />
                      )}
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Skills Grid with 1.2s ease-out progress bar fills on entry */}
            <motion.div
              layout
              initial={shouldReduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer(0.06)}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {filteredSkills.map((skill) => (
                <motion.div
                  layout
                  key={skill._id}
                  variants={fadeUpVariant(0, 25, 0.6)}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -5,
                          borderColor: 'rgba(6,182,212,0.5)',
                          boxShadow: '0 0 20px rgba(6,182,212,0.15)',
                          transition: { duration: 0.25 },
                        }
                  }
                  style={{ willChange: 'transform' }}
                  className="bg-[#201f22]/80 hover:bg-[#252427] border border-[#3d494c]/40 rounded-xl p-4 transition-colors group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] text-[#869397] group-hover:text-[var(--color-primary)] transition-colors">
                      {skill.category.split(' ')[0]}
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--color-primary)]">
                      <AnimatedCounter value={`${skill.level}%`} duration={1.2} />
                    </span>
                  </div>

                  <div className="font-heading font-medium text-sm text-[#e5e1e4] group-hover:text-white mb-3">
                    {skill.name}
                  </div>

                  {/* Level Progress Bar: fills from 0 to value over 1.2s on entry */}
                  <div className="w-full h-1 bg-[#353437] rounded-full overflow-hidden">
                    <motion.div
                      initial={shouldReduceMotion ? false : { width: '0%' }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={defaultViewport}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      style={{ willChange: 'width' }}
                      className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
