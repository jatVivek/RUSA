import React, { useState } from 'react';
import { loginAdmin } from '../../services/api';
import { AdminUser } from '../../types';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, X } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: (user: AdminUser) => void;
  onCancel: () => void;
}

export function AdminLogin({ onSuccess, onCancel }: AdminLoginProps) {
  const [email, setEmail] = useState('admin@synthetix.studio');
  const [password, setPassword] = useState('admin123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user } = await loginAdmin(email, password);
      onSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@synthetix.studio');
    setPassword('admin123456');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Background Accent */}
      <div className="absolute w-[500px] h-[500px] bg-[var(--color-primary)]/15 blur-[140px] rounded-full pointer-events-none" />

      <div
        className="w-full max-w-md bg-[#1b1b1d] rounded-2xl border border-[#3d494c]/60 p-8 shadow-2xl relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#869397] hover:text-white hover:bg-[#2a2a2c] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-white">
            Synthetix CMS Command Center
          </h2>
          <p className="text-xs font-mono text-[#869397]">
            Authenticated Admin Access // Full System Control
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#bcc9cd] mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#869397] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@synthetix.studio"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white placeholder-[#869397] focus:outline-none focus:border-[var(--color-primary)] font-mono transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#bcc9cd] mb-1.5">
              Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#869397] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 text-sm text-white placeholder-[#869397] focus:outline-none focus:border-[var(--color-primary)] font-mono transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-sm hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'Authenticating Session...' : 'Enter Admin Console'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Quick Access */}
        <div className="mt-6 pt-5 border-t border-[#3d494c]/30 text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-xs font-mono text-[var(--color-primary)] border border-[var(--color-primary)]/20 cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Default Seed Credentials</span>
          </button>
          <p className="text-[11px] text-[#869397] font-mono mt-2">
            admin@synthetix.studio / admin123456
          </p>
        </div>
      </div>
    </div>
  );
}
