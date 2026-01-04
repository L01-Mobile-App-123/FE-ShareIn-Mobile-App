import { auth } from '@/config/firebase';

type QueryParams = Record<string, string | number | boolean | undefined>;

export function cleanPayload<T extends Record<string, any>>(
  payload: T,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  ) as Partial<T>;
}

export function toISODate(date?: string | null): string | undefined {
  if (!date) return undefined;

  // ISO rồi → dùng luôn
  if (date.includes('T') && date.endsWith('Z')) {
    return date;
  }

  // YYYY-MM-DD
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return undefined;

  const [, y, m, d] = match;
  return new Date(Date.UTC(+y, +m - 1, +d)).toISOString();
}

class ApiClient {
  private static API_URL = process.env.EXPO_PUBLIC_API_URL;

  /** Firebase token */
  private static async getFirebaseToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  }

  /** Build query string */
  private static buildQuery(params?: QueryParams) {
    if (!params) return '';

    const query = Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(
        ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
      )
      .join('&');

    return query ? `?${query}` : '';
  }

  /** Upload file */
  static async patchFile(path: string, formData: FormData) {
    const token = await this.getFirebaseToken();

    const res = await fetch(`${this.API_URL}${path}`, {
      method: 'PATCH',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.log('API Error:', res.status, errorText);
      throw new Error(errorText || 'API request failed');
    } else {
      console.log('API Success:', res.status, path);
    }

    return res.json();
  }

  /** Request chung */
  private static async request(
    path: string,
    options: RequestInit = {},
    params?: QueryParams,
  ) {
    const token = await this.getFirebaseToken();
    const query = this.buildQuery(params);

    if (path == '/api/v1/auth/verify') {
      console.log('TOKEN:', token);
    }

    const res = await fetch(`${this.API_URL}${path}${query}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.log('API Error:', res.status, errorText);
      throw new Error(errorText || 'API request failed');
    } else {
      console.log('API Success:', res.status, path);
    }

    return res.json();
  }

  // ===== PUBLIC METHODS =====

  static get(path: string, params?: QueryParams) {
    console.log('GET Request to:', path, 'with params:', params);
    return this.request(path, { method: 'GET' }, params);
  }

  static post(path: string, body?: any, params?: QueryParams) {
    return this.request(
      path,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
      params,
    );
  }

  static put(path: string, body?: any, params?: QueryParams) {
    return this.request(
      path,
      {
        method: 'PUT',
        body: JSON.stringify(body),
      },
      params,
    );
  }

  static delete(path: string, params?: QueryParams) {
    return this.request(path, { method: 'DELETE' }, params);
  }

  static patch(path: string, body?: any, params?: QueryParams) {
    return this.request(
      path,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
      },
      params,
    );
  }
}

export default ApiClient;
