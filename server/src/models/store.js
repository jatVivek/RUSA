import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { isUsingMongo } from '../config/db.js';

import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');
const TMP_DATA_FILE = path.join(os.tmpdir(), 'rusatech_db.json');

// Built-in verified admin accounts (password is admin123456)
const DEFAULT_ADMINS = [
  {
    _id: 'id_qmbb9k3avmv6plh3l',
    name: 'RUSA TECH Admin',
    email: 'admin@rusatech.com',
    passwordHash: '$2b$10$P8QF5xQB9z2Jxro9DgrBxeP4554lhIwopHahaSa3Al3pKU/i8j6AW',
    role: 'superadmin',
    createdAt: '2026-10-13T13:20:51.921Z',
    updatedAt: '2026-10-13T13:20:51.921Z',
  },
  {
    _id: 'id_w5qc9hrvjmv6plh6q',
    name: 'RUSA TECH Studio Admin',
    email: 'admin@synthetix.studio',
    passwordHash: '$2b$10$VB0fb0BwOVNoLMvqfMc9duN914FX6PjLyJsi0jYLIzppH78IuFfze',
    role: 'superadmin',
    createdAt: '2026-10-13T13:20:52.034Z',
    updatedAt: '2026-10-13T13:20:52.034Z',
  },
  {
    _id: 'id_7r711jdcumv6p0rd1',
    name: 'Vance R. Sterling',
    email: 'admin@synthetix.ai',
    passwordHash: '$2b$10$WWa7CT0PXupVahHeOc7l/uYoGwWhSdYTuXTx7Y5G7XrK84LyWm.dO',
    role: 'superadmin',
    createdAt: '2026-10-13T13:04:45.445Z',
    updatedAt: '2026-10-13T13:04:45.445Z',
  },
];

// In-memory cache for ultra-fast response and serverless fallback
let inMemoryDb = null;

function generateId() {
  return 'id_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

function readData() {
  if (inMemoryDb && Object.keys(inMemoryDb).length > 0) {
    ensureDefaultAdmins(inMemoryDb);
    return inMemoryDb;
  }

  let parsed = {};

  // 1. Try reading from /tmp/rusatech_db.json first (if previously written in serverless)
  try {
    if (fs.existsSync(TMP_DATA_FILE)) {
      const raw = fs.readFileSync(TMP_DATA_FILE, 'utf-8');
      parsed = JSON.parse(raw || '{}');
    }
  } catch {
    // fallback
  }

  // 2. Try reading from server/data/db.json
  if (!parsed || Object.keys(parsed).length === 0) {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        parsed = JSON.parse(raw || '{}');
      }
    } catch {
      // fallback
    }
  }

  ensureDefaultAdmins(parsed);
  inMemoryDb = parsed;
  return inMemoryDb;
}

function ensureDefaultAdmins(db) {
  if (!db.admins || !Array.isArray(db.admins) || db.admins.length === 0) {
    db.admins = [...DEFAULT_ADMINS];
  } else {
    for (const def of DEFAULT_ADMINS) {
      const exists = db.admins.some((a) => a.email?.toLowerCase() === def.email.toLowerCase());
      if (!exists) {
        db.admins.push(def);
      }
    }
  }
}

function writeData(data) {
  inMemoryDb = { ...data };
  ensureDefaultAdmins(inMemoryDb);

  // 1. Try writing to primary data directory
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(inMemoryDb, null, 2), 'utf-8');
    return;
  } catch {
    // Read-only filesystem (e.g. Vercel Serverless / AWS Lambda)
  }

  // 2. Fall back to /tmp directory
  try {
    fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(inMemoryDb, null, 2), 'utf-8');
  } catch {
    // Retain in memory
  }
}

/**
 * Creates a model proxy that works with Mongoose when connected,
 * or with embedded JSON file persistence when Mongo is offline.
 */
export function createModel(name, schema, mongooseModel) {
  const collectionName = name.toLowerCase() + 's';

  class CustomQuery {
    constructor(items) {
      this._items = Array.isArray(items) ? [...items] : items ? [{ ...items }] : [];
      this._sortField = null;
      this._sortAsc = 1;
      this._limitVal = null;
    }

    sort(criteria) {
      if (typeof criteria === 'object') {
        const [field, direction] = Object.entries(criteria)[0] || [];
        this._sortField = field;
        this._sortAsc = direction === -1 || direction === 'desc' ? -1 : 1;
      } else if (typeof criteria === 'string') {
        if (criteria.startsWith('-')) {
          this._sortField = criteria.slice(1);
          this._sortAsc = -1;
        } else {
          this._sortField = criteria;
          this._sortAsc = 1;
        }
      }
      return this;
    }

    limit(num) {
      this._limitVal = num;
      return this;
    }

    select() {
      return this;
    }

    populate() {
      return this;
    }

    lean() {
      return this;
    }

    then(resolve, reject) {
      let result = this._items;
      if (this._sortField) {
        result.sort((a, b) => {
          const valA = a[this._sortField];
          const valB = b[this._sortField];
          if (valA === undefined) return 1;
          if (valB === undefined) return -1;
          if (valA < valB) return -1 * this._sortAsc;
          if (valA > valB) return 1 * this._sortAsc;
          return 0;
        });
      }
      if (typeof this._limitVal === 'number') {
        result = result.slice(0, this._limitVal);
      }
      return Promise.resolve(result).then(resolve, reject);
    }
  }

  class CustomSingleQuery {
    constructor(item) {
      this._item = item;
    }
    select() { return this; }
    populate() { return this; }
    lean() { return this; }
    sort() { return this; }
    then(resolve, reject) {
      return Promise.resolve(this._item).then(resolve, reject);
    }
  }

  function matches(doc, filter = {}) {
    if (!filter || Object.keys(filter).length === 0) return true;
    for (const [key, value] of Object.entries(filter)) {
      if (key === '_id' || key === 'id') {
        if ((doc._id || doc.id) !== value) return false;
      } else if (typeof value === 'object' && value !== null) {
        if ('$ne' in value && doc[key] === value.$ne) return false;
        if ('$in' in value && !value.$in.includes(doc[key])) return false;
        if ('$lte' in value && !(doc[key] <= value.$lte)) return false;
        if ('$gte' in value && !(doc[key] >= value.$gte)) return false;
      } else if (doc[key] !== value) {
        return false;
      }
    }
    return true;
  }

  const modelProxy = {
    name,
    collectionName,
    schema,

    find(filter = {}) {
      if (isUsingMongo && mongooseModel) {
        return mongooseModel.find(filter);
      }
      const db = readData();
      const list = db[collectionName] || [];
      const filtered = list.filter((item) => matches(item, filter));
      return new CustomQuery(filtered);
    },

    findOne(filter = {}) {
      if (isUsingMongo && mongooseModel) {
        return mongooseModel.findOne(filter);
      }
      const db = readData();
      const list = db[collectionName] || [];
      const item = list.find((it) => matches(it, filter));
      return new CustomSingleQuery(item ? { ...item } : null);
    },

    findById(id) {
      if (isUsingMongo && mongooseModel) {
        return mongooseModel.findById(id);
      }
      return this.findOne({ _id: id });
    },

    async create(payload) {
      if (isUsingMongo && mongooseModel) {
        return mongooseModel.create(payload);
      }
      const db = readData();
      db[collectionName] = db[collectionName] || [];

      if (Array.isArray(payload)) {
        const created = payload.map((p) => ({
          ...p,
          _id: p._id || generateId(),
          createdAt: p.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
        db[collectionName].push(...created);
        writeData(db);
        return created;
      }

      const doc = {
        ...payload,
        _id: payload._id || generateId(),
        createdAt: payload.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db[collectionName].push(doc);
      writeData(db);
      return { ...doc };
    },

    async findByIdAndUpdate(id, update, options = { new: true }) {
      if (isUsingMongo && mongooseModel) {
        return mongooseModel.findByIdAndUpdate(id, update, options);
      }
      return this.findOneAndUpdate({ _id: id }, update, options);
    },

    async findOneAndUpdate(filter, update, options = { new: true, upsert: false }) {
      if (isUsingMongo && mongooseModel) {
        return mongooseModel.findOneAndUpdate(filter, update, options);
      }
      const db = readData();
      db[collectionName] = db[collectionName] || [];
      const index = db[collectionName].findIndex((it) => matches(it, filter));

      const actualUpdate = update.$set ? { ...update.$set } : { ...update };
      delete actualUpdate.$set;
      delete actualUpdate._id;
      delete actualUpdate.id;
      delete actualUpdate.createdAt;

      if (index === -1) {
        if (options.upsert) {
          const doc = {
            ...filter,
            ...actualUpdate,
            _id: filter._id || generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          db[collectionName].push(doc);
          writeData(db);
          return { ...doc };
        }
        return null;
      }

      const existing = db[collectionName][index];
      const updated = {
        ...existing,
        ...actualUpdate,
        updatedAt: new Date().toISOString(),
      };
      db[collectionName][index] = updated;
      writeData(db);
      return { ...updated };
    },

    async deleteOne(filter) {
      if (isUsingMongo && mongooseModel) {
        return mongooseModel.deleteOne(filter);
      }
      const db = readData();
      db[collectionName] = db[collectionName] || [];
      const prevLen = db[collectionName].length;
      db[collectionName] = db[collectionName].filter((it) => !matches(it, filter));
      const deletedCount = prevLen - db[collectionName].length;
      writeData(db);
      return { deletedCount };
    },

    async findByIdAndDelete(id) {
      if (isUsingMongo && mongooseModel) {
        return mongooseModel.findByIdAndDelete(id);
      }
      const existing = await this.findById(id);
      if (existing) {
        await this.deleteOne({ _id: id });
      }
      return existing;
    },

    async deleteMany(filter = {}) {
      if (isUsingMongo && mongooseModel) {
        return mongooseModel.deleteMany(filter);
      }
      const db = readData();
      db[collectionName] = db[collectionName] || [];
      const prevLen = db[collectionName].length;
      db[collectionName] = db[collectionName].filter((it) => !matches(it, filter));
      writeData(db);
      return { deletedCount: prevLen - db[collectionName].length };
    },

    async countDocuments(filter = {}) {
      if (isUsingMongo && mongooseModel) {
        return mongooseModel.countDocuments(filter);
      }
      const db = readData();
      const list = db[collectionName] || [];
      return list.filter((it) => matches(it, filter)).length;
    },
  };

  return modelProxy;
}
