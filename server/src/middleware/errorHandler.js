import { errorResponse } from '../utils/response.js';

export function errorHandler(err, req, res, next) {
  // Log internally for debugging, never reveal internal details to client
  console.error('[Error Guard]', err.name || 'Error', err.message || err);

  // Mongoose validation error (sanitize, do not dump raw schemas or database internals)
  if (err.name === 'ValidationError') {
    const safeErrors = err.errors
      ? Object.keys(err.errors).map((field) => ({
          field,
          message: 'Invalid or missing field value',
        }))
      : null;
    return errorResponse(res, 'Request validation failed', 400, safeErrors);
  }

  // Duplicate key error
  if (err.code === 11000) {
    return errorResponse(res, 'A resource with this identifier already exists.', 409);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid authentication token.', 401);
  }
  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Authentication token has expired. Please log in again.', 401);
  }

  // Multer upload error
  if (err.name === 'MulterError') {
    return errorResponse(res, `Upload error: ${err.message}`, 400);
  }

  const statusCode = err.statusCode && err.statusCode >= 400 && err.statusCode < 600 ? err.statusCode : 500;
  // In production / 500 errors, hide all system details, stack traces, and internal driver messages
  const message =
    statusCode >= 500
      ? 'An unexpected error occurred. Please try again later.'
      : err.message || 'Request could not be processed.';

  return errorResponse(res, message, statusCode);
}
