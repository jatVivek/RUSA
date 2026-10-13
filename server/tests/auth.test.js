import request from 'supertest';
import { app } from '../src/server.js';
import { runSeed } from '../src/seed/seed.js';
import { ENV } from '../src/config/env.js';

beforeAll(async () => {
  await runSeed(true);
});

describe('Authentication API & Security Tests', () => {
  let adminToken = '';
  let refreshTokenCookie = '';

  test('POST /api/auth/login succeeds with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: ENV.DEFAULT_ADMIN_EMAIL,
        password: ENV.DEFAULT_ADMIN_PASSWORD,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(ENV.DEFAULT_ADMIN_EMAIL);
    expect(res.body.data.accessToken).toBeDefined();

    adminToken = res.body.data.accessToken;

    // Check httpOnly cookies were set
    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    const hasAccessTokenCookie = cookies.some((c) => c.includes('accessToken='));
    expect(hasAccessTokenCookie).toBe(true);

    const refreshCookie = cookies.find((c) => c.includes('refreshToken='));
    if (refreshCookie) {
      refreshTokenCookie = refreshCookie.split(';')[0];
    }
  });

  test('POST /api/auth/login fails with invalid password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: ENV.DEFAULT_ADMIN_EMAIL,
        password: 'WrongPassword999!',
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('GET /api/admin/theme rejects unauthenticated request with 401', async () => {
    const res = await request(app).get('/api/admin/theme');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('GET /api/admin/theme allows authenticated admin with Bearer token', async () => {
    const res = await request(app)
      .get('/api/admin/theme')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.colors).toBeDefined();
  });

  test('POST /api/auth/logout clears tokens', async () => {
    const res = await request(app).post('/api/auth/logout');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
