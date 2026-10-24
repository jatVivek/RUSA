import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ProductItem } from '../../types';
import { cubicEntrance } from '../../lib/animations';
import {
  X,
  Zap,
  Play,
  FileText,
  Code,
  CheckCircle,
  AlertTriangle,
  Server,
  Layers,
  ArrowRight,
  ShieldCheck,
  Quote,
  Activity,
  Cpu,
  Radio,
} from 'lucide-react';

interface CaseStudyModalProps {
  product?: ProductItem | null;
  onClose: () => void;
}

export function CaseStudyModal({ product, onClose }: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<'prompt' | 'latent' | 'lora'>('prompt');
  const [demoRunning, setDemoRunning] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center p-3 sm:p-6 lg:p-10 cursor-pointer"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: cubicEntrance }}
        className="relative w-full max-w-6xl bg-[#131315] border border-[#3d494c]/50 rounded-2xl shadow-2xl overflow-hidden my-auto text-[#e5e1e4] cursor-default"
      >
        {/* Top Dismiss Button */}
        <button
          onClick={onClose}
          aria-label="Close case study"
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-[#1c1b1d]/90 text-[#869397] hover:text-white hover:bg-[#2a2a2c] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Top Glow */}
        <div className="absolute -top-32 left-1/4 w-[600px] h-[400px] bg-[var(--color-primary)]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="p-6 sm:p-10 lg:p-14 space-y-12">
          {/* Header & Breadcrumbs */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#869397]">
                <span>Deployments</span>
                <span>/</span>
                <span>Case Studies</span>
                <span>/</span>
                <span className="text-[#e5e1e4] font-semibold">
                  {product?.title || 'NeuralStream V3'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#1c1b1d] px-3 py-1 rounded-full border border-[#3d494c]/30">
                <span className="h-2 w-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3] animate-pulse" />
                <span className="font-mono text-xs text-[#4edea3] font-semibold">PRODUCTION LIVE v3.4</span>
                <span className="text-[#869397] mx-1">•</span>
                <span className="font-mono text-xs text-[#869397]">CONFIDENTIAL SERIES B CLIENT</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#201f22] text-[var(--color-primary)] font-mono text-xs">
              <Zap className="w-3.5 h-3.5" />
              <span>WEBGPU + DISTRIBUTED PYTORCH CLUSTER</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#e5e1e4] leading-tight">
              Sub-80ms Real-Time Multi-Modal Diffusion Pipeline Handling{' '}
              <span className="bg-gradient-to-r from-[var(--color-primary)] via-[#acedff] to-[var(--color-secondary)] bg-clip-text text-transparent">
                45M Daily Inferences
              </span>
            </h1>

            <p className="text-[#bcc9cd] text-base lg:text-lg max-w-4xl leading-relaxed">
              Architected a zero-cold-start generative canvas for an enterprise creative suite. By fusing custom low-level TensorRT-LLM kernels, predictive denoising skip-steps, and client-side WebGPU acceleration, RUSA TECH collapsed interactive latency by 77%.
            </p>
          </div>

          {/* Key Project Metadata Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[#1c1b1d] rounded-xl border border-[#3d494c]/30">
            <div className="p-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397] block">
                Target Studio
              </span>
              <span className="font-heading text-base font-semibold text-[#e5e1e4]">
                San Francisco AI Lab
              </span>
              <span className="font-mono text-xs text-[#869397] block mt-0.5">Series B Enterprise Suite</span>
            </div>
            <div className="p-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397] block">
                Delivery Cycle
              </span>
              <span className="font-heading text-base font-semibold text-[#e5e1e4]">
                8 Weeks Turnkey
              </span>
              <span className="font-mono text-xs text-[#869397] block mt-0.5">Concept to Global GA</span>
            </div>
            <div className="p-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397] block">
                Throughput Uptime
              </span>
              <span className="font-heading text-base font-semibold text-[#4edea3]">
                99.991% SLA
              </span>
              <span className="font-mono text-xs text-[#869397] block mt-0.5">Zero dropped streams</span>
            </div>
            <div className="p-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397] block">
                Hardware Envelope
              </span>
              <span className="font-heading text-base font-semibold text-[#e5e1e4]">
                128x NVIDIA H100
              </span>
              <span className="font-mono text-xs text-[#869397] block mt-0.5">Modal + Sovereign Clusters</span>
            </div>
          </div>

          {/* Interactive Simulation & HUD */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-primary)]">
                  Spatial Node Workspace
                </span>
                <h3 className="font-heading text-xl font-bold text-[#e5e1e4]">
                  Interactive Canvas Telemetry & Node Flow
                </h3>
              </div>
              <span className="font-mono text-xs text-[#869397]">
                Live Pipeline Feed: Node_TX_492 // Latency Budget: &lt;80ms
              </span>
            </div>

            <div className="rounded-xl bg-[#201f22] border border-[#3d494c]/40 overflow-hidden shadow-2xl">
              {/* Top Engine Bar */}
              <div className="bg-[#2a2a2c] px-4 py-2 flex items-center justify-between border-b border-[#3d494c]/40 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[#869397] ml-2 hidden sm:inline">
                    neuralstream-runtime-v3://client-preview/session-89240
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-[#4edea3] flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                    60.2 FPS
                  </span>
                  <span className="text-[var(--color-primary)] font-semibold">
                    0.041s Latency
                  </span>
                  <span className="text-[#869397] hidden md:inline">Shader Cache: 100% Warm</span>
                </div>
              </div>

              {/* Viewport Simulation */}
              <div className="relative min-h-[420px] bg-[#131315] flex flex-col justify-between p-6 overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDovZnkwSIWfH25osOnV4OgjZhxZPV-6_xngTLo1Iv23wSR4Vi_lHJI9eO45EVG9ZzdPm7D8H8ElrrNnYuJRKycHlq6_8jLy9fId0ktesUCt8iQj7YlGwrUbu2XQqIpQsBKK3s5QL5wNuVeuhMzlh3ckERKwook_pSliO9Vboc7TK3C4Vyy2olPvOQUbwtey5Wn1PeOGx00kq1mrTF-lA0X2M4opNRQvagUEsIOv7FbtUrrZmZLYYI"
                    alt="Generative Canvas Visual"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Top Overlay Chips */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1 bg-[#0e0e10]/90 backdrop-blur-md p-1 rounded-lg">
                    <button
                      onClick={() => setActiveTab('prompt')}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === 'prompt'
                          ? 'bg-[#2a2a2c] text-[var(--color-primary)] font-semibold'
                          : 'text-[#869397]'
                      }`}
                    >
                      Prompt Graph
                    </button>
                    <button
                      onClick={() => setActiveTab('latent')}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === 'latent'
                          ? 'bg-[#2a2a2c] text-[var(--color-primary)] font-semibold'
                          : 'text-[#869397]'
                      }`}
                    >
                      Latent Inpainting
                    </button>
                    <button
                      onClick={() => setActiveTab('lora')}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === 'lora'
                          ? 'bg-[#2a2a2c] text-[var(--color-primary)] font-semibold'
                          : 'text-[#869397]'
                      }`}
                    >
                      Multi-LoRA Stack
                    </button>
                  </div>

                  <div className="flex items-center gap-2 bg-[#0e0e10]/90 backdrop-blur-md px-3 py-1 rounded-lg font-mono text-xs">
                    <span className="text-[#869397]">Step:</span>
                    <span className="text-[#e5e1e4] font-semibold">12/12 (Speculative 4x Skip)</span>
                    <span className="text-[#869397] mx-1">|</span>
                    <span className="text-[var(--color-primary)]">us-west-prod-node08</span>
                  </div>
                </div>

                {/* Center 3 Nodes */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  {/* Node 1 */}
                  <div className="bg-[#1c1b1d]/95 backdrop-blur-lg p-4 rounded-xl border border-[#3d494c]/40">
                    <div className="flex items-center justify-between pb-1 mb-1">
                      <span className="font-mono text-xs text-[var(--color-primary)] font-bold">
                        NODE #01 — AUDIO/TEXT INPUT
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                    </div>
                    <p className="text-xs text-[#e5e1e4] mt-1">
                      Vectorized real-time speech prompt stream: "Hyper-realistic cybernetic biomechanics"
                    </p>
                    <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#869397]">
                      <span>Confidence: 99.4%</span>
                      <span className="text-[var(--color-primary)]">140 t/s</span>
                    </div>
                  </div>

                  {/* Node 2 */}
                  <div className="bg-[#2a2a2c]/95 backdrop-blur-lg p-4 rounded-xl border border-[var(--color-secondary)]/40">
                    <div className="flex items-center justify-between pb-1 mb-1">
                      <span className="font-mono text-xs text-[var(--color-secondary)] font-bold">
                        NODE #02 — DENOISER ENGINE
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[var(--color-secondary)] animate-ping" />
                    </div>
                    <p className="text-xs text-[#e5e1e4] mt-1">
                      FlashAttention-3 + TensorRT Kernel. Denoising window compressed to 18ms per pass.
                    </p>
                    <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#869397]">
                      <span>VRAM Allocation</span>
                      <span className="text-[var(--color-secondary)] font-semibold">4.8 GB / Node</span>
                    </div>
                  </div>

                  {/* Node 3 */}
                  <div className="bg-[#1c1b1d]/95 backdrop-blur-lg p-4 rounded-xl border border-[#4edea3]/40">
                    <div className="flex items-center justify-between pb-1 mb-1">
                      <span className="font-mono text-xs text-[#4edea3] font-bold">
                        NODE #03 — ZERO-COPY DISPLAY
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[#4edea3]" />
                    </div>
                    <p className="text-xs text-[#e5e1e4] mt-1">
                      WebGPU texture binding on canvas buffer directly from WebRTC DataChannel.
                    </p>
                    <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#869397]">
                      <span>Raster Latency</span>
                      <span className="text-[#4edea3] font-semibold">3.2 ms</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Visualizer Ribbon */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-[#0e0e10]/90 backdrop-blur-md p-3 rounded-lg border border-[#3d494c]/30">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-[var(--color-primary)]" />
                    <div className="flex items-end gap-1 h-5">
                      <span className="w-1 bg-[var(--color-primary)] h-2 rounded-full animate-pulse" />
                      <span className="w-1 bg-[var(--color-primary)] h-4 rounded-full" />
                      <span className="w-1 bg-[var(--color-primary)] h-2.5 rounded-full" />
                      <span className="w-1 bg-[#acedff] h-5 rounded-full animate-pulse" />
                      <span className="w-1 bg-[var(--color-secondary)] h-4 rounded-full" />
                      <span className="w-1 bg-[var(--color-secondary)] h-2 rounded-full" />
                      <span className="w-1 bg-[#4edea3] h-3.5 rounded-full" />
                    </div>
                    <span className="font-mono text-xs text-[#869397]">
                      Stream Synced: Audio-Driven Pose Shift
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-[#4edea3] bg-[#1bbd85]/10 px-2 py-0.5 rounded">GPU Temp: 48°C</span>
                    <span className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded">
                      Bitrate: 34 Mbps
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quantified Architectural Impact Bento Grid */}
          <div className="space-y-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#4edea3]">
                Mission Outcome
              </span>
              <h3 className="font-heading text-2xl font-bold text-[#e5e1e4]">
                Quantified Architectural Impact
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Item 1 */}
              <div className="bg-[#201f22] p-6 rounded-xl flex flex-col justify-between border border-[#3d494c]/30 shadow-md">
                <div>
                  <div className="flex items-center justify-between text-[#869397] mb-2 font-mono text-xs uppercase">
                    <span>Response Velocity</span>
                    <Zap className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  <div className="font-heading text-4xl font-bold text-[var(--color-primary)]">4.2x</div>
                  <div className="font-heading text-base font-semibold text-[#e5e1e4] mt-1">
                    Faster Generation
                  </div>
                  <p className="text-xs text-[#869397] mt-2 leading-relaxed">
                    End-to-end interactive inference dropped from 340ms down to a sustained median of 78ms.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#3d494c]/30 font-mono text-[11px] text-[#869397]">
                  340ms → 78ms Latency Curve
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-[#201f22] p-6 rounded-xl flex flex-col justify-between border border-[#3d494c]/30 shadow-md">
                <div>
                  <div className="flex items-center justify-between text-[#869397] mb-2 font-mono text-xs uppercase">
                    <span>Efficiency Dividend</span>
                    <Server className="w-4 h-4 text-[#4edea3]" />
                  </div>
                  <div className="font-heading text-4xl font-bold text-[#4edea3]">$1.4M</div>
                  <div className="font-heading text-base font-semibold text-[#e5e1e4] mt-1">
                    Annualized Savings
                  </div>
                  <p className="text-xs text-[#869397] mt-2 leading-relaxed">
                    Dynamically shared KV caching and batch packing reduced required cold cluster count by 64%.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#3d494c]/30 space-y-1">
                  <div className="flex justify-between font-mono text-[11px] text-[#869397]">
                    <span>Server Utilization</span>
                    <span className="text-[#4edea3]">91.8%</span>
                  </div>
                  <div className="w-full bg-[#2a2a2c] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#4edea3] h-full rounded-full w-[92%]" />
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-[#201f22] p-6 rounded-xl flex flex-col justify-between border border-[#3d494c]/30 shadow-md">
                <div>
                  <div className="flex items-center justify-between text-[#869397] mb-2 font-mono text-xs uppercase">
                    <span>Scale Capacity</span>
                    <Radio className="w-4 h-4 text-[var(--color-secondary)]" />
                  </div>
                  <div className="font-heading text-4xl font-bold text-[var(--color-secondary)]">10M+</div>
                  <div className="font-heading text-base font-semibold text-[#e5e1e4] mt-1">
                    Daily Live Sessions
                  </div>
                  <p className="text-xs text-[#869397] mt-2 leading-relaxed">
                    Distributed Redis session coordinator effortlessly absorbed flash surges during user collaborative events.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#3d494c]/30 font-mono text-[11px] text-[#4edea3]">
                  Zero Failover Interrupts
                </div>
              </div>

              {/* Item 4 */}
              <div className="bg-[#201f22] p-6 rounded-xl flex flex-col justify-between border border-[#3d494c]/30 shadow-md">
                <div>
                  <div className="flex items-center justify-between text-[#869397] mb-2 font-mono text-xs uppercase">
                    <span>Stability Metrics</span>
                    <ShieldCheck className="w-4 h-4 text-[#acedff]" />
                  </div>
                  <div className="font-heading text-4xl font-bold text-[#e5e1e4]">99.94%</div>
                  <div className="font-heading text-base font-semibold text-[#e5e1e4] mt-1">
                    User Delight SLA
                  </div>
                  <p className="text-xs text-[#869397] mt-2 leading-relaxed">
                    Zero perceived motion stuttering across Chromium, Safari WebKit, and native desktop clients.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#3d494c]/30 font-mono text-[11px] text-[var(--color-primary)]">
                  Artifact Drift: &lt; 0.002%
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote & Scorecard */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-4">
              <Quote className="w-8 h-8 text-[var(--color-primary)]" />
              <p className="text-sm sm:text-base text-[#e5e1e4] italic leading-relaxed">
                "Before RUSA TECH intervened, real-time spatial drawing with diffusion models was treated as an impossible research problem within our engineering roadmap. Their team delivered bespoke CUDA kernels and a client WebGPU architecture in eight weeks that made sub-100ms generative creation a reality for our 10 million users."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFce3FDHOdDSmHb4OHxii29U3BNyNCXk1IznEjtxIOMfXbMMPgNtt4WpIK9WMibDr1J-FP_gBkBicykJuAETUyN7B7c9rWaz7XcER9FyC_dAY9ih4FCBqElCJZgrgEslJn8XPEyGP7vmw-IWstAYNKz1vVnABpcnreeNVo0K95dR95n9jdyMaKQF-Db4DgEIS1B4-_r4TZAtKDM4ANnfZBP-6cCrrbGl-1gjD83X172It8qIC_E2Y"
                  alt="Julian Vance"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="%23201f22"/><text x="50%" y="50%" fill="%23869397" font-size="14" font-family="sans-serif" text-anchor="middle" dy=".3em">JV</text></svg>';
                  }}
                  className="w-12 h-12 rounded-full object-cover bg-[#201f22]"
                />
                <div>
                  <div className="font-heading text-sm font-bold text-[#e5e1e4]">Julian Vance, Ph.D.</div>
                  <div className="font-mono text-xs text-[#869397]">
                    CTO & Co-Founder • Generative AI Creative Suite
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#0e0e10]/80 p-5 rounded-xl border border-[#3d494c]/30 space-y-2">
              <div className="font-mono text-xs text-[#4edea3] uppercase font-bold">
                Audit Scorecard
              </div>
              <div className="font-heading text-lg font-bold text-[#e5e1e4]">
                Production Grade 100/100
              </div>
              <p className="text-xs text-[#869397]">
                Full zero-memory leak verification across 48-hour continuous stress test scripts. Fully hardened against adversarial inputs.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[var(--color-primary)] font-mono text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>SOC2 Type II Certified Pipeline</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
