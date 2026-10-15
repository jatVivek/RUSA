import { PRESET_PALETTES } from '../models/Theme.js';

export const initialSiteSettings = {
  siteTitle: 'RUSA TECH',
  tagline: 'Modern Web Agency & High-Performance Engineering Studio',
  logoLight: 'https://lh3.googleusercontent.com/aida/AEtjO1XMwk0vjmYiG-c-mPIGezb_SacR2QHiT-jJmxkFIRLbYg6hxGgvBAJZ8xdNGaTI-553skyNG9OIv3004qS_euzSWtAcmRUjp6M284egBBGUx_On4CP8IAlBsSEWtdMu9jPycgPveUabo0r4hPlNbRAbdkZZxvQ4ARXe_zooVS8hB87gbnUQzVRAs91rXA28bTBF0mlj22qUO9vVnCkhPtLZIABLoyh0KBKRT9fr9gxnky5oHdAvWR9gdQ',
  logoDark: 'https://lh3.googleusercontent.com/aida/AEtjO1XMwk0vjmYiG-c-mPIGezb_SacR2QHiT-jJmxkFIRLbYg6hxGgvBAJZ8xdNGaTI-553skyNG9OIv3004qS_euzSWtAcmRUjp6M284egBBGUx_On4CP8IAlBsSEWtdMu9jPycgPveUabo0r4hPlNbRAbdkZZxvQ4ARXe_zooVS8hB87gbnUQzVRAs91rXA28bTBF0mlj22qUO9vVnCkhPtLZIABLoyh0KBKRT9fr9gxnky5oHdAvWR9gdQ',
  favicon: 'https://lh3.googleusercontent.com/aida/AEtjO1XMwk0vjmYiG-c-mPIGezb_SacR2QHiT-jJmxkFIRLbYg6hxGgvBAJZ8xdNGaTI-553skyNG9OIv3004qS_euzSWtAcmRUjp6M284egBBGUx_On4CP8IAlBsSEWtdMu9jPycgPveUabo0r4hPlNbRAbdkZZxvQ4ARXe_zooVS8hB87gbnUQzVRAs91rXA28bTBF0mlj22qUO9vVnCkhPtLZIABLoyh0KBKRT9fr9gxnky5oHdAvWR9gdQ',
  seoTitle: 'RUSA TECH | High-Performance Web Engineering & UI/UX',
  seoDescription: 'Premier full-stack web engineering and UI/UX studio building modern SaaS platforms, headless e-commerce, and high-performance digital products for venture-backed startups and enterprises.',
  ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hQX_71e363t0WKA5wsEHXD99U5DcfthqsDvEAK30kKBzJgLSCvpoMdstHdoIo2voJ4HCoLfbORMU7dIyC61GXO-th-RNwie971yBgquKzwn4qkrRvt0vp8WtVA9xUyMpu-QCVDw530109VoDX7VbK6xK8UK1uVLQgydgZC5m-i7YA-lJ7Jtt32EWBtY_V5JEmXW3blBj1q8SvFuPyuhCjCU5N8TRN4FjH9OucatEGansE9oNrpU',
  footerText: '© 2025 RUSA TECH Inc. High-Performance Web Agency.',
  contactEmail: 'contact@rusatech.com',
  phone: '+1 (415) 890-4280',
  address: 'San Francisco, CA • Orbital Operations Center',
};

export const initialTheme = {
  activePreset: 'Obsidian Aurora',
  defaultMode: 'dark',
  fontHeading: 'Space Grotesk',
  fontBody: 'Inter',
  fontMono: 'Geist',
  borderRadius: '0.5rem',
  colors: {
    dark: PRESET_PALETTES['Obsidian Aurora'].dark,
    light: PRESET_PALETTES['Obsidian Aurora'].light,
  },
  presets: PRESET_PALETTES,
};

export const initialSections = [
  { key: 'hero', title: 'Hero Stage (Headline & Metrics)', subtitle: 'Orbital canvas and value proposition', order: 0, isActive: true, isMandatory: true },
  { key: 'about', title: 'Trusted By & About Studio', subtitle: 'Social proof logo reel and engineering philosophy', order: 1, isActive: true, isMandatory: true },
  { key: 'products', title: 'Built Products & Client Work', subtitle: 'Flagship production platforms we have shipped', order: 2, isActive: true, isMandatory: true },
  { key: 'services', title: 'Capabilities & Services', subtitle: 'Core agency specialties from 0-1 to enterprise scale', order: 3, isActive: true, isMandatory: true },
  { key: 'experience', title: '4-Step Delivery Process', subtitle: 'Deterministic bi-weekly sprint methodology', order: 4, isActive: true, isMandatory: true },
  { key: 'skills', title: 'Our Tech Arsenal & Stack', subtitle: 'Modern frontend, backend, and cloud standards', order: 5, isActive: true, isMandatory: true },
  { key: 'testimonials', title: 'Client Verifications & Proof', subtitle: 'Testimonials from technical founders and VPs', order: 6, isActive: true, isMandatory: true },
  { key: 'blog', title: 'Engineering Papers & Blog', subtitle: 'In-depth architectural breakdowns and benchmarks', order: 7, isActive: true, isMandatory: true },
  { key: 'contact', title: 'Project Intake & Scoping Form', subtitle: 'High-converting interactive lead capture', order: 8, isActive: true, isMandatory: true },
];

export const initialHero = {
  badge: 'Full-Stack Web Engineering & UI/UX Studio',
  badgeStatus: 'Q3 ACTIVE',
  headline: 'We Build High-Performance Web Applications That Scale Your Business',
  highlightText: 'High-Performance Web Applications',
  subheadline:
    'RUSA TECH is a premier full-stack web engineering and UI/UX studio. We design, architect, and ship production-grade SaaS platforms, bespoke e-commerce engines, and high-conversion digital experiences for venture-backed startups and modern enterprises.',
  primaryCtaText: 'Schedule Scoping Call',
  primaryCtaUrl: '#audit-booking',
  secondaryCtaText: 'Explore Client Work',
  secondaryCtaUrl: '#featured-projects',
  metrics: [
    { value: '99.8%', label: 'On-Time Sprint Delivery', colorClass: 'text-primary' },
    { value: '50+', label: 'Web Apps Shipped', colorClass: 'text-secondary' },
    { value: '98+', label: 'Avg Lighthouse Score', colorClass: 'text-tertiary' },
    { value: 'Zero', label: 'Tech Debt Guarantee', colorClass: 'text-on-surface' },
  ],
  previewAppTitle: 'Prism Cloud Web App',
  previewAppSubtitle: 'React 19 • Next.js 15 • Tailwind',
  previewAppUrl: 'https://app.prism-analytics.io/dashboard',
  previewAppImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hQX_71e363t0WKA5wsEHXD99U5DcfthqsDvEAK30kKBzJgLSCvpoMdstHdoIo2voJ4HCoLfbORMU7dIyC61GXO-th-RNwie971yBgquKzwn4qkrRvt0vp8WtVA9xUyMpu-QCVDw530109VoDX7VbK6xK8UK1uVLQgydgZC5m-i7YA-lJ7Jtt32EWBtY_V5JEmXW3blBj1q8SvFuPyuhCjCU5N8TRN4FjH9OucatEGansE9oNrpU',
  order: 0,
  isActive: true,
};

export const initialAbout = {
  title: 'About RUSA TECH',
  headline: 'Engineered for Velocity, Scale, and Polish',
  bio: 'We are an elite software collective deploying production-grade web systems, resilient cloud infrastructure, and pixel-perfect design systems. We operate with radical transparency, continuous deployment, and fixed-price guarantees.',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCpeLYWljWwHHEy04ie4U-vx2scsaDxGmQLlpJVGmc_LJhtvGJsyBzJhEklZ3PhYmNlLuA0qrBAwj0tV5hpUhxf_xYCGTIk-21Hp1Q4ntRh7TIRK3jzBkEWFyuxhr52OJ3GSMSskLgstjWwn054Qacke3htz0VApieLIqCWQ-vsoaV8DmJG1-ObfJhL0FNlUiifCj5vkbH6uyHTsGV_4g_3NFUjgcdhNkJpGCK_y4vDgc_lUdnns1A',
  stats: [
    { label: 'Latency Reduction', value: '77%' },
    { label: 'Annual Client Savings', value: '$1.4M' },
    { label: 'Uptime SLA', value: '99.99%' },
  ],
  order: 0,
  isActive: true,
};

export const initialProducts = [
  {
    title: 'Prism Analytics',
    description:
      'Enterprise real-time telemetry and reporting dashboard handling 100M+ events monthly. Engineered with sub-50ms query responses, 60fps virtualization grids, and complex permission gating.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hQX_71e363t0WKA5wsEHXD99U5DcfthqsDvEAK30kKBzJgLSCvpoMdstHdoIo2voJ4HCoLfbORMU7dIyC61GXO-th-RNwie971yBgquKzwn4qkrRvt0vp8WtVA9xUyMpu-QCVDw530109VoDX7VbK6xK8UK1uVLQgydgZC5m-i7YA-lJ7Jtt32EWBtY_V5JEmXW3blBj1q8SvFuPyuhCjCU5N8TRN4FjH9OucatEGansE9oNrpU',
    ],
    url: 'https://prism-analytics.example.com',
    slug: 'prism-analytics',
    category: 'B2B SAAS PLATFORM',
    statusBadge: 'LIVE IN PROD',
    metricHighlight: '+240% User Activation',
    metricLabel: '<50ms Query Latency',
    tags: ['Next.js 15 App Router', 'TypeScript Strict', 'Tailwind CSS', 'Go Microservices'],
    order: 0,
    isActive: true,
  },
  {
    title: 'Aura Commerce',
    description:
      'Ultra-fast headless luxury retail store featuring an interactive real-time 3D product visualizer, multi-currency localization across 24 regions, and instant zero-friction checkout.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhjzkRdQ4wRb4iTyOO-0H4Mo9ovMLFVWofpZOMvlJMUVlOjM9pRxC9tvv9I1r9vLotFwS0gzt8oD113AUkAoerbKhpPoqJO79eo0xb-HW628TEbKCGhMni4nSHxNJQY1o0C129_JuzM9uZAxHT5cuBJ_8ZQcw3eO_CMt9SdJlJyv_lKegeeJUYijtyps3UggE0nU4nCUBLPjI4yRvpqapNzPY6wm58kRcyVJwqTRDPPGZSuqwqmHE',
    ],
    url: 'https://aura-commerce.example.com',
    slug: 'aura-commerce',
    category: 'HEADLESS E-COMMERCE',
    statusBadge: 'GLOBAL LAUNCH',
    metricHighlight: '+38% Mobile Conversion',
    metricLabel: '99 Lighthouse Score',
    tags: ['Shopify Plus Headless', 'Next.js Edge', 'Three.js / WebGL', 'Stripe Custom'],
    order: 1,
    isActive: true,
  },
  {
    title: 'VaultPay Neo-Banking',
    description:
      'Compliant banking portal built for seamless international treasury management, multi-user role access controls, automated ACH transfers, and live audit telemetry.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbSAZEGKCWxTsuvm-wR0TGavKYBYdJpOkaktYxuUuxJTn-zjWoiZXK7sfgdXHbKqDoHymlO3tJZW0mUxT873e-qEQ3s-QEuvtfgT2QVsD9oCmojPbw86gMS2JPSOOdCp1XClTjSNAxFH2QWrZDzntCKuRl1rNW3CnOZkcUntBqQZ1CVwGsMtPw-7biWjvN_5HiBvKxI47ZZ2POgJwI0Qb2rqRa21rQfRheFkat4o-lRmVCsQc7igc',
    ],
    url: 'https://vaultpay.example.com',
    slug: 'vaultpay-banking',
    category: 'FINTECH WEB PORTAL',
    statusBadge: 'SOC2 CERTIFIED',
    metricHighlight: '$180M+ Volume',
    metricLabel: '99.99% Availability',
    tags: ['React 19', 'Node.js Enterprise', 'PostgreSQL', 'Plaid / Webhooks'],
    order: 2,
    isActive: true,
  },
  {
    title: 'Novus Health Telehealth',
    description:
      'Secure video consultation platform, interactive patient chart management, and instant prescription routing. Built from zero to production launch in 6 rapid sprint cycles.',
    images: [
      'https://lh3.googleusercontent.com/aida/AEtjO1XMwk0vjmYiG-c-mPIGezb_SacR2QHiT-jJmxkFIRLbYg6hxGgvBAJZ8xdNGaTI-553skyNG9OIv3004qS_euzSWtAcmRUjp6M284egBBGUx_On4CP8IAlBsSEWtdMu9jPycgPveUabo0r4hPlNbRAbdkZZxvQ4ARXe_zooVS8hB87gbnUQzVRAs91rXA28bTBF0mlj22qUO9vVnCkhPtLZIABLoyh0KBKRT9fr9gxnky5oHdAvWR9gdQ',
    ],
    url: '', // OPTIONAL url test: no url means visit button is omitted!
    slug: 'novus-health',
    category: 'HEALTHTECH WEB APP',
    statusBadge: 'HIPAA COMPLIANT',
    metricHighlight: '45k+ Active Patients',
    metricLabel: 'Shipped in 6 Weeks',
    tags: ['Next.js 15', 'WebRTC Video', 'HIPAA Cloud VPC', 'Tailwind CSS'],
    order: 3,
    isActive: true,
  },
  {
    title: 'NeuralStream V3',
    description:
      'Sub-80ms real-time multi-modal diffusion pipeline handling 45M daily inferences for an enterprise generative suite. Fused custom TensorRT-LLM kernels and client-side WebGPU decoding.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDovZnkwSIWfH25osOnV4OgjZhxZPV-6_xngTLo1Iv23wSR4Vi_lHJI9eO45EVG9ZzdPm7D8H8ElrrNnYuJRKycHlq6_8jLy9fId0ktesUCt8iQj7YlGwrUbu2XQqIpQsBKK3s5QL5wNuVeuhMzlh3ckERKwook_pSliO9Vboc7TK3C4Vyy2olPvOQUbwtey5Wn1PeOGx00kq1mrTF-lA0X2M4opNRQvagUEsIOv7FbtUrrZmZLYYI',
    ],
    url: 'https://neuralstream.example.com',
    slug: 'neuralstream-v3',
    category: 'WEBGPU + DISTRIBUTED CLUSTER',
    statusBadge: 'PRODUCTION LIVE v3.4',
    metricHighlight: '4.2x Faster Generation',
    metricLabel: '78ms P95 Sustained',
    tags: ['PyTorch 2.3+', 'TensorRT-LLM', 'WebGPU WGSL', 'Rust Anycast'],
    order: 4,
    isActive: true,
  },
];

export const initialServices = [
  {
    title: 'Full-Stack SaaS & Web Applications',
    description:
      'From 0 to 1 MVP builds to enterprise platforms. Clean domain architectures, secure authentications, automated CI/CD pipelines, and multi-tenant database designs.',
    icon: 'web',
    tag: 'Sprint Ready',
    badgeColor: 'primary',
    order: 0,
    isActive: true,
  },
  {
    title: 'High-Conversion Marketing & Flagship Sites',
    description:
      'Headless CMS integrations (Sanity, Contentful), silky smooth scroll storytelling, interactive WebGL accents, and ultra-fast Jamstack delivery that turns visitors into pipeline.',
    icon: 'rocket_launch',
    tag: 'Conversion Focused',
    badgeColor: 'secondary',
    order: 1,
    isActive: true,
  },
  {
    title: 'UI/UX Design Systems & Frontend',
    description:
      'Figma tokens translated into pixel-perfect accessible component libraries. Micro-interactions, dark/light themes, keyboard accessibility (WCAG AA), and fluid motion.',
    icon: 'palette',
    tag: 'Design System Ready',
    badgeColor: 'tertiary',
    order: 2,
    isActive: true,
  },
  {
    title: 'Performance & Core Web Vitals Audits',
    description:
      'Deep codebase refactoring, bundle size trimming, dynamic code splitting, server-side render cache strategies, and optimizing LCP/INP scores for maximum Google rankings.',
    icon: 'speed',
    tag: 'Avg 98+ Lighthouse',
    badgeColor: 'primary',
    order: 3,
    isActive: true,
  },
  {
    title: 'API Development & Cloud Infrastructure',
    description:
      'Serverless and Edge compute architectures on Vercel and Cloudflare, robust REST and GraphQL APIs, PostgreSQL schema design, Redis caches, and real-time WebSockets.',
    icon: 'api',
    tag: 'Edge & Serverless',
    badgeColor: 'secondary',
    order: 4,
    isActive: true,
  },
  {
    title: 'Sprint Augmentation & Fractional Lead',
    description:
      'Need immediate firepower? Embed senior full-stack web architects directly into your engineering standups to hit critical investor deadlines and unblock architecture jams.',
    icon: 'group_add',
    tag: 'Embedded Senior Devs',
    badgeColor: 'tertiary',
    order: 5,
    isActive: true,
  },
];

export const initialSkills = [
  { name: 'Next.js 15', category: 'Frontend & UI', level: 98, icon: 'code', tags: ['App Router', 'RSC', 'Server Actions'], order: 0, isActive: true },
  { name: 'React 19', category: 'Frontend & UI', level: 96, icon: 'code', tags: ['Hooks', 'Concurrent Mode', 'Compiler'], order: 1, isActive: true },
  { name: 'TypeScript 5', category: 'Frontend & UI', level: 95, icon: 'code', tags: ['Strict Mode', 'Generics', 'Type Safety'], order: 2, isActive: true },
  { name: 'Tailwind CSS', category: 'Frontend & UI', level: 99, icon: 'palette', tags: ['v4 Engine', 'CSS Variables', 'Tokens'], order: 3, isActive: true },
  { name: 'Framer Motion', category: 'Frontend & UI', level: 94, icon: 'auto_awesome', tags: ['Layout Animations', 'Scroll Reveal'], order: 4, isActive: true },
  { name: 'Node.js & Express', category: 'Backend & DB', level: 97, icon: 'dns', tags: ['REST', 'Microservices', 'Clean Architecture'], order: 5, isActive: true },
  { name: 'PostgreSQL & Drizzle', category: 'Backend & DB', level: 92, icon: 'database', tags: ['Relational', 'Migrations', 'Indexes'], order: 6, isActive: true },
  { name: 'Redis Caching', category: 'Backend & DB', level: 90, icon: 'dataset', tags: ['Session Store', 'Rate Limiting', 'Pub/Sub'], order: 7, isActive: true },
  { name: 'Vercel Enterprise', category: 'Cloud & Deployment', level: 96, icon: 'cloud', tags: ['Edge Network', 'CI/CD', 'Analytics'], order: 8, isActive: true },
  { name: 'Cloudflare Workers', category: 'Cloud & Deployment', level: 93, icon: 'cloud_sync', tags: ['Edge Compute', 'DDoS Protection', 'WAF'], order: 9, isActive: true },
  { name: 'Stripe Payments', category: 'Cloud & Deployment', level: 95, icon: 'payments', tags: ['Custom Checkout', 'Billing', 'Webhooks'], order: 10, isActive: true },
];

export const initialTestimonials = [
  {
    quote: '“RUSA TECH shipped our entire multi-tenant SaaS platform two weeks ahead of schedule. Their code quality and design craft are unmatched.”',
    authorName: 'Marcus Chen',
    authorRole: 'VP of Engineering',
    company: 'Prism Analytics',
    initials: 'MC',
    badgeText: '2 Weeks Ahead of Schedule',
    badgeColor: 'primary',
    order: 0,
    isActive: true,
  },
  {
    quote: '“Our conversion rate jumped 38% immediately after launching the headless storefront RUSA TECH engineered for us. The site is unbelievably fast.”',
    authorName: 'Elena Rostova',
    authorRole: 'Founder & CEO',
    company: 'Aura Commerce',
    initials: 'ER',
    badgeText: '+38% Mobile Conversion',
    badgeColor: 'secondary',
    order: 1,
    isActive: true,
  },
  {
    quote: '“Working with RUSA TECH felt like having an elite Silicon Valley engineering team embedded directly into our startup. Zero fluff, just flawless web software.”',
    authorName: 'Julian Vance, Ph.D.',
    authorRole: 'CTO & Co-Founder',
    company: 'Generative AI Creative Suite',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFce3FDHOdDSmHb4OHxii29U3BNyNCXk1IznEjtxIOMfXbMMPgNtt4WpIK9WMibDr1J-FP_gBkBicykJuAETUyN7B7c9rWaz7XcER9FyC_dAY9ih4FCBqElCJZgrgEslJn8XPEyGP7vmw-IWstAYNKz1vVnABpcnreeNVo0K95dR95n9jdyMaKQF-Db4DgEIS1B4-_r4TZAtKDM4ANnfZBP-6cCrrbGl-1gjD83X172It8qIC_E2Y',
    initials: 'JV',
    badgeText: '99.94% User Delight SLA',
    badgeColor: 'tertiary',
    order: 2,
    isActive: true,
  },
];

export const initialExperiences = [
  {
    company: 'RUSA TECH Core Delivery',
    role: 'Phase 01: Discovery & Blueprint',
    period: 'Week 1',
    description: 'We audit your product requirements, create technical architecture diagrams, define exact sprint milestones, and supply a fixed-cost timeline.',
    achievements: ['Technical specification document', 'System architecture schema', 'Sprint milestone timeline'],
    order: 0,
    isActive: true,
  },
  {
    company: 'RUSA TECH Core Delivery',
    role: 'Phase 02: Prototyping & Design',
    period: 'Week 2–3',
    description: 'High-fidelity Figma prototypes, clickable user flows, component token architecture, and stakeholder design reviews before writing a single line of code.',
    achievements: ['Figma design token library', 'Interactive clickable prototype', 'User testing validation'],
    order: 1,
    isActive: true,
  },
  {
    company: 'RUSA TECH Core Delivery',
    role: 'Phase 03: Production Engineering',
    period: 'Week 4–7',
    description: 'Bi-weekly sprint demos on live staging links. Automated unit and end-to-end testing, peer code reviews, and stringent security audits.',
    achievements: ['Continuous staging deployments', 'Automated E2E test suite', 'Production-ready database & auth'],
    order: 2,
    isActive: true,
  },
  {
    company: 'RUSA TECH Core Delivery',
    role: 'Phase 04: Launch & Evolution',
    period: 'Week 8+',
    description: 'Zero-downtime production deployment, Core Web Vitals telemetry tracking, full IP and code handover, plus ongoing post-launch maintenance sprints.',
    achievements: ['100% Code & Asset handover', 'Lighthouse 98+ score signoff', 'Dedicated 30-day warranty support'],
    order: 3,
    isActive: true,
  },
];

export const initialBlogs = [
  {
    title: 'Deploying Sub-50ms Speculative Decoding in High-Concurrency Production Environments',
    slug: 'speculative-decoding-production',
    excerpt:
      'An architectural breakdown of draft-model calibration, paged KV-cache pinning on sparse clusters, and eliminating memory bandwidth bottlenecks under 10k simultaneous inference requests.',
    content: `# Deploying Sub-50ms Speculative Decoding in High-Concurrency Production Environments

Standard Large Language Model inference remains notoriously memory-bandwidth bound. In token-by-token autoregressive decoding, every newly minted token forces high-bandwidth memory (HBM3e) to stream all model weights through compute cores for a single vector-matrix operation.

Speculative decoding breaks this limitation by decoupling draft generation from full verification. A compact, sovereign draft model guesses K sequential tokens ahead. The large target model then evaluates the draft sequence in a single forward pass—converting K memory-bound operations into one highly parallel compute-bound matrix multiplication.

### Architectural Takeaways
Speculative speedup is fundamentally determined by the ratio of Target Forward Compute Time to Draft Token Time. Maintaining asymmetric draft-to-target parameter ratios between 1:8 and 1:12 remains the optimal operational envelope.`,
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXmSZ94v_M04GhLcnLoA_K4Ncag4bbtM-AFxUrPHFmxEzeznXNMwPZCOnR7MiZ-gj9FpwT9f8cXyG1ZcUxYS1OMPL0E8BEjDSCCG57gfglehilPrK03-LG6Rrxw0D-rq7jqlUErdSe0Si_MOK1ijyPukXVrBE8OZgX5ENOFPop5cMmJ07foicV7nMCwDzlOxkv1zNEpB0LOE7qLP1mSfpfps3JDzJB8Ps68iX2bbaPHSYUHvviN18',
    tags: ['High-Concurrency LLMs', 'Inference Engine', 'AWS Trainium & vLLM', 'Protocol v3.4'],
    status: 'published',
    publishedAt: new Date('2025-03-28'),
    readTime: '14 min read',
    author: {
      name: 'Vance R. Sterling',
      role: 'Chief AI Architect',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAXmSZ94v_M04GhLcnLoA_K4Ncag4bbtM-AFxUrPHFmxEzeznXNMwPZCOnR7MiZ-gj9FpwT9f8cXyG1ZcUxYS1OMPL0E8BEjDSCCG57gfglehilPrK03-LG6Rrxw0D-rq7jqlUErdSe0Si_MOK1ijyPukXVrBE8OZgX5ENOFPop5cMmJ07foicV7nMCwDzlOxkv1zNEpB0LOE7qLP1mSfpfps3JDzJB8Ps68iX2bbaPHSYUHvviN18',
    },
    doi: '10.5921/syn.2025.0328',
    seoTitle: 'Deploying Sub-50ms Speculative Decoding | RUSA TECH Research',
    seoDescription: 'Architectural breakdown of draft-model calibration and KV-cache pinning on enterprise GPU clusters.',
    helpfulVotes: 142,
    order: 0,
    isActive: true,
  },
  {
    title: 'Deterministic Tool Execution with Typed Micro-Contracts in Agent Swarms',
    slug: 'deterministic-tool-execution-contracts',
    excerpt: 'Resolving catastrophic hallucination cascading through asynchronous schema validation and typed zero-leak contracts.',
    content: `# Deterministic Tool Execution with Typed Micro-Contracts

Autonomous agent swarms fail in enterprise deployments when tool arguments drift across unvalidated LLM turns. By placing strict Zod-style runtime constraints between agent reasoning tokens and API invocations, we guarantee zero runtime parsing exceptions.`,
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2GTCtLeeqEO6wocL821Oa8ogO1vtDetW0pbRzDwvApCzkBiRBojA4Ku5Og2GJ68RMhwE-rLX2CqdQoye0YWlvLVaI_gMZ3gIlh7BJI47GN_-8EicQwGrwvkfF83NlhN7qmrMI-YFEDfbh9GzmF1NjwVng44pPXAgefoZjHJ6N1Adx0UGLwydv3XughuZqp_rwDD2SZVeOT63zfUpZB586gGnRD7tgez6vLBWQIoAXoSgh0W9rAeY',
    tags: ['Distributed Swarms', 'Agent Reliability', 'Type Safety'],
    status: 'published',
    publishedAt: new Date('2025-04-10'),
    readTime: '9 min read',
    author: {
      name: 'Vance R. Sterling',
      role: 'Chief AI Architect',
      avatar: '',
    },
    doi: '10.5921/syn.2025.0410',
    seoTitle: 'Deterministic Tool Execution with Micro-Contracts',
    seoDescription: 'Agent swarm reliability with typed micro-contracts.',
    helpfulVotes: 89,
    order: 1,
    isActive: true,
  },
];

export const initialOfferBanner = {
  text: '⚡ Q3 Project Slots Open — Book a 2-Week Sprint or Architecture Discovery Call →',
  buttonText: 'Claim Audit →',
  buttonUrl: '#audit-booking',
  image: '',
  startsAt: null, // always active
  endsAt: null,
  isActive: true,
};

export const initialSocialLinks = [
  { platform: 'Twitter', label: 'X (Twitter)', url: 'https://twitter.com/rusatech_ai', icon: 'alternate_email', order: 0, isActive: true },
  { platform: 'GitHub', label: 'GitHub', url: 'https://github.com/rusatech-studio', icon: 'terminal', order: 1, isActive: true },
  { platform: 'RSS', label: 'Engineering RSS', url: '#', icon: 'rss_feed', order: 2, isActive: true },
];

export const initialContactMessages = [
  {
    name: 'Evelyn Shaw',
    email: 'evelyn@apexcapital.example.com',
    projectType: 'SaaS Web App',
    budget: '$150k - $250k',
    company: 'Apex Capital',
    message: 'Looking to benchmark your sub-millisecond LLM latency node across our high-frequency hedge fund research pipeline.',
    isRead: false,
  },
  {
    name: 'Kaelen Voss',
    email: 'kaelen@hyperion.example.com',
    projectType: 'Perf. Audit',
    budget: '$50k - $100k',
    company: 'Hyperion Robotics',
    message: 'Need full security and latency audit of our edge robotics telemetry cluster before series B closing.',
    isRead: false,
  },
  {
    name: 'Sarah Takahashi',
    email: 'sarah@sorahealth.example.com',
    projectType: 'SaaS Web App',
    budget: '$60k+ Enterprise',
    company: 'Sora Health',
    message: 'Received proposal. Coordinating scheduling with our CTO for next Tuesday deep dive session.',
    isRead: true,
  },
];
