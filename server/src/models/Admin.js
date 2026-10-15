import mongoose from 'mongoose';
import { createModel } from './store.js';

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.passwordHash;
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        delete ret.passwordHash;
        return ret;
      },
    },
  }
);

const MongooseAdmin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export const Admin = createModel('Admin', adminSchema, MongooseAdmin);
