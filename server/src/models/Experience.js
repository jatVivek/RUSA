import mongoose from 'mongoose';
import { createModel } from './store.js';

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    achievements: [{ type: String }],
    technologies: [{ type: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MongooseExperience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
export const Experience = createModel('Experience', experienceSchema, MongooseExperience);
