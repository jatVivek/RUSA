import mongoose from 'mongoose';
import { createModel } from './store.js';

const offerBannerSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    buttonText: { type: String, default: '' },
    buttonUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    startsAt: { type: Date, default: null },
    endsAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MongooseOfferBanner = mongoose.models.OfferBanner || mongoose.model('OfferBanner', offerBannerSchema);
export const OfferBanner = createModel('OfferBanner', offerBannerSchema, MongooseOfferBanner);
