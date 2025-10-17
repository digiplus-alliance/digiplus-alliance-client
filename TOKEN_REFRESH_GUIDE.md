# Token Refresh System

## Overview

This application implements a **proactive token refresh mechanism** that automatically refreshes the access token before it expires. This prevents the bug where an expired access token causes the refresh endpoint to fail.

## How It Works

### 1. **Automatic Token Refresh**

The system automatically refreshes the access token based on its expiration time:

- **Decodes the JWT** to extract the expiration timestamp (`exp` field)
- **Schedules a refresh** at either:
  - 80% of the token's lifetime, OR
  - 5 minutes before expiration
  - Whichever comes first
- **Refreshes proactively** before the token expires
- **Reschedules** the next refresh cycle after each successful refresh

### 2. **Key Components**

#### `src/lib/tokenRefresh.ts`

Core utility that handles:
- JWT decoding to extract expiration time
- Token refresh scheduling and execution
- Automatic rescheduling after each refresh

**Key Functions:**
- `setupTokenRefresh(accessToken)` - Initializes automatic refresh for a token
- `stopTokenRefresh()` - Stops the automatic refresh timer
- `manualRefresh()` - Manually triggers a token refresh

#### `src/store/auth.ts`

Updated to integrate token refresh:
- `setAccessToken()` now automatically calls `setupTokenRefresh()`
- `clearAuth()` now stops the refresh timer with `stopTokenRefresh()`

#### `src/hooks/useTokenRefreshInitializer.ts`

Hook that initializes token refresh when the app loads (for existing logged-in users who refresh the page).

#### `src/lib/provider.tsx`

Includes `TokenRefreshInitializer` component to ensure token refresh is initialized globally.

### 3. **Flow Diagram**

```
User Logs In
    ↓
Access Token Stored → setupTokenRefresh() called
    ↓
JWT Decoded → Expiration time extracted
    ↓
Refresh Scheduled (at 80% of lifetime or 5 min before expiration)
    ↓
[Time Passes]
    ↓
Scheduled Time Reached → Refresh API Called
    ↓
New Token Received → setupTokenRefresh() called again
    ↓
[Cycle Repeats]
```

### 4. **Fallback Mechanism**

The system has multiple layers of protection:

1. **Proactive Refresh** (Primary): Refreshes before expiration
2. **Reactive Refresh** (Fallback): If a 401 error occurs, `apiClient.ts` attempts an immediate refresh
3. **Retry Logic**: If refresh fails, retries after 1 minute (for temporary network issues)

### 5. **Configuration**

You can adjust the refresh timing in `src/lib/tokenRefresh.ts`:

```typescript
// Current settings:
const fiveMinutes = 5 * 60 * 1000; // Refresh buffer
const eightyPercentOfLifetime = timeUntilExpiration * 0.8; // Refresh percentage

// To change, modify these values:
const refreshBuffer = timeUntilExpiration - fiveMinutes; // Change buffer time
const timeUntilRefresh = Math.min(eightyPercentOfLifetime, refreshBuffer);
```

### 6. **Console Logging**

The system provides helpful console logs:

- `"Initializing token refresh on app load"` - Token refresh initialized on app load
- `"Token refresh scheduled in X minutes (expires in Y minutes)"` - Shows when refresh is scheduled
- `"Proactively refreshing access token..."` - Refresh is being attempted
- `"Access token refreshed successfully"` - Refresh succeeded
- `"Token refresh stopped"` - Refresh timer stopped (e.g., on logout)

### 7. **Testing**

To test the token refresh:

1. **Login** to the application
2. Check the **console** for the scheduled refresh time
3. **Wait** for the scheduled time (or modify the timing in code)
4. Observe the automatic refresh in the console
5. Verify that API calls continue to work without interruption

### 8. **Edge Cases Handled**

- ✅ Token already expired when checking
- ✅ Network failure during refresh (retry after 1 minute)
- ✅ Page refresh while logged in (re-initializes refresh)
- ✅ Multiple tabs open (each tab manages its own refresh)
- ✅ User logs out (refresh timer is stopped)
- ✅ Invalid or missing expiration time in JWT

### 9. **Security Considerations**

- Access tokens are stored in **localStorage** (via Zustand persist)
- Refresh tokens are stored in **httpOnly cookies** (secure, not accessible to JavaScript)
- Token refresh endpoint requires a valid access token in cookies
- All refresh operations happen over HTTPS in production

### 10. **Troubleshooting**

**Token refresh not working?**
- Check console for error messages
- Verify JWT has an `exp` field
- Ensure `/api/auth/refresh` endpoint is working
- Check that cookies are being sent correctly

**Refresh happening too frequently or not enough?**
- Adjust the timing constants in `tokenRefresh.ts`
- Check the token's actual expiration time (decode it manually)

**Session expired error?**
- The refresh token itself may have expired
- User needs to log in again
- Check backend refresh token expiration settings

## API Endpoint Requirements

The `/api/auth/refresh` endpoint must:
- Accept POST requests
- Read `accessToken` from cookies
- Return a new `accessToken` in the response
- Set the new `accessToken` as an httpOnly cookie

Current implementation in `src/app/api/auth/refresh/route.ts` meets these requirements.
