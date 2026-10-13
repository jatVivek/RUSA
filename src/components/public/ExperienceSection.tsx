import React from 'react';
import { ExperienceItem } from '../../types';
import { Briefcase, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  if (!experience || experience.length === 0) return null;

  const activeItems = experience.filter((e) => e.isActive);
  if (activeItems.length === 0) return null;

  return (
    <section className="w-full px-5 lg:px-12 py-20 relative" id="experience">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
              // 05: TRACK RECORD & ARCHITECTURAL TENURE
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#e5e1e4] mt-2">
              Engineering Milestones & Systems Experience
            </h2>
          </div>
          <p className="text-[#869397] text-sm max-w-md">
            Decade-long journey architecting mission-critical platforms, high-throughput pipelines, and user-centric interfaces.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-[#3d494c]/40 before:pointer-events-none">
          {activeItems.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item._id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 group`}
              >
                {/* Center Node Indicator */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#201f22] border-2 border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)] shadow-[0_0_15px_rgba(6,182,212,0.3)] z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
                </div>

                {/* Content Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 px-0 md:px-8 w-full">
                  <div className="bg-[#201f22]/90 backdrop-blur-md rounded-2xl p-6 border border-[#3d494c]/40 hover:border-[var(--color-primary)]/50 transition-all hover:shadow-[0_0_25px_rgba(6,182,212,0.1)]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs text-[var(--color-primary)] px-2.5 py-0.5 rounded bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                        {item.period}
                      </span>
                      <span className="font-mono text-xs text-[#869397]">{item.company}</span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[#e5e1e4] group-hover:text-[var(--color-primary)] transition-colors">
                      {item.role}
                    </h3>

                    <p className="text-[#869397] text-sm leading-relaxed mt-3">
                      {item.description}
                    </p>

                    {item.achievements && item.achievements.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#3d494c]/30 space-y-2">
                        {item.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2 text-xs text-[#bcc9cd]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3] mt-0.5 shrink-0" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
