import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion, animate, useSpring, useMotionValue, HTMLMotionProps } from 'framer-motion';

// Technical easing curves
export const cubicEntrance = [0.22, 1, 0.36, 1] as const;
export const springHover = { type: 'spring' as const, stiffness: 120, damping: 18 };

export const defaultViewport = { once: true, amount: 0.2 };

// Reusable motion variants
export const fadeUpVariant = (delay = 0, distance = 30, duration = 0.7) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: cubicEntrance,
      delay,
    },
  },
});

export const fadeDownVariant = (delay = 0, distance = 20, duration = 0.6) => ({
  hidden: { opacity: 0, y: -distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: cubicEntrance,
      delay,
    },
  },
});

export const scaleInVariant = (delay = 0, duration = 0.6) => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      ease: cubicEntrance,
      delay,
    },
  },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Section Header Reveal Component
interface SectionHeaderProps {
  eyebrow?: string;
  heading: React.ReactNode;
  subtext?: string;
  className?: string;
  align?: 'left' | 'center' | 'between';
}

export function SectionHeader({
  eyebrow,
  heading,
  subtext,
  className = '',
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer(0.12)}
      className={`space-y-2 ${className}`}
    >
      {eyebrow && (
        <motion.div
          variants={fadeUpVariant(0, 20, 0.6)}
          style={{ willChange: 'transform' }}
          className="font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]"
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        variants={fadeUpVariant(0.08, 25, 0.7)}
        style={{ willChange: 'transform' }}
        className="font-heading text-3xl sm:text-4xl font-bold text-[#e5e1e4]"
      >
        {heading}
      </motion.h2>
      {subtext && (
        <motion.p
          variants={fadeUpVariant(0.16, 25, 0.7)}
          style={{ willChange: 'transform' }}
          className="text-[#869397] text-sm max-w-xl leading-relaxed"
        >
          {subtext}
        </motion.p>
      )}
    </motion.div>
  );
}

// Animated Counter with EaseOutExpo
interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1.8,
  className = '',
}: AnimatedCounterProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<string>(String(value));
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Parse prefix, number, decimal places, and suffix
  // Examples: "$1.4M", "99.99%", "77%", "38.8%", "50+", "<50ms", "10+ Yrs", "0.8s"
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(String(value));
      return;
    }

    const rawStr = String(value).trim();
    const match = rawStr.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

    if (!match) {
      setDisplayValue(rawStr);
      return;
    }

    const prefix = match[1] || '';
    const numericTarget = parseFloat(match[2]);
    const suffix = match[3] || '';
    const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const controls = animate(0, numericTarget, {
            duration,
            // easeOutExpo
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => {
              setDisplayValue(
                `${prefix}${decimals > 0 ? latest.toFixed(decimals) : Math.round(latest)}${suffix}`
              );
            },
          });

          return () => controls.stop();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated, shouldReduceMotion]);

  return (
    <span ref={elementRef} className={className}>
      {shouldReduceMotion ? value : displayValue}
    </span>
  );
}

// Interactive Magnetic CTA Button
interface MagneticButtonProps extends HTMLMotionProps<'a'> {
  children: React.ReactNode;
  glow?: boolean;
}

export function MagneticButton({
  children,
  className = '',
  glow = true,
  ...props
}: MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.25;
    const distanceY = (e.clientY - centerY) * 0.25;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? undefined : { x: smoothX, y: smoothY, willChange: 'transform' }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.03,
              boxShadow: glow
                ? '0 0 35px rgba(6, 182, 212, 0.55), 0 0 15px rgba(139, 92, 246, 0.4)'
                : undefined,
              transition: springHover,
            }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      className={`relative inline-flex items-center justify-center transition-shadow ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
}

// Ambient Cursor Following Glow
export function AmbientCursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed pointer-events-none z-30 w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px] bg-[radial-gradient(circle,rgba(6,182,212,0.4)_0%,rgba(139,92,246,0.25)_40%,transparent_70%)]"
      style={{
        left: smoothX,
        top: smoothY,
        willChange: 'transform',
      }}
    />
  );
}

// Ambient Drifting Gradient Orbs in Background (20s slow loop)
export function AmbientOrbs() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      <motion.div
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.06)_0%,transparent_70%)] blur-[120px]"
        style={{ willChange: 'transform' }}
      />
      <motion.div
        animate={{
          x: [0, -70, 60, 0],
          y: [0, 80, -50, 0],
          scale: [1, 0.95, 1.12, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-2/3 -right-32 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_70%)] blur-[140px]"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
