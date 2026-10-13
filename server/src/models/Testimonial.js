import mongoose from 'mongoose';
import { createModel } from './store.js';

const testimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    authorName: { type: String, required: true },
    authorRole: { type: String, required: true },
    company: { type: String, default: '' },
    avatar: { type: String, default: '' },
    initials: { type: String, default: 'CL' },
    badgeText: { type: String, default: '2 Weeks Ahead of Schedule' },
    badgeColor: { type: String, default: 'primary' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MongooseTestimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
export const Testimonial = createModel('Testimonial', testimonialSchema, MongooseTestimonial);
