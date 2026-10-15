import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export function signAccessToken(payload) {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
    expiresIn: ENV.JWT_REFRESH_EXPIRES_IN,
  });
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, ENV.JWT_REFRESH_SECRET);
  } catch {
    return null;
  }
}

export const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
};

export const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  path: '/',
};
