import mongoose from 'mongoose';
import { createModel } from './store.js';

const siteSettingsSchema = new mongoose.Schema(
  {
    siteTitle: { type: String, default: 'Synthetix Studio' },
    tagline: { type: String, default: 'High-Performance Web Engineering & UI/UX Studio' },
    logoLight: { type: String, default: 'https://lh3.googleusercontent.com/aida/AEtjO1XMwk0vjmYiG-c-mPIGezb_SacR2QHiT-jJmxkFIRLbYg6hxGgvBAJZ8xdNGaTI-553skyNG9OIv3004qS_euzSWtAcmRUjp6M284egBBGUx_On4CP8IAlBsSEWtdMu9jPycgPveUabo0r4hPlNbRAbdkZZxvQ4ARXe_zooVS8hB87gbnUQzVRAs91rXA28bTBF0mlj22qUO9vVnCkhPtLZIABLoyh0KBKRT9fr9gxnky5oHdAvWR9gdQ' },
    logoDark: { type: String, default: 'https://lh3.googleusercontent.com/aida/AEtjO1XMwk0vjmYiG-c-mPIGezb_SacR2QHiT-jJmxkFIRLbYg6hxGgvBAJZ8xdNGaTI-553skyNG9OIv3004qS_euzSWtAcmRUjp6M284egBBGUx_On4CP8IAlBsSEWtdMu9jPycgPveUabo0r4hPlNbRAbdkZZxvQ4ARXe_zooVS8hB87gbnUQzVRAs91rXA28bTBF0mlj22qUO9vVnCkhPtLZIABLoyh0KBKRT9fr9gxnky5oHdAvWR9gdQ' },
    favicon: { type: String, default: 'https://lh3.googleusercontent.com/aida/AEtjO1XMwk0vjmYiG-c-mPIGezb_SacR2QHiT-jJmxkFIRLbYg6hxGgvBAJZ8xdNGaTI-553skyNG9OIv3004qS_euzSWtAcmRUjp6M284egBBGUx_On4CP8IAlBsSEWtdMu9jPycgPveUabo0r4hPlNbRAbdkZZxvQ4ARXe_zooVS8hB87gbnUQzVRAs91rXA28bTBF0mlj22qUO9vVnCkhPtLZIABLoyh0KBKRT9fr9gxnky5oHdAvWR9gdQ' },
    seoTitle: { type: String, default: 'Synthetix Studio | Modern Full-Stack Web Agency & Systems' },
    seoDescription: { type: String, default: 'Premier full-stack web engineering studio building modern SaaS platforms, headless e-commerce, and high-performance digital products for venture-backed startups and enterprises.' },
    ogImage: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hQX_71e363t0WKA5wsEHXD99U5DcfthqsDvEAK30kKBzJgLSCvpoMdstHdoIo2voJ4HCoLfbORMU7dIyC61GXO-th-RNwie971yBgquKzwn4qkrRvt0vp8WtVA9xUyMpu-QCVDw530109VoDX7VbK6xK8UK1uVLQgydgZC5m-i7YA-lJ7Jtt32EWBtY_V5JEmXW3blBj1q8SvFuPyuhCjCU5N8TRN4FjH9OucatEGansE9oNrpU' },
    footerText: { type: String, default: '© 2025 Synthetix Studio Inc. High-Performance Web Agency.' },
    contactEmail: { type: String, default: 'founder@synthetix.studio' },
    phone: { type: String, default: '+1 (415) 890-4280' },
    address: { type: String, default: 'San Francisco, CA • Orbital Operations' },
  },
  { timestamps: true }
);

const MongooseSiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);
export const SiteSettings = createModel('SiteSettings', siteSettingsSchema, MongooseSiteSettings);
