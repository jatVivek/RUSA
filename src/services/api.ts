import {
  PublicSitePayload,
  OfferBanner,
  ProductItem,
  BlogPost,
  AdminUser,
} from '../types';

const API_BASE = '/api';

// Helper for authorized headers
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('synthetix_admin_token');
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
  const res = await fetch(`${API_BASE}/public/site`);
  if (!res.ok) {
    throw new Error(`Failed to load site payload: ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
}

export async function fetchOfferBanner(): Promise<OfferBanner | null> {
  const res = await fetch(`${API_BASE}/public/offer`);
  if (res.status === 204) return null;
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export async function fetchPublicProducts(): Promise<ProductItem[]> {
  const res = await fetch(`${API_BASE}/public/products`);
  if (!res.ok) throw new Error('Failed to load products');
  const json = await res.json();
  return json.data || [];
}

export async function fetchPublicBlogs(): Promise<BlogPost[]> {
  const res = await fetch(`${API_BASE}/public/blogs`);
  if (!res.ok) throw new Error('Failed to load blogs');
  const json = await res.json();
  return json.data || [];
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${API_BASE}/public/blogs/${slug}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export async function submitContactForm(payload: {
  name: string;
  email: string;
  message: string;
  projectType?: string;
  budget?: string;
  company?: string;
}): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/public/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to submit contact brief');
  }
  return json;
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
    localStorage.setItem('synthetix_admin_token', json.data.accessToken);
    localStorage.setItem('synthetix_admin_user', JSON.stringify(json.data.user));
  }
  return { user: json.data.user, token: json.data.accessToken };
}

export async function logoutAdmin(): Promise<void> {
  try {
    await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
  } finally {
    localStorage.removeItem('synthetix_admin_token');
    localStorage.removeItem('synthetix_admin_user');
  }
}

export async function getAdminProfile(): Promise<AdminUser | null> {
  const token = localStorage.getItem('synthetix_admin_token');
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
  const res = await fetch(`${API_BASE}/admin/${resource}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Failed to update ${resource}`);
  return json.data;
}

export async function createAdminResource<T = any>(
  resource: string,
  data: any
): Promise<T> {
  const res = await fetch(`${API_BASE}/admin/${resource}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
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
