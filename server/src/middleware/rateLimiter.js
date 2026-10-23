import rateLimit from 'express-rate-limit';

// Global API Limiter: prevents abuse/DoS across all /api routes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // max 500 requests per IP per 15 minutes
  validate: false,
  message: {
    success: false,
    message: 'Too many requests from this client. Please slow down and try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict Limiter for sensitive Auth operations (login, refresh, change-password)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // strict limit against credential brute force
  validate: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Contact brief submissions
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit spam submissions
  validate: false,
  message: {
    success: false,
    message: 'Too many contact requests from this client. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// File upload rate limiter
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // max 30 uploads per 15 mins
  validate: false,
  message: {
    success: false,
    message: 'Upload rate limit reached. Please wait before uploading more files.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
