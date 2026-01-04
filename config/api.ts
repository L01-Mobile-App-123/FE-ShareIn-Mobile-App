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

  if (date.includes('T') && date.endsWith('Z')) {
    return date;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return undefined;

  const [, y, m, d] = match;
  return new Date(Date.UTC(+y, +m - 1, +d)).toISOString();
}

class ApiClient {
  private static API_URL = process.env.EXPO_PUBLIC_API_URL;

  private static async getFirebaseToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  }

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

  static async patchFile(path: string, formData: FormData) {
    const token = await this.getFirebaseToken();
    const url = `${this.API_URL}${path}`;

    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    const raw = await res.text();
    let data: any = raw;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {}

    if (!res.ok) {
      console.log('API ERROR RESPONSE:', { status: res.status, url, data });
      throw new Error(data?.message || raw || 'API request failed');
    }

    console.log('API Success:', res.status, path);
    return data;
  }

  private static async request(
    path: string,
    options: RequestInit = {},
    params?: QueryParams,
  ) {
    const token = await this.getFirebaseToken();
    const query = this.buildQuery(params);
    const url = `${this.API_URL}${path}${query}`;

    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    const raw = await res.text();
    let data: any = raw;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {}

    if (!res.ok) {
      console.log('API ERROR RESPONSE:', { status: res.status, url, data });
      throw new Error(
        typeof data === 'string'
          ? data
          : data?.message || JSON.stringify(data) || 'API request failed',
      );
    }

    console.log('API Success:', res.status, path);
    return data;
  }

  static get(path: string, params?: QueryParams) {
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
