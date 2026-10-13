import request from 'supertest';
import { app } from '../src/server.js';
import { runSeed } from '../src/seed/seed.js';
import { ENV } from '../src/config/env.js';

let adminToken = '';

beforeAll(async () => {
  await runSeed(true);
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: ENV.DEFAULT_ADMIN_EMAIL,
      password: ENV.DEFAULT_ADMIN_PASSWORD,
    });
  adminToken = loginRes.body.data.accessToken;
});

describe('Offer Banner Visibility Rule Tests', () => {
  test('Active offer banner without dates returns 200 with banner content', async () => {
    const res = await request(app).get('/api/public/offer');
    expect([200, 204]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.data.text).toBeDefined();
    }
  });

  test('Toggling offer banner to inactive makes /api/public/offer return 204 or null', async () => {
    // 1. Get banner
    const bannersRes = await request(app)
      .get('/api/admin/offerbanner')
      .set('Authorization', `Bearer ${adminToken}`);

    const banner = bannersRes.body.data[0];
    expect(banner).toBeDefined();

    // 2. Set inactive
    await request(app)
      .patch(`/api/admin/offerbanner/${banner._id}/toggle`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isActive: false });

    // 3. Public offer request should return 204 or null
    const publicRes = await request(app).get('/api/public/offer');
    expect(publicRes.status).toBe(204);

    // 4. Restore
    await request(app)
      .patch(`/api/admin/offerbanner/${banner._id}/toggle`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isActive: true });

    const restoredRes = await request(app).get('/api/public/offer');
    expect(restoredRes.status).toBe(200);
    expect(restoredRes.body.data.text).toBeDefined();
  });

  test('Expired offer banner (endsAt in the past) returns 204 / null', async () => {
    const bannersRes = await request(app)
      .get('/api/admin/offerbanner')
      .set('Authorization', `Bearer ${adminToken}`);

    const banner = bannersRes.body.data[0];

    // Set endsAt to past
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    await request(app)
      .put(`/api/admin/offerbanner/${banner._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ endsAt: pastDate });

    const publicRes = await request(app).get('/api/public/offer');
    expect(publicRes.status).toBe(204);

    // Clean up: reset endsAt to null
    await request(app)
      .put(`/api/admin/offerbanner/${banner._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ endsAt: null });
  });
});
