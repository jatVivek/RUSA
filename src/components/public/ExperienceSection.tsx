import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { ExperienceItem } from '../../types';
import { CheckCircle2 } from 'lucide-react';
import {
  cubicEntrance,
  defaultViewport,
  fadeUpVariant,
  staggerContainer,
} from '../../lib/animations';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  });

  const smoothScaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
  });

  if (!experience || experience.length === 0) return null;

  const activeItems = experience.filter((e) => e.isActive);
  if (activeItems.length === 0) return null;

  return (
    <section className="w-full px-5 lg:px-12 py-20 relative" id="experience">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer(0.12)}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-2">
            <motion.span
              variants={fadeUpVariant(0, 25, 0.7)}
              style={{ willChange: 'transform' }}
              className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)] block"
            >
              // 05: TRACK RECORD & ARCHITECTURAL TENURE
            </motion.span>
            <motion.h2
              variants={fadeUpVariant(0.08, 25, 0.7)}
              style={{ willChange: 'transform' }}
              className="font-heading text-3xl sm:text-4xl font-bold text-[#e5e1e4]"
            >
              Engineering Milestones & Systems Experience
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUpVariant(0.16, 25, 0.7)}
            style={{ willChange: 'transform' }}
            className="text-[#869397] text-sm max-w-md"
          >
            Decade-long journey architecting mission-critical platforms, high-throughput pipelines, and user-centric interfaces.
          </motion.p>
        </motion.div>

        {/* Timeline List with connecting line drawn as you scroll */}
        <div ref={timelineRef} className="space-y-6 relative">
          {/* Background Track Line */}
          <div className="absolute inset-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-[#3d494c]/30 pointer-events-none" />

          {/* Active Gradient Line drawn on scroll */}
          <motion.div
            style={{
              scaleY: shouldReduceMotion ? 1 : smoothScaleY,
              transformOrigin: 'top',
              willChange: 'transform',
            }}
            className="absolute inset-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-[#4edea3] pointer-events-none z-0"
          />

          {activeItems.map((item, index) => {
            const isEven = index % 2 === 0;

            // Alternate slide-in directions: isEven slides from right on desktop, odd from left
            const cardSlideVariants = {
              hidden: {
                opacity: 0,
                x: isEven ? 50 : -50,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: cubicEntrance,
                },
              },
            };

            return (
              <div
                key={item._id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 group`}
              >
                {/* Center Node Indicator with pulse on entry */}
                <motion.div
                  initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.5, ease: cubicEntrance }}
                  style={{ willChange: 'transform' }}
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#201f22] border-2 border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)] shadow-[0_0_15px_rgba(6,182,212,0.4)] z-10"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
                </motion.div>

                {/* Content Card with alternate slide in */}
                <motion.div
                  initial={shouldReduceMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={defaultViewport}
                  variants={cardSlideVariants}
                  style={{ willChange: 'transform' }}
                  className="ml-12 md:ml-0 md:w-1/2 px-0 md:px-8 w-full"
                >
                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -5,
                            boxShadow: '0 0 30px rgba(6,182,212,0.18)',
                            borderColor: 'rgba(6,182,212,0.5)',
                            transition: { duration: 0.3 },
                          }
                    }
                    className="bg-[#201f22]/90 backdrop-blur-md rounded-2xl p-6 border border-[#3d494c]/40 transition-colors"
                  >
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
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
