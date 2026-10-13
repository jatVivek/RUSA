import React from 'react';
import { ProductItem } from '../../types';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface FeaturedProjectsSectionProps {
  products: ProductItem[];
  onOpenCaseStudy: (product?: ProductItem) => void;
}

export function FeaturedProjectsSection({
  products,
  onOpenCaseStudy,
}: FeaturedProjectsSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full px-5 lg:px-12 py-20" id="featured-projects">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
              // 01: FEATURED CLIENT WORK
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#e5e1e4] mt-2">
              Production Web Applications We've Shipped
            </h2>
          </div>
          <p className="text-[#869397] text-sm max-w-md">
            Every project is engineered with high code standards, ultra-low latency, and conversion-focused UX architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => {
            const coverImg =
              product.images?.[0] ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hQX_71e363t0WKA5wsEHXD99U5DcfthqsDvEAK30kKBzJgLSCvpoMdstHdoIo2voJ4HCoLfbORMU7dIyC61GXO-th-RNwie971yBgquKzwn4qkrRvt0vp8WtVA9xUyMpu-QCVDw530109VoDX7VbK6xK8UK1uVLQgydgZC5m-i7YA-lJ7Jtt32EWBtY_V5JEmXW3blBj1q8SvFuPyuhCjCU5N8TRN4FjH9OucatEGansE9oNrpU';

            return (
              <div
                key={product._id}
                className="bg-[#201f22] rounded-2xl overflow-hidden flex flex-col group border border-[#3d494c]/40 shadow-lg hover:shadow-[0_0_35px_rgba(76,215,246,0.18)] transition-all"
              >
                {/* Image Container with Category Badge */}
                <div className="relative h-64 w-full overflow-hidden bg-[#353437]">
                  <img
                    src={coverImg}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#131315]/90 backdrop-blur-md text-[var(--color-primary)] font-mono text-[11px] font-semibold">
                      {product.category || 'B2B SAAS PLATFORM'}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#1bbd85]/30 text-[#4edea3] font-mono text-[11px]">
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
                        {product.metricHighlight || '+240% User Activation'}
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
                      className="font-medium text-xs text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer"
                    >
                      <span>View Case Study & Architecture Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-3">
                      {/* Show Visit button ONLY if url exists (as per acceptance criteria!) */}
                      {product.url ? (
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-md bg-[#2a2a2c] hover:bg-[#353437] text-xs text-[#e5e1e4] font-medium inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Visit</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : null}

                      <span className="font-mono text-[11px] text-[#869397]">
                        {product.metricLabel || '<50ms Latency'}
                      </span>
                    </div>
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
