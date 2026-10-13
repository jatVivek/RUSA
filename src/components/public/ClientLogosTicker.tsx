import React from 'react';
import { Layers, ShieldAlert, ShoppingBag, Network } from 'lucide-react';

export function ClientLogosTicker() {
  return (
    <section className="w-full px-5 lg:px-12 py-8 bg-[#0e0e10]/70 border-y border-[#2a2a2c]/40">
      <div className="max-w-7xl mx-auto space-y-4 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[#869397]">
          Trusted by ambitious founders, engineering leads, and scaling enterprises
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75">
          <div className="flex items-center gap-2 font-heading text-lg font-bold text-[#e5e1e4] tracking-tight">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
            LINEARFORM
          </div>
          <div className="flex items-center gap-2 font-heading text-lg font-bold text-[#e5e1e4] tracking-tight">
            <Layers className="w-5 h-5 text-[var(--color-secondary)]" />
            KINETIC PAY
          </div>
          <div className="flex items-center gap-2 font-heading text-lg font-bold text-[#e5e1e4] tracking-tight">
            <ShieldAlert className="w-5 h-5 text-[#4edea3]" />
            NOVUS HEALTH
          </div>
          <div className="flex items-center gap-2 font-heading text-lg font-bold text-[#e5e1e4] tracking-tight">
            <ShoppingBag className="w-5 h-5 text-[var(--color-primary)]" />
            AURA COMMERCE
          </div>
          <div className="flex items-center gap-2 font-heading text-lg font-bold text-[#e5e1e4] tracking-tight">
            <Network className="w-5 h-5 text-[var(--color-secondary)]" />
            NEXUS DATA
          </div>
        </div>
      </div>
    </section>
  );
}
