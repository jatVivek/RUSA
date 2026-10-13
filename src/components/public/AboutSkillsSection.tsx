import React, { useState } from 'react';
import { AboutContent, SkillItem } from '../../types';
import { Award, Terminal, Code, Cpu, Server, Gauge, CheckCircle2 } from 'lucide-react';

interface AboutSkillsSectionProps {
  about: AboutContent | null;
  skills: SkillItem[];
}

export function AboutSkillsSection({ about, skills }: AboutSkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

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

  return (
    <section className="w-full px-5 lg:px-12 py-20 relative" id="about">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* About Studio Grid */}
        {about && about.isActive && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Avatar & Lead Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#3d494c]/50 bg-[#201f22] p-4 shadow-xl">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#2a2a2c]">
                  <img
                    src={avatarUrl}
                    alt={about.title || 'Studio Principal'}
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Status Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <div className="text-white font-heading font-semibold text-base">
                        Synthetix Lead Architect
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
                    <div className="text-lg font-mono font-bold text-[var(--color-primary)]">10+ Yrs</div>
                    <div className="text-[11px] text-[#869397]">Production Systems</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#2a2a2c]/60 border border-[#3d494c]/20">
                    <div className="text-lg font-mono font-bold text-[#4edea3]">100%</div>
                    <div className="text-[11px] text-[#869397]">Client Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Decorative Accent Glow */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--color-secondary)]/15 blur-3xl rounded-full pointer-events-none" />
            </div>

            {/* Right: Studio Bio & Story */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
                // 03: ARCHITECTURAL PHILOSOPHY & LEADERSHIP
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#e5e1e4] leading-tight">
                {about.headline ||
                  'Obsessive attention to web speed, elegant ergonomics, and enterprise-grade durability.'}
              </h2>

              <div className="text-[#bcc9cd] text-base leading-relaxed space-y-4 whitespace-pre-line">
                {about.bio ||
                  `Synthetix Studio was founded on a singular premise: modern web applications should not only look visually striking, they must execute with ruthless precision, sub-100ms response times, and resilient fault-tolerance.\n\nWe collaborate directly with founders, CTOs, and product directors to design and deploy complex web software—translating ambition into market-dominating production reality.`}
              </div>

              {/* Stats Highlights */}
              {about.stats && about.stats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  {about.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#201f22]/70 border border-[#3d494c]/30 backdrop-blur-sm"
                    >
                      <div className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
                        {stat.value}
                      </div>
                      <div className="text-xs text-[#869397] mt-1 font-mono">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skills & Technical Competencies */}
        {skills && skills.length > 0 && (
          <div className="space-y-8 pt-10 border-t border-[#3d494c]/30" id="skills">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
                  // 04: TECHNICAL MATRIX & PROFICIENCIES
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#e5e1e4] mt-1">
                  Engineered Stack & Domain Tooling
                </h3>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[var(--color-primary)] text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : 'bg-[#201f22] text-[#869397] hover:text-[#e5e1e4] border border-[#3d494c]/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredSkills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-[#201f22]/80 hover:bg-[#252427] border border-[#3d494c]/40 hover:border-[var(--color-primary)]/50 rounded-xl p-4 transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] text-[#869397] group-hover:text-[var(--color-primary)] transition-colors">
                      {skill.category.split(' ')[0]}
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--color-primary)]">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="font-heading font-medium text-sm text-[#e5e1e4] group-hover:text-white mb-3">
                    {skill.name}
                  </div>

                  {/* Level Progress Bar */}
                  <div className="w-full h-1 bg-[#353437] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
