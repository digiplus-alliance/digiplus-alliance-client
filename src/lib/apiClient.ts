const apiBase = process.env.NEXT_PUBLIC_API_URL; 

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit & { hasAuth?: boolean }
): Promise<T> {
  if (!apiBase) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  const res = await fetch(`${apiBase}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    credentials: options?.hasAuth ? "include" : "same-origin",
    ...options,
  });

  const data = await res.json();

  // Handle unauthorized → try refresh
  if (res.status === 401 && options?.hasAuth) {
    try {
      // Attempt refresh via Next.js API (server sets new cookies)
      const refreshRes = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) {
        throw new Error("Session expired. Please login again.");
      }

      // Retry original request once
      const retryRes = await fetch(`${apiBase}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        },
        credentials: "include",
        ...options,
      });

      const retryData = await retryRes.json();
      if (!retryRes.ok) throw new Error(retryData.message || "Request failed");

      return retryData as T;
    } catch (err) {
      throw err;
    }
  }

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
}
