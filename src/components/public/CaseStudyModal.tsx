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
  ExternalLink,
  Globe,
} from 'lucide-react';

interface CaseStudyModalProps {
  product?: ProductItem | null;
  onClose: () => void;
}

interface CaseStudyDetail {
  clientGroup: string;
  badge: string;
  headlinePrefix: string;
  headlineHighlight: string;
  summary: string;
  studioName: string;
  studioSubtitle: string;
  deliveryCycle: string;
  uptimeLabel: string;
  uptimeValue: string;
  uptimeSub: string;
  hardwareLabel: string;
  hardwareValue: string;
  hardwareSub: string;
  simulationTitle: string;
  simulationSub: string;
  simulationSession: string;
  node1Title: string;
  node1Text: string;
  node1Metric: string;
  node2Title: string;
  node2Text: string;
  node2Metric: string;
  node3Title: string;
  node3Text: string;
  node3Metric: string;
  metric1Val: string;
  metric1Title: string;
  metric1Desc: string;
  metric1Badge: string;
  metric2Val: string;
  metric2Title: string;
  metric2Desc: string;
  metric3Val: string;
  metric3Title: string;
  metric3Desc: string;
  metric4Val: string;
  metric4Title: string;
  metric4Desc: string;
  metric4Badge: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  auditNotes: string;
}

const CASE_STUDY_MAP: Record<string, CaseStudyDetail> = {
  apex_garage: {
    clientGroup: 'APEX AUTOMOTIVE GROUP',
    badge: 'NEXT.JS 19 + REAL-TIME WORKSHOP OS + GST ENGINE',
    headlinePrefix: 'High-Throughput Garage Management ERP Handling ',
    headlineHighlight: '1,200+ Monthly Work Orders',
    summary:
      'Architected a sub-50ms automotive service operating system for multi-brand auto centers. Features zero-latency digital job cards, automated technician bay routing, real-time customer WhatsApp telemetry, and instant GST-compliant billing with doorstep logistics.',
    studioName: 'Apex Auto Care Network',
    studioSubtitle: 'Multi-Brand Auto Workshop Group',
    deliveryCycle: '6 Weeks Turnkey',
    uptimeLabel: 'Service SLA',
    uptimeValue: '99.98% SLA',
    uptimeSub: 'Zero billing desyncs',
    hardwareLabel: 'Architecture Envelope',
    hardwareValue: 'Edge + Supabase + Redis',
    hardwareSub: 'Local-first technician sync',
    simulationTitle: 'Workshop Bay Orchestration',
    simulationSub: 'Real-time bay telemetry & mechanic dispatch: Bay_04 // Latency: <45ms',
    simulationSession: 'apex-workshop-engine://live-service/bay-04',
    node1Title: 'NODE #01 — VEHICLE CHECK-IN & OCR',
    node1Text: 'High-speed license plate scanner & 36-point intake checklist with instant WhatsApp check-in trigger.',
    node1Metric: 'Intake: <90s',
    node2Title: 'NODE #02 — JOB CARD & PARTS LEDGER',
    node2Text: 'Live bay mechanic allocation, real-time OEM parts inventory deduction, and automated labour pricing.',
    node2Metric: 'Bay Sync: 32ms',
    node3Title: 'NODE #03 — GST INVOICE & GATE PASS',
    node3Text: 'One-click GST tax breakdown, digital payment link dispatch, and tamper-proof gate pass QR code generation.',
    node3Metric: 'Invoice: Instant',
    metric1Val: '+310%',
    metric1Title: 'Job Card Efficiency',
    metric1Desc: 'Service turnaround velocity boosted from initial vehicle intake to customer gate-pass signoff.',
    metric1Badge: 'Intake to Gate-Pass: <3.2 hrs',
    metric2Val: '100%',
    metric2Title: 'GST Invoicing Accuracy',
    metric2Desc: 'Automated tax breakdown, parts ledger reconciliation, and instant customer PDF generation.',
    metric3Val: '50k+',
    metric3Title: 'Service History Logs',
    metric3Desc: 'Indexed vehicle service logs queried with sub-30ms search latency across all branches.',
    metric4Val: '99.98%',
    metric4Title: 'System Availability',
    metric4Desc: 'Local-first offline synchronization ensures technicians never stall during garage WiFi drops.',
    metric4Badge: 'Offline Resilient Engine',
    quote:
      '"RUSA TECH transformed our scattered whiteboard and paper receipt operations into a sub-second digital garage OS. Our bay throughput rose 40% in month one, and customer pickup disputes dropped to zero thanks to their real-time photo inspection timeline."',
    authorName: 'Rajesh Mehra',
    authorRole: 'Operations Director • Apex Auto Care Network',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    auditNotes:
      'Strict multi-bay locking verification across concurrent technician terminals. Zero race conditions in parts inventory reconciliation.',
  },
  autoprime_cars: {
    clientGroup: 'AUTOPRIME MOTORS GROUP',
    badge: 'TYPESCRIPT + NEXT.JS 15 + 150-PT DIGITAL MATRIX',
    headlinePrefix: 'Sub-600ms Pre-Owned Car Showroom & Marketplace with ',
    headlineHighlight: 'Instant Valuation Engine',
    summary:
      'Engineered an ultra-fast certified pre-owned dealership portal with instantaneous multi-filter inventory queries, interactive 150-point inspection scorecards, automated trade-in quote algorithms, and real-time EMI loan calculators.',
    studioName: 'AutoPrime Motors',
    studioSubtitle: 'Certified Pre-Owned Dealership',
    deliveryCycle: '5 Weeks Turnkey',
    uptimeLabel: 'Filter Latency',
    uptimeValue: '< 600ms',
    uptimeSub: 'Zero stutter facet browsing',
    hardwareLabel: 'Hosting Stack',
    hardwareValue: 'Vercel Edge Global',
    hardwareSub: 'Distributed image CDN',
    simulationTitle: 'Dealership Inventory Grid',
    simulationSub: 'Dynamic multi-facet filter feed: Filter_Query_Stock // P95: 520ms',
    simulationSession: 'autoprime-retail-engine://inventory/certified-stock',
    node1Title: 'NODE #01 — 150-PT DIGITAL INSPECTION',
    node1Text: 'Engine, transmission, body panel, and electrical telemetry graded with tamper-proof certification score.',
    node1Metric: 'Precision: 99.8%',
    node2Title: 'NODE #02 — ALGORITHMIC VALUATION',
    node2Text: 'Dynamic market parity pricing adjusting for odometer reading, variant demand, and regional depreciation.',
    node2Metric: 'Calc: <40ms',
    node3Title: 'NODE #03 — EMI & TEST DRIVE FUNNEL',
    node3Text: 'Live banking APR interest comparison table and instant KYC lead dispatch to assigned dealership sales rep.',
    node3Metric: 'Booking: 1-Click',
    metric1Val: '+44%',
    metric1Title: 'Test Drive Bookings',
    metric1Desc: 'High-intent buyer inquiries converted through interactive 150-point inspection transparency.',
    metric1Badge: 'Lead Conversion Lift: +44%',
    metric2Val: '<600ms',
    metric2Title: 'Inventory Query Speed',
    metric2Desc: 'Instant filtering across make, model, year, fuel type, transmission, and pricing brackets.',
    metric3Val: '10,000+',
    metric3Title: 'Multi-Yard Vehicle Sync',
    metric3Desc: 'Real-time inventory coordination prevents double-booking across regional dealer lots.',
    metric4Val: '99.4%',
    metric4Title: 'Valuation Precision',
    metric4Desc: 'Algorithmic trade-in estimate accuracy verified against actual inspection buyouts.',
    metric4Badge: 'Market Price Parity: 99.4%',
    quote:
      '"Most pre-owned car software takes 3-4 seconds just to reload filters. RUSA TECH delivered an interface that feels instantaneous. Our bounce rate plummeted and verified test-drive bookings increased by 44% within 3 weeks of launch."',
    authorName: 'Kavita Sundaram',
    authorRole: 'VP of Digital Retail • AutoPrime Motors',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    auditNotes:
      'Optimized server-side edge caching for vehicle media grids. 100/100 Lighthouse performance score across mobile and desktop devices.',
  },
  rusa_dental: {
    clientGroup: 'RUSA DENTAL CLINIC NETWORK',
    badge: 'HIPAA CLOUD VPC + 3D TOOTH CHARTING + EMR OS',
    headlinePrefix: 'Comprehensive 13-Module Dental Clinic OS & Patient Portal with ',
    headlineHighlight: 'Interactive 3D Charting',
    summary:
      'Designed and deployed an integrated dental clinic management suite fusing an aesthetic patient appointment portal with an authoritative 13-module clinic OS featuring interactive 3D tooth charts, electronic medical records (EMR), and procedure billing.',
    studioName: 'Rusa Dental Practice Network',
    studioSubtitle: 'Multi-Dentist Operatory Group',
    deliveryCycle: '7 Weeks Turnkey',
    uptimeLabel: 'Throughput Uptime',
    uptimeValue: '99.98% SLA',
    uptimeSub: 'Zero consult downtime',
    hardwareLabel: 'Compliance Shield',
    hardwareValue: 'HIPAA Encrypted VPC',
    hardwareSub: 'Role-based access security',
    simulationTitle: 'Clinical Charting Telemetry',
    simulationSub: 'Real-time 3D tooth charting & procedure sync: Operatory_02 // Latency: <80ms',
    simulationSession: 'rusa-dental-os://operatory-02/patient-chart-emr',
    node1Title: 'NODE #01 — 3D TOOTH CHART & RESTORATION',
    node1Text: 'Interactive adult & pediatric odontogram with surface-level decay, crown, and implant tracking.',
    node1Metric: 'Vector Canvas: 60fps',
    node2Title: 'NODE #02 — CHAIRSIDE EMR & CLINICAL NOTES',
    node2Text: 'Instantaneous historical procedure retrieval, periodontal pocket depth logs, and digital x-ray review.',
    node2Metric: 'Retrieval: <80ms',
    node3Title: 'NODE #03 — TREATMENT PLAN & LAB TRACKER',
    node3Text: 'Multi-visit phased treatment estimates, insurance coverage calculations, and dental lab milestone sync.',
    node3Metric: 'Auto Recall: 100%',
    metric1Val: '13',
    metric1Title: 'Clinical Modules',
    metric1Desc: 'Integrated tooth charting, patient EMR, operatory scheduling, billing, and dental lab tracking.',
    metric1Badge: '13-in-1 Unified Clinical Platform',
    metric2Val: '<80ms',
    metric2Title: 'EMR Retrieval Speed',
    metric2Desc: 'Instant digital x-ray and patient clinical history recall right at the dentist chairside.',
    metric3Val: '+28%',
    metric3Title: 'Chair Utilization',
    metric3Desc: 'Automated SMS/Email reminders and one-tap re-booking drastically reduced patient no-shows.',
    metric4Val: '100%',
    metric4Title: 'HIPAA Data Integrity',
    metric4Desc: 'End-to-end encrypted medical record storage compliant with healthcare privacy regulations.',
    metric4Badge: 'SOC2 / HIPAA Compliant',
    quote:
      '"The 3D interactive tooth charting and seamless patient scheduling that RUSA TECH engineered saved our dentists over 90 minutes per day in charting overhead. Our patients love the clean appointment flow and digital prescription portal."',
    authorName: 'Dr. Alistair Sterling, DDS',
    authorRole: 'Chief Clinical Officer • Sterling Dental Group',
    authorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    auditNotes:
      'Zero plaintext health record storage. Strict role-based access control (RBAC) across hygienists, lead dentists, and front-desk receptionists.',
  },
};

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

  // Resolve project specific details
  const pTitle = product?.title || '';
  const pSlug = product?.slug || '';
  const pId = product?._id || '';

  let detail = CASE_STUDY_MAP.apex_garage;
  if (
    pId === 'prod_autoprime_cars' ||
    pSlug.includes('autoprime') ||
    pSlug.includes('cars') ||
    pTitle.toLowerCase().includes('autoprime') ||
    pTitle.toLowerCase().includes('pre-owned')
  ) {
    detail = CASE_STUDY_MAP.autoprime_cars;
  } else if (
    pId === 'prod_rusa_dental' ||
    pSlug.includes('dental') ||
    pTitle.toLowerCase().includes('dental')
  ) {
    detail = CASE_STUDY_MAP.rusa_dental;
  } else if (
    pId === 'prod_apex_garage' ||
    pSlug.includes('garage') ||
    pTitle.toLowerCase().includes('apex') ||
    pTitle.toLowerCase().includes('garage')
  ) {
    detail = CASE_STUDY_MAP.apex_garage;
  }

  const liveUrl = product?.url || '';

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
                  {product?.title || 'Apex Auto Care'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#1c1b1d] px-3 py-1 rounded-full border border-[#3d494c]/30">
                  <span className="h-2 w-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3] animate-pulse" />
                  <span className="font-mono text-xs text-[#4edea3] font-semibold">
                    {product?.statusBadge || 'PRODUCTION LIVE'}
                  </span>
                  <span className="text-[#869397] mx-1">•</span>
                  <span className="font-mono text-xs text-[#869397]">{detail.clientGroup}</span>
                </div>

                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  >
                    <span>Open Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#201f22] text-[var(--color-primary)] font-mono text-xs">
              <Zap className="w-3.5 h-3.5" />
              <span>{detail.badge}</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#e5e1e4] leading-tight">
              {detail.headlinePrefix}
              <span className="bg-gradient-to-r from-[var(--color-primary)] via-[#acedff] to-[var(--color-secondary)] bg-clip-text text-transparent">
                {detail.headlineHighlight}
              </span>
            </h1>

            <p className="text-[#bcc9cd] text-base lg:text-lg max-w-4xl leading-relaxed">
              {detail.summary}
            </p>
          </div>

          {/* Key Project Metadata Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[#1c1b1d] rounded-xl border border-[#3d494c]/30">
            <div className="p-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397] block">
                Target Studio
              </span>
              <span className="font-heading text-base font-semibold text-[#e5e1e4]">
                {detail.studioName}
              </span>
              <span className="font-mono text-xs text-[#869397] block mt-0.5">
                {detail.studioSubtitle}
              </span>
            </div>
            <div className="p-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397] block">
                Delivery Cycle
              </span>
              <span className="font-heading text-base font-semibold text-[#e5e1e4]">
                {detail.deliveryCycle}
              </span>
              <span className="font-mono text-xs text-[#869397] block mt-0.5">Concept to Global GA</span>
            </div>
            <div className="p-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397] block">
                {detail.uptimeLabel}
              </span>
              <span className="font-heading text-base font-semibold text-[#4edea3]">
                {detail.uptimeValue}
              </span>
              <span className="font-mono text-xs text-[#869397] block mt-0.5">
                {detail.uptimeSub}
              </span>
            </div>
            <div className="p-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#869397] block">
                {detail.hardwareLabel}
              </span>
              <span className="font-heading text-base font-semibold text-[#e5e1e4]">
                {detail.hardwareValue}
              </span>
              <span className="font-mono text-xs text-[#869397] block mt-0.5">
                {detail.hardwareSub}
              </span>
            </div>
          </div>

          {/* Interactive Simulation & HUD */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-primary)]">
                  {detail.simulationTitle}
                </span>
                <h3 className="font-heading text-xl font-bold text-[#e5e1e4]">
                  Interactive Architecture Telemetry & Flow
                </h3>
              </div>
              <span className="font-mono text-xs text-[#869397]">
                {detail.simulationSub}
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
                    {detail.simulationSession}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-[#4edea3] flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                    60.0 FPS
                  </span>
                  <span className="text-[var(--color-primary)] font-semibold">
                    0.038s Latency
                  </span>
                  <span className="text-[#869397] hidden md:inline">Edge Cache: 100% Warm</span>
                </div>
              </div>

              {/* Viewport Simulation */}
              <div className="relative min-h-[360px] bg-[#131315] flex flex-col justify-between p-6 overflow-hidden">
                {product?.images?.[0] && (
                  <div className="absolute inset-0 opacity-20">
                    <img
                      src={product.images[0]}
                      alt="Project Preview"
                      className="w-full h-full object-cover filter blur-sm"
                    />
                  </div>
                )}

                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 bg-[#0e0e10]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#3d494c]/50">
                    <span className="h-2 w-2 rounded-full bg-[#4edea3]" />
                    <span className="font-mono text-xs text-[#bcc9cd]">Cluster: Active Routing</span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#0e0e10]/90 backdrop-blur-md px-3 py-1 rounded-lg font-mono text-xs">
                    <span className="text-[#869397]">Status:</span>
                    <span className="text-[#e5e1e4] font-semibold">Verified Live Build</span>
                    <span className="text-[#869397] mx-1">|</span>
                    <span className="text-[var(--color-primary)]">vercel-edge-node</span>
                  </div>
                </div>

                {/* Center 3 Nodes */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  {/* Node 1 */}
                  <div className="bg-[#1c1b1d]/95 backdrop-blur-lg p-4 rounded-xl border border-[#3d494c]/40">
                    <div className="flex items-center justify-between pb-1 mb-1">
                      <span className="font-mono text-xs text-[var(--color-primary)] font-bold">
                        {detail.node1Title}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                    </div>
                    <p className="text-xs text-[#e5e1e4] mt-1">{detail.node1Text}</p>
                    <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#869397]">
                      <span>Latency: P99</span>
                      <span className="text-[var(--color-primary)] font-semibold">
                        {detail.node1Metric}
                      </span>
                    </div>
                  </div>

                  {/* Node 2 */}
                  <div className="bg-[#2a2a2c]/95 backdrop-blur-lg p-4 rounded-xl border border-[var(--color-secondary)]/40">
                    <div className="flex items-center justify-between pb-1 mb-1">
                      <span className="font-mono text-xs text-[var(--color-secondary)] font-bold">
                        {detail.node2Title}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
                    </div>
                    <p className="text-xs text-[#e5e1e4] mt-1">{detail.node2Text}</p>
                    <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#869397]">
                      <span>Response SLA</span>
                      <span className="text-[var(--color-secondary)] font-semibold">
                        {detail.node2Metric}
                      </span>
                    </div>
                  </div>

                  {/* Node 3 */}
                  <div className="bg-[#1c1b1d]/95 backdrop-blur-lg p-4 rounded-xl border border-[#4edea3]/40">
                    <div className="flex items-center justify-between pb-1 mb-1">
                      <span className="font-mono text-xs text-[#4edea3] font-bold">
                        {detail.node3Title}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[#4edea3]" />
                    </div>
                    <p className="text-xs text-[#e5e1e4] mt-1">{detail.node3Text}</p>
                    <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#869397]">
                      <span>Verification</span>
                      <span className="text-[#4edea3] font-semibold">{detail.node3Metric}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom HUD Bar */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#3d494c]/30 font-mono text-xs text-[#869397]">
                  <div className="flex items-center gap-4">
                    <span>
                      Frontend Engine:{' '}
                      <strong className="text-[#e5e1e4]">
                        {product?.tags?.[0] || 'Next.js 15'}
                      </strong>
                    </span>
                    <span>
                      Styling:{' '}
                      <strong className="text-[#e5e1e4]">Tailwind CSS + Fluid Motion</strong>
                    </span>
                  </div>

                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>Explore Live Application</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-[#e5e1e4]">
              Measurable Business Impact & Performance Dividends
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Item 1 */}
              <div className="bg-[#201f22] p-6 rounded-xl flex flex-col justify-between border border-[#3d494c]/30 shadow-md">
                <div>
                  <div className="flex items-center justify-between text-[#869397] mb-2 font-mono text-xs uppercase">
                    <span>Core Velocity</span>
                    <Activity className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  <div className="font-heading text-4xl font-bold text-[var(--color-primary)]">
                    {detail.metric1Val}
                  </div>
                  <div className="font-heading text-base font-semibold text-[#e5e1e4] mt-1">
                    {detail.metric1Title}
                  </div>
                  <p className="text-xs text-[#869397] mt-2 leading-relaxed">
                    {detail.metric1Desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#3d494c]/30 font-mono text-[11px] text-[var(--color-primary)]">
                  {detail.metric1Badge}
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-[#201f22] p-6 rounded-xl flex flex-col justify-between border border-[#3d494c]/30 shadow-md">
                <div>
                  <div className="flex items-center justify-between text-[#869397] mb-2 font-mono text-xs uppercase">
                    <span>Precision Rate</span>
                    <Server className="w-4 h-4 text-[#4edea3]" />
                  </div>
                  <div className="font-heading text-4xl font-bold text-[#4edea3]">
                    {detail.metric2Val}
                  </div>
                  <div className="font-heading text-base font-semibold text-[#e5e1e4] mt-1">
                    {detail.metric2Title}
                  </div>
                  <p className="text-xs text-[#869397] mt-2 leading-relaxed">
                    {detail.metric2Desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#3d494c]/30 font-mono text-[11px] text-[#4edea3]">
                  Sub-Second Sync
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-[#201f22] p-6 rounded-xl flex flex-col justify-between border border-[#3d494c]/30 shadow-md">
                <div>
                  <div className="flex items-center justify-between text-[#869397] mb-2 font-mono text-xs uppercase">
                    <span>Scale Volume</span>
                    <Radio className="w-4 h-4 text-[var(--color-secondary)]" />
                  </div>
                  <div className="font-heading text-4xl font-bold text-[var(--color-secondary)]">
                    {detail.metric3Val}
                  </div>
                  <div className="font-heading text-base font-semibold text-[#e5e1e4] mt-1">
                    {detail.metric3Title}
                  </div>
                  <p className="text-xs text-[#869397] mt-2 leading-relaxed">
                    {detail.metric3Desc}
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
                    <span>Stability Index</span>
                    <ShieldCheck className="w-4 h-4 text-[#acedff]" />
                  </div>
                  <div className="font-heading text-4xl font-bold text-[#e5e1e4]">
                    {detail.metric4Val}
                  </div>
                  <div className="font-heading text-base font-semibold text-[#e5e1e4] mt-1">
                    {detail.metric4Title}
                  </div>
                  <p className="text-xs text-[#869397] mt-2 leading-relaxed">
                    {detail.metric4Desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#3d494c]/30 font-mono text-[11px] text-[var(--color-primary)]">
                  {detail.metric4Badge}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote & Scorecard */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/40 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-4">
              <Quote className="w-8 h-8 text-[var(--color-primary)]" />
              <p className="text-sm sm:text-base text-[#e5e1e4] italic leading-relaxed">
                {detail.quote}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={detail.authorAvatar}
                  alt={detail.authorName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="%23201f22"/><text x="50%" y="50%" fill="%23869397" font-size="14" font-family="sans-serif" text-anchor="middle" dy=".3em">R</text></svg>';
                  }}
                  className="w-12 h-12 rounded-full object-cover bg-[#201f22]"
                />
                <div>
                  <div className="font-heading text-sm font-bold text-[#e5e1e4]">
                    {detail.authorName}
                  </div>
                  <div className="font-mono text-xs text-[#869397]">{detail.authorRole}</div>
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
              <p className="text-xs text-[#869397]">{detail.auditNotes}</p>
              <div className="pt-1 flex items-center gap-1.5 text-[var(--color-primary)] font-mono text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Turnkey Production Architecture</span>
              </div>
            </div>
          </div>

          {/* Modal Footer CTA */}
          {liveUrl && (
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#3d494c]/30">
              <span className="text-xs font-mono text-[#869397]">
                Live Web Application Deployed on Vercel Edge Network
              </span>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] text-white font-medium text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Launch Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
