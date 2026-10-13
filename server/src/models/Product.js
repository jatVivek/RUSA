import mongoose from 'mongoose';
import { createModel } from './store.js';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    url: { type: String, default: '' }, // OPTIONAL visit url
    slug: { type: String, default: '' },
    category: { type: String, default: 'B2B SAAS PLATFORM' },
    statusBadge: { type: String, default: 'LIVE IN PROD' },
    metricHighlight: { type: String, default: '+240% User Activation' },
    metricLabel: { type: String, default: '<50ms Query Latency' },
    tags: [{ type: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MongooseProduct = mongoose.models.Product || mongoose.model('Product', productSchema);
export const Product = createModel('Product', productSchema, MongooseProduct);
