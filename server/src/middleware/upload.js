import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serverless-safe upload directory: fallback to os.tmpdir() on read-only filesystems (Vercel, AWS Lambda)
let UPLOAD_DIR = path.resolve(__dirname, '../../uploads');
try {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
} catch {
  UPLOAD_DIR = path.join(os.tmpdir(), 'rusatech_uploads');
  try {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
  } catch {
    UPLOAD_DIR = os.tmpdir();
  }
}

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    let safeExt = MIME_MAP[file.mimetype];
    if (!safeExt && file.originalname) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.ico', '.avif'].includes(ext)) {
        safeExt = ext;
      }
    }
    safeExt = safeExt || '.png';
    const randomHex = crypto.randomBytes(16).toString('hex');
    cb(null, `img_${Date.now()}_${randomHex}${safeExt}`);
  },
});

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
