import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { app as serverApp, startServer } from './server/src/server.js';
import { connectDB } from './server/src/config/db.js';
import { runSeed } from './server/src/seed/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);

async function bootstrap() {
  // 1. Connect to database and seed default data if database is empty
  await connectDB();
  await runSeed(false);

  const app = serverApp;

  // 2. Vite middleware in dev or static files in production
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  // 3. Listen on port 3000
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 RUSA TECH Full-Stack app running at http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start full-stack server:', err);
  process.exit(1);
});
