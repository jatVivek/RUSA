import { Router } from 'express';
import {
  listItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  toggleItem,
  reorderItems,
  resetTheme,
  uploadImage,
} from '../controllers/adminController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// Protect ALL admin routes with requireAuth
router.use(requireAuth);

// File upload
router.post('/upload', upload.single('image'), uploadImage);

// Theme reset
router.post('/theme/reset', resetTheme);

// Reorder & Toggle
router.patch('/:resource/reorder', reorderItems);
router.patch('/:resource/:id/toggle', toggleItem);

// Generic CRUD endpoints
router.get('/:resource', listItems);
router.get('/:resource/:id', getItemById);
router.post('/:resource', createItem);
router.put('/:resource/:id', updateItem);
router.delete('/:resource/:id', deleteItem);

export default router;
