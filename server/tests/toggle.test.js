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

describe('Dynamic Visibility & Toggle Acceptance Tests', () => {
  test('Toggling a product off removes it from the public payload immediately', async () => {
    // 1. Fetch public products
    const initialRes = await request(app).get('/api/public/products');
    expect(initialRes.status).toBe(200);
    const initialCount = initialRes.body.data.length;
    expect(initialCount).toBeGreaterThan(0);

    const targetProduct = initialRes.body.data[0];
    const targetId = targetProduct._id;

    // 2. Toggle off via admin endpoint
    const toggleRes = await request(app)
      .patch(`/api/admin/product/${targetId}/toggle`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isActive: false });

    expect(toggleRes.status).toBe(200);
    expect(toggleRes.body.data.isActive).toBe(false);

    // 3. Verify public products no longer contains the toggled product
    const updatedPublicRes = await request(app).get('/api/public/products');
    expect(updatedPublicRes.status).toBe(200);
    expect(updatedPublicRes.body.data.length).toBe(initialCount - 1);
    const found = updatedPublicRes.body.data.find((p) => p._id === targetId);
    expect(found).toBeUndefined();

    // 4. Toggle back on
    await request(app)
      .patch(`/api/admin/product/${targetId}/toggle`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isActive: true });

    const restoredRes = await request(app).get('/api/public/products');
    expect(restoredRes.body.data.length).toBe(initialCount);
  });

  test('Toggling a section off removes its content from /api/public/site', async () => {
    // 1. Get sections list from admin
    const sectionsRes = await request(app)
      .get('/api/admin/section')
      .set('Authorization', `Bearer ${adminToken}`);

    const servicesSection = sectionsRes.body.data.find((s) => s.key === 'services');
    expect(servicesSection).toBeDefined();

    // 2. Toggle services section off
    await request(app)
      .patch(`/api/admin/section/${servicesSection._id}/toggle`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isActive: false });

    // 3. Fetch public site
    const siteRes = await request(app).get('/api/public/site');
    expect(siteRes.status).toBe(200);
    // Section key is absent from active sections list
    const hasServicesInSections = siteRes.body.data.sections.some((s) => s.key === 'services');
    expect(hasServicesInSections).toBe(false);
    // Services content is empty
    expect(siteRes.body.data.content.services).toEqual([]);

    // 4. Restore services section to active
    await request(app)
      .patch(`/api/admin/section/${servicesSection._id}/toggle`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isActive: true });

    const siteRestoredRes = await request(app).get('/api/public/site');
    expect(siteRestoredRes.body.data.content.services.length).toBeGreaterThan(0);
  });

  test('Attempting to delete a mandatory section is rejected with 403', async () => {
    const sectionsRes = await request(app)
      .get('/api/admin/section')
      .set('Authorization', `Bearer ${adminToken}`);

    const heroSection = sectionsRes.body.data.find((s) => s.key === 'hero');
    expect(heroSection).toBeDefined();

    const deleteRes = await request(app)
      .delete(`/api/admin/section/${heroSection._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(deleteRes.status).toBe(403);
    expect(deleteRes.body.success).toBe(false);
    expect(deleteRes.body.message).toContain('Mandatory section');
  });
});
