export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// 在开发环境中使用相对路径（通过Vite代理），生产环境也使用相对路径
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  const token = getAuthToken();
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  console.log(`Making API request to: ${BASE_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.parse(options.body as string) : undefined
  });

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers
    });

    console.log(`API response status: ${res.status} ${res.statusText}`);

    if (!res.ok) {
      // 401 统一处理：清理会话并跳转登录
      if (res.status === 401) {
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        } catch {}
        const isAuthRoute = path.startsWith('/auth');
        const onLoginPage = typeof window !== 'undefined' && window.location.pathname === '/login';
        if (!isAuthRoute && !onLoginPage && typeof window !== 'undefined') {
          const returnURL = encodeURIComponent(window.location.href);
          window.location.replace(`/login?returnURL=${returnURL}`);
        }
      }
      const text = await res.text();
      console.error(`API error response:`, text);
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const jsonData = await res.json();
      console.log('API response data:', jsonData);
      return jsonData as T;
    }
    
    console.log('Non-JSON response received');
    return undefined as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Domain helpers
export const api = {
  // Models
  listModels: () => apiRequest<any>('/api/models', { method: 'GET' }),
  getModelParams: (provider: string, modelName: string) => 
    apiRequest<any>(`/api/models/${provider}/${modelName}`, { method: 'GET' }),

  // API Keys (naming per backend: create/list)
  createApiKey: (name: string) =>
    apiRequest<any>('/api/create', { method: 'POST', body: JSON.stringify({ name }) }),
  listApiKeys: () => apiRequest<any>('/api/list', { method: 'GET' }),

  // Auth
  loginWithToken: (username: string, password: string) =>
    apiRequest<{ access_token: string; token_type: string }>(
      '/api/auth/token',
      { method: 'POST', body: JSON.stringify({ username, password }) }
    ),
  me: () => apiRequest<{ id: number; email: string; api_count: number; price: number; created_at: string }>(
    '/api/users/users/me',
    { method: 'GET' }
  ),
  
  // Google OAuth
  getGoogleAuthUrl: () => `${BASE_URL}/api/auth/google`,
  handleGoogleCallback: (code: string, state?: string) =>
    apiRequest<{ access_token: string; user: any }>(
      `/api/auth/google/callback?code=${encodeURIComponent(code)}${state ? `&state=${encodeURIComponent(state)}` : ''}`,
      { method: 'GET', headers: { Accept: 'application/json' } }
    ),

  // GitHub OAuth
  getGitHubAuthUrl: () => `${BASE_URL}/auth/github`,
  handleGitHubCallback: (code: string, state?: string) =>
    apiRequest<{ access_token: string; user: any }>(
      '/auth/github/callback',
      { 
        method: 'POST', 
        body: JSON.stringify({ code, state }) 
      }
    ),

  // Orders
  listOrders: (params?: {
    page?: number;
    page_size?: number;
    uuid?: string;
    model_id?: string;
    status?: 'created' | 'processing' | 'completed' | 'failed' | string;
    start_time?: string; // ISO datetime
    end_time?: string;   // ISO datetime
  }) => {
    const search = new URLSearchParams();
    if (params) {
      if (params.page) search.set('page', String(params.page));
      if (params.page_size) search.set('page_size', String(params.page_size));
      if (params.uuid) search.set('uuid', params.uuid);
      if (params.model_id) search.set('model_id', params.model_id);
      if (params.status && params.status !== 'all') search.set('status', params.status);
      if (params.start_time) search.set('start_time', params.start_time);
      if (params.end_time) search.set('end_time', params.end_time);
    }
    const qs = search.toString();
    return apiRequest<any>(`/api/order${qs ? `?${qs}` : ''}`, { method: 'GET' });
  },
  createOrder: (payload: {
    enable_base64_output: boolean;
    guidance_scale: number;
    image: string;
    loras: Array<{ path: string; scale: number }>;
    num_images: number;
    num_inference_steps: number;
    output_format: string;
    prompt: string;
    seed: number;
    size: string;
    strength: number;
    url: string;
    id: number;
  }) => apiRequest<any>('/api/order', { method: 'POST', body: JSON.stringify(payload) }),
};


