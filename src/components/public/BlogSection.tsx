import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { BlogPost } from '../../types';
import {
  Clock,
  ArrowUpRight,
  FileText,
  Copy,
  Check,
  X,
  ThumbsUp,
} from 'lucide-react';
import {
  cubicEntrance,
  defaultViewport,
  fadeUpVariant,
  staggerContainer,
} from '../../lib/animations';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export function BlogSection({ blogs }: BlogSectionProps) {
  const [selectedPaper, setSelectedPaper] = useState<BlogPost | null>(null);
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [voteCount, setVoteCount] = useState<Record<string, number>>({});
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!selectedPaper) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPaper(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPaper]);

  if (!blogs || blogs.length === 0) return null;

  const publishedBlogs = blogs.filter((b) => b.isActive && b.status === 'published');
  if (publishedBlogs.length === 0) return null;

  const handleVote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setVoteCount((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleCopyBibtex = (paper: BlogPost) => {
    const bibtex = `@article{rusatech_${paper.slug.replace(/-/g, '_')},\n  title={${paper.title}},\n  author={RUSA TECH Architecture Labs},\n  journal={RUSA TECH Engineering Reports},\n  year={2024},\n  doi={${paper.doi || '10.1145/rusatech.2024.01'}}\n}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2500);
  };

  return (
    <section className="w-full px-5 lg:px-12 py-20 relative" id="blog">
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
              // 07: TECHNICAL PAPERS & ENGINEERING WHITEPAPERS
            </motion.span>
            <motion.h2
              variants={fadeUpVariant(0.08, 25, 0.7)}
              style={{ willChange: 'transform' }}
              className="font-heading text-3xl sm:text-4xl font-bold text-[#e5e1e4]"
            >
              Architecture Analysis & Benchmark Reports
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUpVariant(0.16, 25, 0.7)}
            style={{ willChange: 'transform' }}
            className="text-[#869397] text-sm max-w-md"
          >
            In-depth engineering postmortems, low-latency protocol investigations, and systems performance benchmarks.
          </motion.p>
        </motion.div>

        {/* Papers Grid with 0.1s stagger */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer(0.1, 0.1)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {publishedBlogs.map((blog) => {
            const votes = (blog.helpfulVotes || 24) + (voteCount[blog._id] || 0);

            return (
              <motion.div
                key={blog._id}
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
                onClick={() => setSelectedPaper(blog)}
                className="bg-[#201f22]/90 backdrop-blur-md rounded-2xl overflow-hidden border border-[#3d494c]/40 transition-colors flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Cover with scale 1.1->1 entry and 1.05 zoom on hover */}
                  {blog.coverImage ? (
                    <div className="h-44 w-full overflow-hidden bg-[#2a2a2c]">
                      <motion.img
                        initial={shouldReduceMotion ? false : { scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        viewport={defaultViewport}
                        transition={{ duration: 0.8, ease: cubicEntrance }}
                        src={blog.coverImage}
                        alt={blog.title}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('aida-public')) {
                            target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXmSZ94v_M04GhLcnLoA_K4Ncag4bbtM-AFxUrPHFmxEzeznXNMwPZCOnR7MiZ-gj9FpwT9f8cXyG1ZcUxYS1OMPL0E8BEjDSCCG57gfglehilPrK03-LG6Rrxw0D-rq7jqlUErdSe0Si_MOK1ijyPukXVrBE8OZgX5ENOFPop5cMmJ07foicV7nMCwDzlOxkv1zNEpB0LOE7qLP1mSfpfps3JDzJB8Ps68iX2bbaPHSYUHvviN18';
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ willChange: 'transform' }}
                      />
                    </div>
                  ) : (
                    <div className="h-32 w-full bg-gradient-to-br from-[#2a2a2c] to-[#1c1c1e] p-5 flex flex-col justify-between border-b border-[#3d494c]/30">
                      <div className="flex items-center justify-between font-mono text-[11px] text-[var(--color-primary)]">
                        <span>RUSATECH-LAB-DOC</span>
                        <span>DOI: {blog.doi || '10.1145/2024.08'}</span>
                      </div>
                      <FileText className="w-8 h-8 text-[var(--color-primary)]/40 group-hover:text-[var(--color-primary)] transition-colors" />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Tags and Read time */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {blog.tags?.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded border border-[var(--color-primary)]/20"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-xs font-mono text-[#869397] flex items-center gap-1 ml-auto">
                        <Clock className="w-3 h-3" />
                        {blog.readTime || '7 min read'}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-[#e5e1e4] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>

                    <p className="text-[#869397] text-xs leading-relaxed mt-2.5 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#3d494c]/30 mt-auto">
                  <span className="text-xs font-mono text-[var(--color-primary)] flex items-center gap-1 group/link">
                    <span>Read Whitepaper</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5" />
                  </span>

                  <button
                    onClick={(e) => handleVote(blog._id, e)}
                    className="flex items-center gap-1.5 text-xs font-mono text-[#869397] hover:text-[#4edea3] transition-colors px-2 py-1 rounded bg-[#2a2a2c]/60 border border-[#3d494c]/30 cursor-pointer"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{votes}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Whitepaper Detail Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedPaper && (
          <div
            onClick={() => setSelectedPaper(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto cursor-pointer"
          >
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: cubicEntrance }}
              className="relative w-full max-w-4xl bg-[#1b1b1d] rounded-2xl border border-[#3d494c]/60 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden my-8 max-h-[90vh] flex flex-col cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 sm:p-8 border-b border-[#3d494c]/40 flex items-start justify-between bg-[#201f22]/80">
                <div className="space-y-2 pr-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-0.5 rounded border border-[var(--color-primary)]/20">
                      Peer-Reviewed Paper
                    </span>
                    {selectedPaper.doi && (
                      <span className="font-mono text-xs text-[#869397]">
                        DOI: {selectedPaper.doi}
                      </span>
                    )}
                    <span className="font-mono text-xs text-[#869397]">
                      Published: {selectedPaper.publishedAt ? new Date(selectedPaper.publishedAt).toLocaleDateString() : 'Active Architecture Report'}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                    {selectedPaper.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="p-2 rounded-xl bg-[#2a2a2c] hover:bg-[#353437] text-[#bcc9cd] hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#bcc9cd]">
                {/* Abstract */}
                <div className="p-4 rounded-xl bg-[#252427] border-l-4 border-[var(--color-primary)]">
                  <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] font-bold mb-1">
                    Abstract
                  </div>
                  <p className="text-sm leading-relaxed text-[#e5e1e4]">
                    {selectedPaper.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedPaper.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-3 py-1 rounded bg-[#2a2a2c] border border-[#3d494c]/40 text-[#bcc9cd]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Full Content */}
                <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-[#3d494c]/30 pt-6">
                  {selectedPaper.content}
                </div>
              </div>

              {/* Footer with citation actions */}
              <div className="p-4 sm:p-6 border-t border-[#3d494c]/40 bg-[#201f22] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => handleCopyBibtex(selectedPaper)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-white text-xs font-mono border border-[#3d494c]/40 transition-colors cursor-pointer"
                >
                  {copiedBibtex ? (
                    <>
                      <Check className="w-4 h-4 text-[#4edea3]" />
                      <span>BibTeX Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[var(--color-primary)]" />
                      <span>Copy BibTeX Citation</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedPaper(null)}
                  className="px-5 py-2 rounded-lg bg-[var(--color-primary)] text-black text-xs font-mono font-semibold hover:brightness-110 transition-all cursor-pointer"
                >
                  Close Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
