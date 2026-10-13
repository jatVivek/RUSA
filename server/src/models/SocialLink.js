import mongoose from 'mongoose';
import { createModel } from './store.js';

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    label: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, default: 'link' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MongooseSocialLink = mongoose.models.SocialLink || mongoose.model('SocialLink', socialLinkSchema);
export const SocialLink = createModel('SocialLink', socialLinkSchema, MongooseSocialLink);
