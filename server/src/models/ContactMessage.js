import mongoose from 'mongoose';
import { createModel } from './store.js';

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    projectType: { type: String, default: 'SaaS Web App' },
    budget: { type: String, default: '$15k – $30k' },
    company: { type: String, default: '' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MongooseContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);
export const ContactMessage = createModel('ContactMessage', contactMessageSchema, MongooseContactMessage);
