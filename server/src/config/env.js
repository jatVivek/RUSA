import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'rusatech_super_secret_jwt_key_2025',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'rusatech_super_secret_refresh_jwt_key_2025',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  DEFAULT_ADMIN_NAME: process.env.DEFAULT_ADMIN_NAME || 'RUSA TECH Admin',
  DEFAULT_ADMIN_EMAIL: (process.env.DEFAULT_ADMIN_EMAIL || 'admin@rusatech.com').toLowerCase(),
  DEFAULT_ADMIN_PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD || 'admin123456',
  CONTACT_RECEIVER_EMAIL: process.env.CONTACT_RECEIVER_EMAIL || 'contact@rusatech.com',
};
