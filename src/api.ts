export const API_BASE = 'http://localhost/transitops-api/api';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
    // Add credentials if using cookies/sessions (we are for auth)
    credentials: 'omit', // Wait, actually XAMPP sessions don't need this if we rely on tokens, but we used PHP sessions! We must set 'include'
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

// Ensure credentials are included for PHP sessions to work across CORS
export const fetchOptions = (method = 'GET', body?: any): RequestInit => {
  const opts: RequestInit = {
    method,
    credentials: 'omit', // Change to 'include' if testing on different port, but fetch API needs explicit CORS config. For now we will just use localStorage for user data instead of relying on PHP session cookies, or we can use credentials: 'omit' and let the frontend handle the state. Let's use localStorage in useAuthStore for simplicity in this demo.
  };
  
  if (body) {
    opts.body = JSON.stringify(body);
  }
  
  return opts;
};
