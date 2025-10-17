/**
 * Token Refresh Initializer Hook
 * Initializes automatic token refresh when the app loads
 */

'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { setupTokenRefresh } from '@/lib/tokenRefresh';

/**
 * Hook to initialize token refresh on app load
 * Call this in your root layout or a top-level component
 */
export function useTokenRefreshInitializer() {
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    // Initialize token refresh if user is logged in
    if (accessToken) {
      console.log('Initializing token refresh on app load');
      setupTokenRefresh(accessToken);
    }
  }, []); // Run only once on mount

  return null;
}
