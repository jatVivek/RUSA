import mongoose from 'mongoose';
import { createModel } from './store.js';

const heroSchema = new mongoose.Schema(
  {
    badge: { type: String, default: 'Full-Stack Web Engineering & UI/UX Studio' },
    badgeStatus: { type: String, default: 'Q3 ACTIVE' },
    headline: { type: String, default: 'We Build High-Performance Web Applications That Scale Your Business' },
    highlightText: { type: String, default: 'High-Performance Web Applications' },
    subheadline: {
      type: String,
      default:
        'Synthetix is a premier full-stack web engineering and UI/UX studio. We design, architect, and ship production-grade SaaS platforms, bespoke e-commerce engines, and high-conversion digital experiences for venture-backed startups and modern enterprises.',
    },
    primaryCtaText: { type: String, default: 'Schedule Scoping Call' },
    primaryCtaUrl: { type: String, default: '#audit-booking' },
    secondaryCtaText: { type: String, default: 'Explore Client Work' },
    secondaryCtaUrl: { type: String, default: '#featured-projects' },
    metrics: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
        colorClass: { type: String, default: 'text-primary' },
      },
    ],
    previewAppTitle: { type: String, default: 'Prism Cloud Web App' },
    previewAppSubtitle: { type: String, default: 'React 19 • Next.js 15 • Tailwind' },
    previewAppUrl: { type: String, default: 'https://app.prism-analytics.io/dashboard' },
    previewAppImage: {
      type: String,
      default:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hQX_71e363t0WKA5wsEHXD99U5DcfthqsDvEAK30kKBzJgLSCvpoMdstHdoIo2voJ4HCoLfbORMU7dIyC61GXO-th-RNwie971yBgquKzwn4qkrRvt0vp8WtVA9xUyMpu-QCVDw530109VoDX7VbK6xK8UK1uVLQgydgZC5m-i7YA-lJ7Jtt32EWBtY_V5JEmXW3blBj1q8SvFuPyuhCjCU5N8TRN4FjH9OucatEGansE9oNrpU',
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MongooseHero = mongoose.models.Hero || mongoose.model('Hero', heroSchema);
export const Hero = createModel('Hero', heroSchema, MongooseHero);
