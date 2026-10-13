import { Router } from 'express';
import {
  getSite,
  getBlogs,
  getBlogBySlug,
  getProducts,
  getOffer,
  submitContact,
} from '../controllers/publicController.js';
import { validateBody } from '../middleware/validate.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { contactFormSchema } from '../validators/schemas.js';

const router = Router();

router.get('/site', getSite);
router.get('/blogs', getBlogs);
router.get('/blogs/:slug', getBlogBySlug);
router.get('/products', getProducts);
router.get('/offer', getOffer);
router.post('/contact', contactLimiter, validateBody(contactFormSchema), submitContact);

export default router;
