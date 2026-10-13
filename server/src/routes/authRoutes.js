import { Router } from 'express';
import { login, logout, refreshToken, changePassword, getMe } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { loginSchema, changePasswordSchema } from '../validators/schemas.js';

const router = Router();

router.post('/login', authLimiter, validateBody(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.post('/change-password', requireAuth, validateBody(changePasswordSchema), changePassword);
router.get('/me', requireAuth, getMe);

export default router;
