import mongoose from 'mongoose';
import { createModel } from './store.js';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'web' },
    tag: { type: String, default: 'Sprint Ready' },
    badgeColor: { type: String, default: 'primary' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MongooseService = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export const Service = createModel('Service', serviceSchema, MongooseService);
