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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.resolve(__dirname, '../uploads');

export const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: false, // relaxed for embedded iframes and dynamic styles
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads folder
app.use('/uploads', express.static(UPLOADS_DIR));

// Mount central API routes
app.use('/api', routes);

// Central error handler
app.use(errorHandler);

export async function startServer(port = ENV.PORT) {
  await connectDB();
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(` Synthetix Portfolio API Server listening on port ${port}`);
      resolve(server);
    });
  });
}

// Run directly if invoked from command line
if (process.argv[1]?.endsWith('server.js')) {
  startServer();
}
