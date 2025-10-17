# Token Refresh Implementation Summary

## Problem Solved

**Issue:** When the access token expires and you call the refresh endpoint with an expired access token, it returns an error.

**Solution:** Implemented a proactive token refresh mechanism that refreshes the access token **before** it expires, preventing the error from occurring.

## Implementation Details

### Files Created

1. **`src/lib/tokenRefresh.ts`** - Core token refresh utility
   - Decodes JWT to extract expiration time
   - Schedules automatic token refresh
   - Handles refresh execution and rescheduling

2. **`src/hooks/useTokenRefreshInitializer.ts`** - Hook to initialize refresh on app load
   - Ensures token refresh starts when app loads (for existing logged-in users)

3. **`src/components/ManualTokenRefresh.tsx`** - Manual refresh button (dev mode only)
   - Allows manual testing of token refresh
   - Only visible in development environment

4. **`src/components/TokenStatusDisplay.tsx`** - Token status display (dev mode only)
   - Shows remaining token lifetime
   - Visual indicator of token status
   - Updates every second

5. **`TOKEN_REFRESH_GUIDE.md`** - Comprehensive documentation
   - Explains how the system works
   - Troubleshooting guide
   - Configuration instructions

### Files Modified

1. **`src/store/auth.ts`**
   - Import `setupTokenRefresh` and `stopTokenRefresh`
   - `setAccessToken()` now calls `setupTokenRefresh()` automatically
   - `clearAuth()` now calls `stopTokenRefresh()`

2. **`src/lib/provider.tsx`**
   - Import `useTokenRefreshInitializer`
   - Added `TokenRefreshInitializer` component to both provider paths
   - Ensures token refresh initializes globally

## How It Works

### 1. Token Refresh Scheduling

When a user logs in or the app loads:
1. Access token is stored in the auth store
2. `setAccessToken()` is called
3. `setupTokenRefresh()` is automatically triggered
4. JWT is decoded to extract expiration time (`exp` field)
5. Refresh is scheduled at the earlier of:
   - 80% of token lifetime
   - 5 minutes before expiration

### 2. Automatic Refresh Cycle

```
Token Set → Decode JWT → Calculate Expiration → Schedule Refresh
     ↑                                                ↓
     └────────── New Token Received ← Refresh API Called
```

### 3. Refresh Timing Example

If a token expires in 60 minutes:
- 80% of lifetime = 48 minutes
- 5 minutes before = 55 minutes
- **Refresh scheduled at:** 48 minutes (whichever is earlier)

If a token expires in 10 minutes:
- 80% of lifetime = 8 minutes
- 5 minutes before = 5 minutes
- **Refresh scheduled at:** 5 minutes

## Key Features

✅ **Proactive Refresh** - Refreshes before expiration  
✅ **Automatic Rescheduling** - Sets up next refresh after each successful refresh  
✅ **Retry Logic** - Retries after 1 minute if refresh fails  
✅ **Page Refresh Support** - Re-initializes on app load  
✅ **Logout Cleanup** - Stops refresh timer on logout  
✅ **Fallback Mechanism** - apiClient still handles 401 errors reactively  
✅ **Development Tools** - Manual refresh button and status display

## Testing the Implementation

### Manual Testing

1. **Login to the application**
2. **Open browser console**
3. **Look for log:** "Token refresh scheduled in X minutes"
4. **Wait for scheduled time** (or modify timing in code for faster testing)
5. **Observe:** "Proactively refreshing access token..." message
6. **Verify:** "Access token refreshed successfully" message
7. **Check:** API calls continue working without interruption

### Development Tools (Only in Dev Mode)

Add these components to any page for testing:

```tsx
import { TokenStatusDisplay } from '@/components/TokenStatusDisplay';
import { ManualTokenRefresh } from '@/components/ManualTokenRefresh';

// In your component
<TokenStatusDisplay />
<ManualTokenRefresh />
```

### Testing with Shorter Token Lifetimes

To test faster, temporarily modify in `tokenRefresh.ts`:

```typescript
// For testing: refresh 1 minute before expiration
const oneMinute = 60 * 1000;
const timeUntilRefresh = timeUntilExpiration - oneMinute;
```

## Configuration

### Adjust Refresh Timing

Edit `src/lib/tokenRefresh.ts`:

```typescript
// Current settings
const fiveMinutes = 5 * 60 * 1000; // Buffer before expiration
const eightyPercentOfLifetime = timeUntilExpiration * 0.8; // % of lifetime

// To change:
// - Increase/decrease the buffer time
// - Adjust the percentage (e.g., 0.7 for 70%, 0.9 for 90%)
```

### Minimum Refresh Interval

```typescript
const oneMinute = 60 * 1000; // Minimum 1 minute
const scheduleTime = Math.max(timeUntilRefresh, oneMinute);
```

## Console Logs

The system provides helpful logging:

| Message | Meaning |
|---------|---------|
| `"Initializing token refresh on app load"` | System initialized on page load |
| `"Token refresh scheduled in X minutes (expires in Y minutes)"` | Refresh scheduled successfully |
| `"Proactively refreshing access token..."` | Refresh in progress |
| `"Access token refreshed successfully"` | Refresh succeeded |
| `"Refresh failed, will retry in 1 minute"` | Temporary failure, will retry |
| `"Token refresh stopped"` | Refresh timer stopped (logout) |

## Edge Cases Handled

- ✅ Token already expired when checking → Immediate refresh attempt
- ✅ Network failure during refresh → Retry after 1 minute
- ✅ Page refresh while logged in → Re-initializes automatically
- ✅ Multiple browser tabs → Each tab manages independently
- ✅ User logs out → Timer stopped, no further refreshes
- ✅ Invalid/missing expiration → Logged as warning, no crash

## Security Notes

- Access tokens stored in localStorage (Zustand persist)
- Refresh tokens stored in httpOnly cookies (secure)
- Refresh endpoint requires valid access token in cookie
- All operations over HTTPS in production
- Token refresh happens client-side without exposing refresh token to JavaScript

## Troubleshooting

### Token not refreshing?
1. Check console for errors
2. Verify JWT has `exp` field: Decode at jwt.io
3. Test `/api/auth/refresh` endpoint manually
4. Verify cookies are sent with requests

### Refresh too frequent/infrequent?
1. Check actual token expiration time
2. Adjust timing constants in `tokenRefresh.ts`
3. Verify backend token expiration settings match

### "Session expired" error?
1. Refresh token itself may have expired
2. User needs to log in again
3. Check backend refresh token lifetime settings

## Next Steps

1. **Test in development** - Use the dev tools to verify behavior
2. **Monitor in staging** - Watch console logs for any issues
3. **Adjust timing** - Fine-tune refresh schedule based on token lifetime
4. **Backend coordination** - Ensure backend token lifetimes are appropriate

## Backend Requirements

Ensure your backend:
- Returns JWT with `exp` field in the payload
- `/api/auth/refresh` accepts POST with `accessToken` in body
- Returns new `accessToken` in response
- Sets appropriate cookie expiration times
- Handles refresh token validation properly

## Questions?

Refer to `TOKEN_REFRESH_GUIDE.md` for detailed documentation.
