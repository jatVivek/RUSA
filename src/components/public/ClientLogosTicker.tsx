import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers, ShieldAlert, ShoppingBag, Network } from 'lucide-react';

export function ClientLogosTicker() {
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  const clientLogos = [
    {
      name: 'LINEARFORM',
      icon: <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />,
    },
    {
      name: 'KINETIC PAY',
      icon: <Layers className="w-5 h-5 text-[var(--color-secondary)]" />,
    },
    {
      name: 'NOVUS HEALTH',
      icon: <ShieldAlert className="w-5 h-5 text-[#4edea3]" />,
    },
    {
      name: 'AURA COMMERCE',
      icon: <ShoppingBag className="w-5 h-5 text-[var(--color-primary)]" />,
    },
    {
      name: 'NEXUS DATA',
      icon: <Network className="w-5 h-5 text-[var(--color-secondary)]" />,
    },
  ];

  // Repeat for continuous seamless loop
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="w-full py-8 bg-[#0e0e10]/70 border-y border-[#2a2a2c]/40 overflow-hidden relative">
      {/* Edge gradient fades for seamless marquee blending */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0e0e10] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0e0e10] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-4 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[#869397] px-5">
          Trusted by ambitious founders, engineering leads, and scaling enterprises
        </p>

        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex items-center gap-14 w-max"
            animate={
              shouldReduceMotion || isPaused
                ? undefined
                : {
                    x: ['0%', '-50%'],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: 'linear',
            }}
            style={{ willChange: 'transform' }}
          >
            {duplicatedLogos.map((client, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 font-heading text-lg font-bold text-[#e5e1e4] tracking-tight opacity-75 hover:opacity-100 transition-opacity whitespace-nowrap cursor-default px-2"
              >
                {client.icon}
                <span>{client.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
