import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { isUsingMongo } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

function generateId() {
  return 'id_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    return {};
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw || '{}');
  } catch {
    return {};
  }
}

function writeData(data) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
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
