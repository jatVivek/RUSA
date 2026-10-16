import mongoose from 'mongoose';
import { createModel } from './store.js';

const siteSettingsSchema = new mongoose.Schema(
  {
    siteTitle: { type: String, default: 'RUSA TECH' },
    tagline: { type: String, default: 'High-Performance Web Engineering & UI/UX Studio' },
    logoLight: { type: String, default: '/logo-light.svg' },
    logoDark: { type: String, default: '/logo-dark.svg' },
    favicon: { type: String, default: '/favicon.svg' },
    seoTitle: { type: String, default: 'RUSA TECH | Modern Full-Stack Web Agency & Systems' },
    seoDescription: { type: String, default: 'Premier full-stack web engineering studio building modern SaaS platforms, headless e-commerce, and high-performance digital products for venture-backed startups and enterprises.' },
    ogImage: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hQX_71e363t0WKA5wsEHXD99U5DcfthqsDvEAK30kKBzJgLSCvpoMdstHdoIo2voJ4HCoLfbORMU7dIyC61GXO-th-RNwie971yBgquKzwn4qkrRvt0vp8WtVA9xUyMpu-QCVDw530109VoDX7VbK6xK8UK1uVLQgydgZC5m-i7YA-lJ7Jtt32EWBtY_V5JEmXW3blBj1q8SvFuPyuhCjCU5N8TRN4FjH9OucatEGansE9oNrpU' },
    footerText: { type: String, default: '© 2025 RUSA TECH Inc. High-Performance Web Agency.' },
    contactEmail: { type: String, default: 'contact@rusatech.com' },
    phone: { type: String, default: '+1 (415) 890-4280' },
    address: { type: String, default: 'San Francisco, CA • Orbital Operations' },
  },
  { timestamps: true }
);

const MongooseSiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);
export const SiteSettings = createModel('SiteSettings', siteSettingsSchema, MongooseSiteSettings);
