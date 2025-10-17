/**
 * Token Refresh Utility
 * Handles automatic token refresh before expiration
 */

import { useAuthStore } from "@/store/auth";

// Decode JWT to get expiration time without verification
function decodeJWT(token: string): { exp?: number } | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

// Get time until token expires (in milliseconds)
function getTokenExpirationTime(token: string): number | null {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return null;
  
  // exp is in seconds, convert to milliseconds
  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();
  const timeUntilExpiration = expirationTime - currentTime;
  
  return timeUntilExpiration;
}

// Refresh the access token
async function refreshAccessToken(): Promise<boolean> {
  try {
    console.log('Proactively refreshing access token...');
    
    const refreshRes = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (!refreshRes.ok) {
      console.error('Token refresh failed');
      return false;
    }

    const refreshData = await refreshRes.json();

    // Update the access token in auth store if returned
    if (refreshData.accessToken) {
      useAuthStore.getState().setAccessToken(refreshData.accessToken);
      console.log('Access token refreshed successfully');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
}

// Timer ID for the refresh interval
let refreshTimerId: NodeJS.Timeout | null = null;

/**
 * Setup automatic token refresh
 * Refreshes the token 5 minutes before it expires (or at 80% of its lifetime, whichever is sooner)
 */
export function setupTokenRefresh(accessToken: string | null) {
  // Clear any existing timer
  if (refreshTimerId) {
    clearTimeout(refreshTimerId);
    refreshTimerId = null;
  }

  if (!accessToken) {
    return;
  }

  const timeUntilExpiration = getTokenExpirationTime(accessToken);
  
  if (!timeUntilExpiration || timeUntilExpiration <= 0) {
    console.warn('Token is already expired or expiration time is invalid');
    // Try to refresh immediately
    refreshAccessToken().then((success) => {
      if (success) {
        const newToken = useAuthStore.getState().accessToken;
        if (newToken) {
          setupTokenRefresh(newToken);
        }
      }
    });
    return;
  }

  // Calculate when to refresh:
  // Refresh at 80% of token lifetime OR 5 minutes before expiration, whichever comes first
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
  const eightyPercentOfLifetime = timeUntilExpiration * 0.8;
  const refreshBuffer = timeUntilExpiration - fiveMinutes;
  
  const timeUntilRefresh = Math.min(eightyPercentOfLifetime, refreshBuffer);
  
  // Ensure we don't schedule a refresh in the past or too soon (minimum 1 minute)
  const oneMinute = 60 * 1000;
  const scheduleTime = Math.max(timeUntilRefresh, oneMinute);

  console.log(
    `Token refresh scheduled in ${Math.round(scheduleTime / 1000 / 60)} minutes (expires in ${Math.round(timeUntilExpiration / 1000 / 60)} minutes)`
  );

  refreshTimerId = setTimeout(async () => {
    const success = await refreshAccessToken();
    
    if (success) {
      // Setup next refresh cycle with the new token
      const newToken = useAuthStore.getState().accessToken;
      if (newToken) {
        setupTokenRefresh(newToken);
      }
    } else {
      // If refresh failed, try again in 1 minute (could be temporary network issue)
      console.log('Refresh failed, will retry in 1 minute');
      refreshTimerId = setTimeout(() => {
        refreshAccessToken().then((retrySuccess) => {
          if (retrySuccess) {
            const newToken = useAuthStore.getState().accessToken;
            if (newToken) {
              setupTokenRefresh(newToken);
            }
          }
        });
      }, oneMinute);
    }
  }, scheduleTime);
}

/**
 * Stop automatic token refresh
 */
export function stopTokenRefresh() {
  if (refreshTimerId) {
    clearTimeout(refreshTimerId);
    refreshTimerId = null;
    console.log('Token refresh stopped');
  }
}

/**
 * Manually trigger a token refresh
 */
export async function manualRefresh(): Promise<boolean> {
  return await refreshAccessToken();
}
