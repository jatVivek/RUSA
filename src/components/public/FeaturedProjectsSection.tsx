import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ProductItem } from '../../types';
import { ArrowRight, ExternalLink } from 'lucide-react';
import {
  cubicEntrance,
  springHover,
  defaultViewport,
  fadeUpVariant,
  staggerContainer,
  AnimatedCounter,
} from '../../lib/animations';

interface FeaturedProjectsSectionProps {
  products: ProductItem[];
  onOpenCaseStudy: (product?: ProductItem) => void;
}

export function FeaturedProjectsSection({
  products,
  onOpenCaseStudy,
}: FeaturedProjectsSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!products || products.length === 0) return null;

  return (
    <section className="w-full px-5 lg:px-12 py-20" id="featured-projects">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with standard fade up scroll reveal */}
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
              // 01: FEATURED CLIENT WORK
            </motion.span>
            <motion.h2
              variants={fadeUpVariant(0.08, 25, 0.7)}
              style={{ willChange: 'transform' }}
              className="font-heading text-3xl sm:text-4xl font-bold text-[#e5e1e4]"
            >
              Production Web Applications We've Shipped
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUpVariant(0.16, 25, 0.7)}
            style={{ willChange: 'transform' }}
            className="text-[#869397] text-sm max-w-md"
          >
            Every project is engineered with high code standards, ultra-low latency, and conversion-focused UX architecture.
          </motion.p>
        </motion.div>

        {/* Project Cards Grid with 0.1s stagger */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer(0.1, 0.1)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {products.map((product) => {
            const coverImg =
              product.images?.[0] ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hQX_71e363t0WKA5wsEHXD99U5DcfthqsDvEAK30kKBzJgLSCvpoMdstHdoIo2voJ4HCoLfbORMU7dIyC61GXO-th-RNwie971yBgquKzwn4qkrRvt0vp8WtVA9xUyMpu-QCVDw530109VoDX7VbK6xK8UK1uVLQgydgZC5m-i7YA-lJ7Jtt32EWBtY_V5JEmXW3blBj1q8SvFuPyuhCjCU5N8TRN4FjH9OucatEGansE9oNrpU';

            return (
              <motion.div
                key={product._id}
                variants={fadeUpVariant(0, 30, 0.7)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        boxShadow:
                          '0 0 35px rgba(6,182,212,0.25), 0 0 20px rgba(139,92,246,0.2)',
                        borderColor: 'rgba(6,182,212,0.6)',
                        transition: { duration: 0.3, ease: cubicEntrance },
                      }
                }
                style={{ willChange: 'transform' }}
                className="bg-[#201f22] rounded-2xl overflow-hidden flex flex-col group border border-[#3d494c]/40 transition-colors"
              >
                {/* Image Container with scale 1.1->1 reveal and zoom 1.05 on hover */}
                <div className="relative h-64 w-full overflow-hidden bg-[#353437]">
                  <motion.img
                    initial={shouldReduceMotion ? false : { scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={defaultViewport}
                    transition={{ duration: 0.8, ease: cubicEntrance }}
                    src={coverImg}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ willChange: 'transform' }}
                  />
                  <div className="absolute top-3 left-3 flex gap-2 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-[#131315]/90 backdrop-blur-md text-[var(--color-primary)] font-mono text-[11px] font-semibold">
                      {product.category || 'B2B SAAS PLATFORM'}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#1bbd85]/30 text-[#4edea3] font-mono text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                      {product.statusBadge || 'LIVE IN PROD'}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-xl font-bold text-[#e5e1e4] group-hover:text-[var(--color-primary)] transition-colors">
                        {product.title}
                      </h3>
                      <span className="font-mono text-xs text-[#4edea3] font-semibold">
                        <AnimatedCounter
                          value={product.metricHighlight || '+240% User Activation'}
                          duration={1.8}
                        />
                      </span>
                    </div>

                    <p className="text-[#bcc9cd] text-sm mt-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {(product.tags || []).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#2a2a2c] text-[#869397] font-mono text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 flex items-center justify-between border-t border-[#2a2a2c]/60">
                    <button
                      onClick={() => onOpenCaseStudy(product)}
                      className="font-medium text-xs text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer group/btn"
                    >
                      <span>View Case Study & Architecture Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </button>

                    <div className="flex items-center gap-3">
                      {product.url ? (
                        <motion.a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                          whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                          transition={springHover}
                          className="px-2.5 py-1 rounded-md bg-[#2a2a2c] hover:bg-[#353437] text-xs text-[#e5e1e4] font-medium inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Visit</span>
                          <ExternalLink className="w-3 h-3" />
                        </motion.a>
                      ) : null}

                      <span className="font-mono text-[11px] text-[#869397]">
                        {product.metricLabel || '<50ms Latency'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
