import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.resolve(__dirname, '../../uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const MIME_MAP = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const safeExt = MIME_MAP[file.mimetype] || '.jpg';
    const randomHex = crypto.randomBytes(16).toString('hex');
    cb(null, `img_${Date.now()}_${randomHex}${safeExt}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (MIME_MAP[file.mimetype]) {
    cb(null, true);
  } else {
    const err = new Error('Invalid image file format. Allowed formats: JPEG, PNG, WEBP, GIF.');
    err.statusCode = 400;
    cb(err, false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1,
  },
  fileFilter,
});
