import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV } from './env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export let isUsingMongo = false;

export async function connectDB() {
  if (ENV.MONGODB_URI) {
    try {
      // Short timeout so dev/test boot fast if no mongod is running
      await mongoose.connect(ENV.MONGODB_URI, {
        serverSelectionTimeoutMS: 2000,
      });
      isUsingMongo = true;
      console.log(' Connected to MongoDB at:', ENV.MONGODB_URI);
      return;
    } catch (err) {
      console.warn(' MongoDB connection skipped/unavailable:', err.message);
      console.log('⚡ Using embedded JSON datastore at:', DATA_FILE);
    }
  } else {
    console.log('⚡ No MONGODB_URI configured. Using embedded JSON datastore at:', DATA_FILE);
  }
  isUsingMongo = false;
}
