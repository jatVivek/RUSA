import React, { useState } from 'react';
import { submitContactForm } from '../../services/api';
import { Send, CheckCircle2, AlertCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  contactEmail?: string;
  phone?: string;
}

export function ContactSection({ contactEmail, phone }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'High-Performance SaaS Build',
    budget: '$25,000 - $50,000',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and project scope.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: 'High-Performance SaaS Build',
        budget: '$25,000 - $50,000',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to dispatch brief. Please try again.');
    }
  };

  return (
    <section className="w-full px-5 lg:px-12 py-24 relative overflow-hidden" id="audit-booking">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[var(--color-primary)]/10 via-[var(--color-secondary)]/10 to-[#10b981]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
            // 08: PROJECT SCOPING & ARCHITECTURAL AUDIT
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#e5e1e4] mt-2 tracking-tight">
            Initiate Your Engineering Engagement
          </h2>
          <p className="text-[#869397] text-base mt-4 leading-relaxed">
            Directly interface with our principal engineering team. Submit your system requirements, target launch deadline, and scope for a formal architecture review.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#201f22]/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-[#3d494c]/50 shadow-2xl">
            {status === 'success' ? (
              <div className="py-12 px-4 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 text-[#4edea3] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white">
                  Project Brief Received
                </h3>
                <p className="text-[#869397] text-sm max-w-md mx-auto">
                  Your scoping request has been routed to our lead architect. You will receive a technical response and scheduling link within 4 business hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-white text-xs font-mono border border-[#3d494c]/40 cursor-pointer transition-colors"
                >
                  Submit Another Scope
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 flex items-center gap-3 text-red-300 text-xs font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#bcc9cd] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-4 py-3 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-white placeholder-[#869397] focus:outline-none focus:border-[var(--color-primary)] text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#bcc9cd] mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@acme.inc"
                      className="w-full px-4 py-3 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-white placeholder-[#869397] focus:outline-none focus:border-[var(--color-primary)] text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#bcc9cd] mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Technologies"
                      className="w-full px-4 py-3 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-white placeholder-[#869397] focus:outline-none focus:border-[var(--color-primary)] text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#bcc9cd] mb-2">
                      Project Discipline
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-white focus:outline-none focus:border-[var(--color-primary)] text-sm transition-colors"
                    >
                      <option value="High-Performance SaaS Build">High-Performance SaaS Build</option>
                      <option value="Speed & TTFB Optimization Audit">Speed & TTFB Optimization Audit</option>
                      <option value="Cloud & Database Architecture">Cloud & Database Architecture</option>
                      <option value="Design System & UI/UX Engineering">Design System & UI/UX Engineering</option>
                      <option value="Full Retainer / Advisory">Full Retainer / Advisory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#bcc9cd] mb-2">
                    Estimated Budget Allocation
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['$10k - $25k', '$25k - $50k', '$50k+'].map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setFormData({ ...formData, budget: tier })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-mono text-center border transition-all cursor-pointer ${
                          formData.budget === tier
                            ? 'bg-[var(--color-primary)] text-black font-semibold border-[var(--color-primary)] shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                            : 'bg-[#2a2a2c] text-[#bcc9cd] border-[#3d494c]/40 hover:border-[#869397]'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#bcc9cd] mb-2">
                    System Architecture & Technical Scope *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current tech stack, target throughput, core bottlenecks, and anticipated timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-white placeholder-[#869397] focus:outline-none focus:border-[var(--color-primary)] text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] text-white font-medium text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === 'submitting' ? 'Transmitting Scoping Brief...' : 'Transmit Scoping Brief'}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: SLA Guarantees & Contact Direct */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#201f22]/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-[#3d494c]/50 space-y-6">
              <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#4edea3]" />
                <span>Our Engineering SLA Commitments</span>
              </h3>

              <div className="space-y-4 text-xs font-mono text-[#bcc9cd]">
                <div className="p-3.5 rounded-xl bg-[#2a2a2c]/60 border border-[#3d494c]/30 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-semibold">4-Hour Response Turnaround</div>
                    <div className="text-[#869397] mt-0.5">Every scoping submission is reviewed directly by a staff engineer.</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#2a2a2c]/60 border border-[#3d494c]/30 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[var(--color-secondary)] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-semibold">Strict Mutual NDA Protocol</div>
                    <div className="text-[#869397] mt-0.5">Your proprietary codebase details and architecture remain confidential.</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#2a2a2c]/60 border border-[#3d494c]/30 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#4edea3] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-semibold">Fixed Milestones & Transparent Delivery</div>
                    <div className="text-[#869397] mt-0.5">Continuous integration previews, git branch audits, and zero scope drift.</div>
                  </div>
                </div>
              </div>

              {/* Direct Info */}
              <div className="pt-4 border-t border-[#3d494c]/40 space-y-2">
                <div className="text-xs font-mono text-[#869397]">Direct Engineering Inquiries:</div>
                <div className="text-sm font-mono text-[var(--color-primary)] font-semibold">
                  {contactEmail || 'lead@synthetix.studio'}
                </div>
                {phone && (
                  <div className="text-xs font-mono text-[#bcc9cd]">
                    Tel: {phone}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
