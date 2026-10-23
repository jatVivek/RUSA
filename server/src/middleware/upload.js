import multer from 'multer';
import path from 'path';

const MIME_MAP = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'image/x-icon': '.ico',
  'image/vnd.microsoft.icon': '.ico',
  'image/avif': '.avif',
};

// Memory storage buffers images directly in memory for instant base64 conversion
// 100% immune to read-only serverless filesystems (Vercel, AWS Lambda, Cloud Run)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = file.originalname ? path.extname(file.originalname).toLowerCase() : '';
  const isAllowedExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.ico', '.avif'].includes(ext);
  if (MIME_MAP[file.mimetype] || isAllowedExt) {
    cb(null, true);
  } else {
    const err = new Error('Invalid image file format. Allowed formats: SVG, PNG, WEBP, JPEG, GIF, ICO, AVIF.');
    err.statusCode = 400;
    cb(err, false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1,
  },
  fileFilter,
});

