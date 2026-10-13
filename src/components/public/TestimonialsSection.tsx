import React from 'react';
import { TestimonialItem } from '../../types';
import { Quote, Star, ShieldCheck } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  const activeItems = testimonials.filter((t) => t.isActive);
  if (activeItems.length === 0) return null;

  return (
    <section className="w-full px-5 lg:px-12 py-20 relative overflow-hidden" id="testimonials">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--color-primary)]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
              // 06: CLIENT TESTIMONIALS & FOUNDER OUTCOMES
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#e5e1e4] mt-2">
              What Engineering Leaders Say
            </h2>
          </div>
          <p className="text-[#869397] text-sm max-w-md">
            Direct feedback from funded startup founders, engineering directors, and product heads who partnered with Synthetix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeItems.map((item) => {
            const avatarUrl =
              item.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                item.authorName
              )}&background=201f22&color=06b6d4&bold=true`;

            return (
              <div
                key={item._id}
                className="bg-[#201f22]/90 backdrop-blur-md rounded-2xl p-7 border border-[#3d494c]/40 hover:border-[var(--color-primary)]/50 transition-all flex flex-col justify-between group hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-8 h-8 text-[var(--color-primary)]/50 group-hover:text-[var(--color-primary)] transition-colors" />
                    <div className="flex items-center gap-1 text-[#f59e0b]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-[#bcc9cd] text-sm leading-relaxed mb-6 italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#3d494c]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatarUrl}
                      alt={item.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-[#3d494c]/50"
                    />
                    <div>
                      <div className="font-heading font-medium text-sm text-[#e5e1e4] flex items-center gap-1">
                        <span>{item.authorName}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#4edea3]" />
                      </div>
                      <div className="text-xs font-mono text-[#869397]">
                        {item.authorRole} {item.company ? `• ${item.company}` : ''}
                      </div>
                    </div>
                  </div>

                  {item.badgeText && (
                    <span className="text-[10px] font-mono text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded border border-[var(--color-primary)]/20">
                      {item.badgeText}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
