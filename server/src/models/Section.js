import mongoose from 'mongoose';
import { createModel } from './store.js';

export const MANDATORY_SECTION_KEYS = [
  'hero',
  'about',
  'skills',
  'services',
  'experience',
  'products',
  'blog',
  'testimonials',
  'contact',
];

const sectionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isMandatory: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MongooseSection = mongoose.models.Section || mongoose.model('Section', sectionSchema);
export const Section = createModel('Section', sectionSchema, MongooseSection);
