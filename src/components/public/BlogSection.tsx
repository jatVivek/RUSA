import React, { useState } from 'react';
import { BlogPost } from '../../types';
import {
  BookOpen,
  Clock,
  ArrowUpRight,
  FileText,
  Copy,
  Check,
  Share2,
  X,
  ThumbsUp,
  Tag,
} from 'lucide-react';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export function BlogSection({ blogs }: BlogSectionProps) {
  const [selectedPaper, setSelectedPaper] = useState<BlogPost | null>(null);
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [voteCount, setVoteCount] = useState<Record<string, number>>({});

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
    const bibtex = `@article{synthetix_${paper.slug.replace(/-/g, '_')},\n  title={${paper.title}},\n  author={Synthetix Architecture Labs},\n  journal={Synthetix Engineering Reports},\n  year={2024},\n  doi={${paper.doi || '10.1145/synthetix.2024.01'}}\n}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2500);
  };

  return (
    <section className="w-full px-5 lg:px-12 py-20 relative" id="blog">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
              // 07: TECHNICAL PAPERS & ENGINEERING WHITEPAPERS
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#e5e1e4] mt-2">
              Architecture Analysis & Benchmark Reports
            </h2>
          </div>
          <p className="text-[#869397] text-sm max-w-md">
            In-depth engineering postmortems, low-latency protocol investigations, and systems performance benchmarks.
          </p>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedBlogs.map((blog) => {
            const votes = (blog.helpfulVotes || 24) + (voteCount[blog._id] || 0);

            return (
              <div
                key={blog._id}
                onClick={() => setSelectedPaper(blog)}
                className="bg-[#201f22]/90 backdrop-blur-md rounded-2xl overflow-hidden border border-[#3d494c]/40 hover:border-[var(--color-primary)]/50 transition-all flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] cursor-pointer"
              >
                <div>
                  {/* Cover or Monospace Banner */}
                  {blog.coverImage ? (
                    <div className="h-44 w-full overflow-hidden bg-[#2a2a2c]">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-32 w-full bg-gradient-to-br from-[#2a2a2c] to-[#1c1c1e] p-5 flex flex-col justify-between border-b border-[#3d494c]/30">
                      <div className="flex items-center justify-between font-mono text-[11px] text-[var(--color-primary)]">
                        <span>SYNTHETIX-LAB-DOC</span>
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
                  <span className="text-xs font-mono text-[var(--color-primary)] flex items-center gap-1 group-hover:gap-2 transition-all">
                    <span>Read Whitepaper</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    onClick={(e) => handleVote(blog._id, e)}
                    className="flex items-center gap-1.5 text-xs font-mono text-[#869397] hover:text-[#4edea3] transition-colors px-2 py-1 rounded bg-[#2a2a2c]/60 border border-[#3d494c]/30 cursor-pointer"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{votes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Whitepaper Detail Modal */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div
            className="relative w-full max-w-4xl bg-[#1b1b1d] rounded-2xl border border-[#3d494c]/60 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden my-8 max-h-[90vh] flex flex-col"
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
                    Published: {new Date(selectedPaper.publishedAt).toLocaleDateString()}
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
          </div>
        </div>
      )}
    </section>
  );
}
