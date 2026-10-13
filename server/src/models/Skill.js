import mongoose from 'mongoose';
import { createModel } from './store.js';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Frontend & UI', 'Backend & DB', 'Cloud & Deployment', 'Engineering Standards'],
      default: 'Frontend & UI',
    },
    level: { type: Number, default: 95 }, // percentage or rating
    icon: { type: String, default: 'code' },
    tags: [{ type: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MongooseSkill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
export const Skill = createModel('Skill', skillSchema, MongooseSkill);
