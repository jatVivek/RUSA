import {
  PublicSitePayload,
  OfferBanner,
  ProductItem,
  BlogPost,
  AdminUser,
} from '../types';
import { fallbackSitePayload } from '../data/fallbackData';

const API_BASE = '/api';

// Helper for authorized headers
export function getAdminToken(): string | null {
  return localStorage.getItem('rusatech_admin_token') || localStorage.getItem('synthetix_admin_token');
}

function getAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/* ==========================================================================
   PUBLIC API
   ========================================================================== */

export async function fetchSitePayload(): Promise<PublicSitePayload> {
  try {
    const res = await fetch(`${API_BASE}/public/site?_t=${Date.now()}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });
    if (!res.ok) {
      console.warn(`[Rusa Tech] /api/public/site returned HTTP ${res.status}. Using embedded fallback payload.`);
      return fallbackSitePayload;
    }
    const json = await res.json();
    return json.data || fallbackSitePayload;
  } catch (err) {
    console.warn('[Rusa Tech] Backend API unreachable (e.g. Vercel static deployment). Using embedded fallback payload.', err);
    return fallbackSitePayload;
  }
}

export async function fetchOfferBanner(): Promise<OfferBanner | null> {
  try {
    const res = await fetch(`${API_BASE}/public/offer`);
    if (res.status === 204) return null;
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export async function fetchPublicProducts(): Promise<ProductItem[]> {
  try {
    const res = await fetch(`${API_BASE}/public/products`);
    if (!res.ok) return fallbackSitePayload.content.products;
    const json = await res.json();
    return json.data || fallbackSitePayload.content.products;
  } catch {
    return fallbackSitePayload.content.products;
  }
}

export async function fetchPublicBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_BASE}/public/blogs`);
    if (!res.ok) return fallbackSitePayload.content.blogs;
    const json = await res.json();
    return json.data || fallbackSitePayload.content.blogs;
  } catch {
    return fallbackSitePayload.content.blogs;
  }
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_BASE}/public/blogs/${slug}`);
    if (!res.ok) {
      const match = fallbackSitePayload.content.blogs.find((b) => b.slug === slug);
      return match || null;
    }
    const json = await res.json();
    return json.data || null;
  } catch {
    const match = fallbackSitePayload.content.blogs.find((b) => b.slug === slug);
    return match || null;
  }
}

export async function submitContactForm(payload: {
  name: string;
  email: string;
  message: string;
  projectType?: string;
  budget?: string;
  company?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/public/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    if (res.ok) {
      const json = await res.json();
      return json;
    }

    // If server returned 404 or error on static host, save to localStorage
    const offlineLeads = JSON.parse(localStorage.getItem('rusatech_offline_leads') || '[]');
    offlineLeads.push({ ...payload, submittedAt: new Date().toISOString() });
    localStorage.setItem('rusatech_offline_leads', JSON.stringify(offlineLeads));

    return {
      success: true,
      message: 'Project brief received! Our lead architect will be in touch within 24 hours.',
    };
  } catch (err) {
    // Network offline / static host fallback
    const offlineLeads = JSON.parse(localStorage.getItem('rusatech_offline_leads') || '[]');
    offlineLeads.push({ ...payload, submittedAt: new Date().toISOString() });
    localStorage.setItem('rusatech_offline_leads', JSON.stringify(offlineLeads));

    return {
      success: true,
      message: 'Project brief received! Our lead architect will be in touch within 24 hours.',
    };
  }
}

/* ==========================================================================
   AUTH API
   ========================================================================== */

export async function loginAdmin(
  email: string,
  pass: string
): Promise<{ user: AdminUser; token: string }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Login failed');
  }
  if (json.data?.accessToken) {
    localStorage.setItem('rusatech_admin_token', json.data.accessToken);
    localStorage.setItem('rusatech_admin_user', JSON.stringify(json.data.user));
    localStorage.removeItem('synthetix_admin_token');
    localStorage.removeItem('synthetix_admin_user');
  }
  return { user: json.data.user, token: json.data.accessToken };
}

export async function logoutAdmin(): Promise<void> {
  try {
    await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
  } finally {
    localStorage.removeItem('rusatech_admin_token');
    localStorage.removeItem('rusatech_admin_user');
    localStorage.removeItem('synthetix_admin_token');
    localStorage.removeItem('synthetix_admin_user');
  }
}

export async function getAdminProfile(): Promise<AdminUser | null> {
  const token = getAdminToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

/* ==========================================================================
   ADMIN CMS APIS
   ========================================================================== */

export async function fetchAdminResource<T = any>(resource: string): Promise<T> {
  const res = await fetch(`${API_BASE}/admin/${resource}`, {
    headers: getAuthHeaders(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Failed to fetch ${resource}`);
  return json.data;
}

export async function updateAdminResource<T = any>(
  resource: string,
  id: string,
  data: any
): Promise<T> {
  const cleanData = data && typeof data === 'object' ? { ...data } : data;
  if (cleanData && typeof cleanData === 'object') {
    delete cleanData._id;
    delete cleanData.createdAt;
    delete cleanData.updatedAt;
  }

  const res = await fetch(`${API_BASE}/admin/${resource}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(cleanData),
  });
  if (res.status === 401) {
    throw new Error('Authentication expired. Please log in again.');
  }
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Failed to update ${resource}`);
  return json.data;
}

export async function createAdminResource<T = any>(
  resource: string,
  data: any
): Promise<T> {
  const cleanData = data && typeof data === 'object' ? { ...data } : data;
  if (cleanData && typeof cleanData === 'object') {
    delete cleanData._id;
    delete cleanData.createdAt;
    delete cleanData.updatedAt;
  }

  const res = await fetch(`${API_BASE}/admin/${resource}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(cleanData),
  });
  if (res.status === 401) {
    throw new Error('Authentication expired. Please log in again.');
  }
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Failed to create ${resource}`);
  return json.data;
}

export async function deleteAdminResource(
  resource: string,
  id: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/admin/${resource}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Failed to delete ${resource}`);
}

export async function toggleAdminResource<T = any>(
  resource: string,
  id: string,
  isActive?: boolean
): Promise<T> {
  const res = await fetch(`${API_BASE}/admin/${resource}/${id}/toggle`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(isActive !== undefined ? { isActive } : {}),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Failed to toggle ${resource}`);
  return json.data;
}

export async function reorderAdminResource<T = any>(
  resource: string,
  items: Array<{ id: string; order: number }>
): Promise<T> {
  const res = await fetch(`${API_BASE}/admin/${resource}/reorder`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ items }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Failed to reorder ${resource}`);
  return json.data;
}

export async function resetThemePreset(): Promise<any> {
  const res = await fetch(`${API_BASE}/admin/theme/reset`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to reset theme');
  return json.data;
}
