import { useAuthStore } from '@/store/auth';

const apiBase = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit & { hasAuth?: boolean; baseUrl?: string }
): Promise<T> {
  // Use provided baseUrl or default to apiBase
  const baseUrl = options?.baseUrl !== undefined ? options.baseUrl : apiBase;

  // If baseUrl is empty string, use endpoint as-is (for local API routes)
  const url = baseUrl === '' ? endpoint : `${baseUrl}${endpoint}`;

  if (!baseUrl && baseUrl !== '') {
    throw new Error('NEXT_PUBLIC_API_URL is not set and no baseUrl provided');
  }

  const headers = new Headers();

  // Only set Content-Type to application/json if body is not FormData
  if (!(options?.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Add additional headers if provided
  if (options?.headers) {
    const additionalHeaders = new Headers(options.headers);
    additionalHeaders.forEach((value, key) => {
      headers.set(key, value);
    });
  }

  // Add Authorization header if hasAuth is true and token exists
  if (options?.hasAuth) {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  const res = await fetch(url, {
    headers,
    credentials: options?.hasAuth ? 'include' : 'same-origin',
    ...options,
  });

  const data = await res.json();

  // Handle unauthorized → try refresh
  if (res.status === 401 && options?.hasAuth) {
    try {
      // Attempt refresh via Next.js API (server sets new cookies)
      const refreshRes = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (!refreshRes.ok) {
        // Clear auth state on refresh failure (session truly expired)
        useAuthStore.getState().clearAuth();
        throw new Error('Session expired. Please login again.');
      }

      const refreshData = await refreshRes.json();

      // Update the access token in auth store if returned
      if (refreshData.accessToken) {
        useAuthStore.getState().setAccessToken(refreshData.accessToken);
      }

      // Create new headers for retry with updated token
      const retryHeaders = new Headers({
        'Content-Type': 'application/json',
      });

      // Add additional headers if provided
      if (options?.headers) {
        const additionalHeaders = new Headers(options.headers);
        additionalHeaders.forEach((value, key) => {
          retryHeaders.set(key, value);
        });
      }

      // Add the new access token
      const newAccessToken = useAuthStore.getState().accessToken;
      if (newAccessToken) {
        retryHeaders.set('Authorization', `Bearer ${newAccessToken}`);
      }

      // Retry original request once with new token
      const retryRes = await fetch(url, {
        headers: retryHeaders,
        credentials: 'include',
        ...options,
      });

      const retryData = await retryRes.json();
      if (!retryRes.ok) throw new Error(retryData.message || 'Request failed');

      return retryData as T;
    } catch (err) {
      // Only clear auth state if it's an authentication error
      if (err instanceof Error && err.message.includes('Session expired')) {
        useAuthStore.getState().clearAuth();
      }
      throw err;
    }
  }

  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data as T;
}
