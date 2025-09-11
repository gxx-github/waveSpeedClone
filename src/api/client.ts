export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const BASE_URL = 'http://47.242.127.155:8000';

function getAuthToken(): string | null {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = getAuthToken();
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json() as Promise<T>;
  }
  // @ts-expect-error allow non-json
  return undefined as T;
}

// Domain helpers
export const api = {
  // Models
  listModels: () => apiRequest<any>('/api/models', { method: 'GET' }),

  // API Keys (naming per backend: create/list)
  createApiKey: (name: string) =>
    apiRequest<any>('/api/create', { method: 'POST', body: JSON.stringify({ name }) }),
  listApiKeys: () => apiRequest<any>('/api/list', { method: 'GET' }),

  // Auth (placeholder until exact contract known)
  loginWithToken: (username: string, password: string) =>
    apiRequest<{ access_token: string; token_type: string }>(
      '/auth/token',
      { method: 'POST', body: JSON.stringify({ username, password }) }
    ),
};


