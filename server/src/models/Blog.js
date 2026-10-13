import mongoose from 'mongoose';
import { createModel } from './store.js';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true }, // markdown or HTML
    coverImage: { type: String, default: '' },
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    publishedAt: { type: Date, default: Date.now },
    readTime: { type: String, default: '14 min read' },
    author: {
      name: { type: String, default: 'Vance R. Sterling' },
      role: { type: String, default: 'Chief AI Architect' },
      avatar: { type: String, default: '' },
    },
    doi: { type: String, default: '10.5921/syn.2025.0328' },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    helpfulVotes: { type: Number, default: 142 },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MongooseBlog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export const Blog = createModel('Blog', blogSchema, MongooseBlog);
