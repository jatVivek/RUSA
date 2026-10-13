import { errorResponse } from '../utils/response.js';

export function errorHandler(err, req, res, next) {
  console.error('Unhandled Application Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return errorResponse(res, 'Validation error in database model', 400, err.errors);
  }

  // Duplicate key error
  if (err.code === 11000) {
    return errorResponse(res, 'Duplicate resource identifier or unique field collision', 409);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token credentials', 401);
  }
  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Authentication token has expired', 401);
  }

  // Multer upload error
  if (err.name === 'MulterError') {
    return errorResponse(res, `Upload error: ${err.message}`, 400);
  }

  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
  const message = err.message || 'Internal server error occurred';
  return errorResponse(res, message, statusCode);
}
