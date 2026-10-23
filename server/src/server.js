import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorResponse } from './utils/response.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.resolve(__dirname, '../uploads');

export const app = express();

// Trust reverse proxy (Cloud Run, Vercel, Google Cloud, Heroku) for accurate IP identification
app.set('trust proxy', 1);

// 1. Explicitly remove X-Powered-By to prevent technology fingerprinting
app.disable('x-powered-by');

// 2. Custom header protection middleware: strip revealing headers & enforce security
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.removeHeader('Server');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// 3. Helmet security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // relaxed for embedded studio preview
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
    frameguard: false, // relaxed for AI Studio preview iframe
    hidePoweredBy: true,
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
  })
);

// 4. Origin-controlled CORS
const ALLOWED_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https?:\/\/.*\.run\.app$/,
  /^https?:\/\/.*\.googleusercontent\.com$/,
  /^https?:\/\/.*\.aistudio\.google\.com$/,
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      const isAllowed = ALLOWED_ORIGIN_PATTERNS.some((pat) => pat.test(origin));
      if (isAllowed) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// 5. Body & Cookie Parsing with size limits
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// 6. Secure Static Uploads Serving
app.use(
  '/uploads',
  (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'");
    next();
  },
  express.static(UPLOADS_DIR, {
    dotfiles: 'ignore',
    fallthrough: false,
    setHeaders: (res) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
    },
  })
);

// 7. Global API Rate Limiter
app.use('/api', apiLimiter);

// 8. Mount central API routes
app.use('/api', routes);

// 9. API 404 Fallback: Unmatched /api/* calls must return JSON 404, never leak HTML
app.use('/api', (req, res) => {
  return errorResponse(res, 'API endpoint not found', 404);
});

// 10. Central Error Handler (sanitized, zero-disclosure)
app.use(errorHandler);

export async function startServer(port = ENV.PORT) {
  await connectDB();
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(` RUSA TECH Portfolio API Server listening on port ${port}`);
      resolve(server);
    });
  });
}

// Run directly if invoked from command line
if (process.argv[1]?.endsWith('server.js')) {
  startServer();
}
