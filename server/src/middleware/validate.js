import { errorResponse } from '../utils/response.js';

export function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err.errors) {
        const issues = err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return errorResponse(res, 'Validation failed for request body', 400, issues);
      }
      return errorResponse(res, err.message, 400);
    }
  };
}

export function validateQuery(schema) {
  return (req, res, next) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (err) {
      if (err.errors) {
        const issues = err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return errorResponse(res, 'Validation failed for query parameters', 400, issues);
      }
      return errorResponse(res, err.message, 400);
    }
  };
}
