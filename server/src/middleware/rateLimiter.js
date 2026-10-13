import rateLimit from 'express-rate-limit';

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 contact submissions per 15 minutes
  message: {
    success: false,
    message: 'Too many contact submissions from this IP, please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 30 login attempts per 15 minutes
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
