import { Admin } from '../models/Admin.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  ACCESS_COOKIE_OPTIONS,
  REFRESH_COOKIE_OPTIONS,
} from '../utils/jwt.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return errorResponse(res, 'Invalid email or password credentials.', 401);
    }

    const isMatch = await comparePassword(password, admin.passwordHash);
    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password credentials.', 401);
    }

    const userPayload = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    const accessToken = signAccessToken(userPayload);
    const refreshToken = signRefreshToken(userPayload);

    // Set secure httpOnly cookies
    res.cookie('accessToken', accessToken, ACCESS_COOKIE_OPTIONS);
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

    return successResponse(
      res,
      {
        user: userPayload,
        accessToken,
      },
      'Admin logged in successfully'
    );
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res) {
  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/' });
  res.clearCookie('token', { path: '/' });
  return successResponse(res, null, 'Logged out successfully');
}

export async function refreshToken(req, res) {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!token) {
    return errorResponse(res, 'Refresh token required', 401);
  }

  const decoded = verifyRefreshToken(token);
  if (!decoded) {
    return errorResponse(res, 'Invalid or expired refresh token', 401);
  }

  const userPayload = {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
  };

  const newAccessToken = signAccessToken(userPayload);
  res.cookie('accessToken', newAccessToken, ACCESS_COOKIE_OPTIONS);

  return successResponse(
    res,
    {
      accessToken: newAccessToken,
      user: userPayload,
    },
    'Access token refreshed successfully'
  );
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return errorResponse(res, 'Admin account not found', 404);
    }

    const isMatch = await comparePassword(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return errorResponse(res, 'Current password verification failed', 400);
    }

    const newHash = await hashPassword(newPassword);
    await Admin.findByIdAndUpdate(admin._id, { passwordHash: newHash });

    return successResponse(res, null, 'Password updated successfully');
  } catch (err) {
    next(err);
  }
}

export async function getMe(req, res, next) {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return errorResponse(res, 'User not found', 404);
    }
    return successResponse(res, {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  } catch (err) {
    next(err);
  }
}
