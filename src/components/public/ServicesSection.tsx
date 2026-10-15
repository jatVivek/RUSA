import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ServiceItem } from '../../types';
import {
  Code2,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  Database,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import {
  cubicEntrance,
  defaultViewport,
  fadeUpVariant,
  staggerContainer,
} from '../../lib/animations';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService?: (service: ServiceItem) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
};

export function ServicesSection({
  services,
  onSelectService,
}: ServicesSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!services || services.length === 0) return null;

  return (
    <section className="w-full px-5 lg:px-12 py-20 relative overflow-hidden" id="services">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3d494c_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
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
              // 02: CORE CAPABILITIES & DISCIPLINES
            </motion.span>
            <motion.h2
              variants={fadeUpVariant(0.08, 25, 0.7)}
              style={{ willChange: 'transform' }}
              className="font-heading text-3xl sm:text-4xl font-bold text-[#e5e1e4]"
            >
              Engineering Disciplines We Deliver
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUpVariant(0.16, 25, 0.7)}
            style={{ willChange: 'transform' }}
            className="text-[#869397] text-sm max-w-md"
          >
            From greenfield architecture to high-stakes performance overhauls, our studio provides elite full-stack capabilities.
          </motion.p>
        </motion.div>

        {/* Services Cards with 0.1s stagger */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer(0.1, 0.1)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const icon = iconMap[service.icon] || <Zap className="w-6 h-6" />;
            const indexPadded = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={service._id}
                variants={fadeUpVariant(0, 30, 0.7)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        boxShadow:
                          '0 0 35px rgba(6,182,212,0.22), 0 0 20px rgba(139,92,246,0.18)',
                        borderColor: 'rgba(6,182,212,0.55)',
                        transition: { duration: 0.3, ease: cubicEntrance },
                      }
                }
                style={{ willChange: 'transform' }}
                className="bg-[#201f22]/90 backdrop-blur-md rounded-2xl p-7 border border-[#3d494c]/40 transition-colors group flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center border border-[var(--color-primary)]/20 group-hover:bg-[var(--color-primary)] group-hover:text-black transition-colors duration-300">
                      {icon}
                    </div>
                    <span className="font-mono text-xs text-[#869397] group-hover:text-[var(--color-primary)] transition-colors">
                      /{indexPadded}
                    </span>
                  </div>

                  {service.tag && (
                    <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-1 rounded mb-3 border border-[var(--color-primary)]/20">
                      {service.tag}
                    </span>
                  )}

                  <h3 className="text-xl font-heading font-semibold text-[#e5e1e4] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-[#869397] text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#3d494c]/30 flex items-center justify-between">
                  <a
                    href="#audit-booking"
                    onClick={() => onSelectService && onSelectService(service)}
                    className="text-xs font-mono text-[var(--color-primary)] flex items-center gap-1.5 transition-all group/link hover:brightness-125"
                  >
                    <span>Request Technical Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
