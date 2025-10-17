# Token Refresh - Quick Reference

## 🎯 What Was Implemented

Proactive token refresh that refreshes access tokens **before** they expire, preventing the bug where expired tokens cause refresh endpoint failures.

## 📦 Files Added

```
src/
  lib/
    tokenRefresh.ts                    # Core refresh logic
  hooks/
    useTokenRefreshInitializer.ts      # Init hook
  components/
    ManualTokenRefresh.tsx             # Dev tool: manual refresh
    TokenStatusDisplay.tsx             # Dev tool: status display
    
Documentation/
  TOKEN_REFRESH_GUIDE.md               # Complete guide
  TOKEN_REFRESH_IMPLEMENTATION.md      # Implementation details
  SETUP_CHECKLIST.md                   # Setup steps
  QUICK_REFERENCE.md                   # This file
```

## 📝 Files Modified

```
src/
  store/
    auth.ts                            # Added token refresh hooks
  lib/
    provider.tsx                       # Added initializer component
```

## ⚡ How It Works (30-Second Version)

1. User logs in → Access token stored
2. JWT decoded → Expiration time extracted
3. Refresh scheduled at 80% of token lifetime (or 5 min before expiration)
4. Timer triggers → Refresh API called
5. New token received → Process repeats

## 🔧 Configuration

### Change Refresh Timing

Edit `src/lib/tokenRefresh.ts` (around line 83):

```typescript
// Refresh 5 minutes before expiration
const fiveMinutes = 5 * 60 * 1000;

// OR at 80% of token lifetime
const eightyPercentOfLifetime = timeUntilExpiration * 0.8;

// Uses whichever comes first
```

## 🧪 Testing

### Quick Test
1. `npm run dev`
2. Login
3. Open console (F12)
4. Look for: `"Token refresh scheduled in X minutes"`
5. Wait for refresh or use manual refresh button

### Add Dev Tools
Add to any protected page:

```tsx
import { TokenStatusDisplay } from '@/components/TokenStatusDisplay';
import { ManualTokenRefresh } from '@/components/ManualTokenRefresh';

// In component
<TokenStatusDisplay />
<ManualTokenRefresh />
```

## 📊 Console Messages

| Message | Meaning |
|---------|---------|
| ✅ "Token refresh scheduled in X minutes" | Scheduled successfully |
| 🔄 "Proactively refreshing access token..." | Refresh in progress |
| ✅ "Access token refreshed successfully" | Refresh succeeded |
| ⚠️ "Refresh failed, will retry in 1 minute" | Temporary failure |
| 🛑 "Token refresh stopped" | Stopped (logout) |

## 🐛 Troubleshooting

### Not refreshing?
1. Check console for errors
2. Verify JWT has `exp` field (decode at jwt.io)
3. Test `/api/auth/refresh` endpoint
4. Check cookies are being sent

### Refreshing too often/rarely?
1. Check token's actual expiration time
2. Adjust timing in `tokenRefresh.ts`
3. Verify backend token settings

### "Session expired" error?
1. Refresh token itself expired
2. User needs to login again
3. Check backend refresh token lifetime

## 🔑 Key Functions

```typescript
// Setup automatic refresh (called automatically)
setupTokenRefresh(accessToken: string)

// Stop refresh (called on logout automatically)
stopTokenRefresh()

// Manual refresh (for testing)
manualRefresh(): Promise<boolean>
```

## ✨ Features

✅ Proactive refresh before expiration  
✅ Automatic rescheduling  
✅ Retry on failure  
✅ Page refresh support  
✅ Logout cleanup  
✅ Fallback 401 handling  
✅ Dev tools for testing  

## 📚 Full Documentation

- Complete guide: `TOKEN_REFRESH_GUIDE.md`
- Implementation: `TOKEN_REFRESH_IMPLEMENTATION.md`
- Setup checklist: `SETUP_CHECKLIST.md`

## 🚀 That's It!

The system works automatically. Just login and it handles everything in the background.
