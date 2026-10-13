import mongoose from 'mongoose';
import { createModel } from './store.js';

const aboutSchema = new mongoose.Schema(
  {
    title: { type: String, default: 'About Synthetix Studio' },
    headline: { type: String, default: 'Engineering Precision at the Speed of Startup Velocity' },
    bio: {
      type: String,
      default:
        'Synthetix operates as a high-density collective of senior full-stack architects, distributed systems engineers, and product designers. We reject bloated agency bureaucracy in favor of deterministic two-week sprint delivery.',
    },
    avatar: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpeLYWljWwHHEy04ie4U-vx2scsaDxGmQLlpJVGmc_LJhtvGJsyBzJhEklZ3PhYmNlLuA0qrBAwj0tV5hpUhxf_xYCGTIk-21Hp1Q4ntRh7TIRK3jzBkEWFyuxhr52OJ3GSMSskLgstjWwn054Qacke3htz0VApieLIqCWQ-vsoaV8DmJG1-ObfJhL0FNlUiifCj5vkbH6uyHTsGV_4g_3NFUjgcdhNkJpGCK_y4vDgc_lUdnns1A' },
    stats: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MongooseAbout = mongoose.models.About || mongoose.model('About', aboutSchema);
export const About = createModel('About', aboutSchema, MongooseAbout);
