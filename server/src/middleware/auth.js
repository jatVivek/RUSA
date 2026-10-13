import { verifyAccessToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/response.js';

export function requireAuth(req, res, next) {
  // Check cookie or Bearer header
  const token = req.cookies?.accessToken || req.cookies?.token || req.headers.authorization?.replace(/^Bearer\s+/, '');

  if (!token) {
    return errorResponse(res, 'Authentication required. No session or token found.', 401);
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return errorResponse(res, 'Invalid or expired authentication token.', 401);
  }

  req.user = decoded;
  next();
}

export function optionalAuth(req, res, next) {
  const token = req.cookies?.accessToken || req.cookies?.token || req.headers.authorization?.replace(/^Bearer\s+/, '');
  if (token) {
    const decoded = verifyAccessToken(token);
    if (decoded) {
      req.user = decoded;
    }
  }
  next();
}
