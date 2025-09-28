# Authentication & Authorization System

This document explains how to use the authentication and role-based access control system.

## Overview

The system includes:
- **Middleware**: Server-side route protection and redirects
- **AuthGuard**: Client-side component for protecting routes
- **Auth hooks**: Utilities for checking authentication status
- **Role-based permissions**: Control access based on user roles

## User Roles

- `admin` - Full access to admin dashboard and all features
- `business_owner` - Access to user dashboard and business features  
- `user` - Basic access to user dashboard

## Usage Examples

### 1. Protecting Pages with AuthGuard

```tsx
// pages/admin-dashboard/users/page.tsx
import { AuthGuard } from '@/components/AuthGuard';

export default function UsersPage() {
  return (
    <AuthGuard allowedRoles={['admin']}>
      <div>
        <h1>Users Management</h1>
        {/* Only admins can see this content */}
      </div>
    </AuthGuard>
  );
}
```

### 2. Using Higher-Order Component

```tsx
// components/AdminOnlyComponent.tsx
import { withAuthGuard } from '@/components/AuthGuard';

function AdminPanel() {
  return <div>Admin Panel Content</div>;
}

// Export wrapped component
export default withAuthGuard(AdminPanel, { 
  allowedRoles: ['admin'],
  redirectTo: '/user-dashboard' 
});
```

### 3. Using Auth Hook in Components

```tsx
// components/ConditionalContent.tsx
import { useAuthGuard } from '@/components/AuthGuard';

export function ConditionalContent() {
  const { isAuthenticated, isAuthorized, user } = useAuthGuard(['admin', 'business_owner']);

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  if (!isAuthorized) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.first_name}!</h1>
      <p>Your role: {user?.role}</p>
    </div>
  );
}
```

### 4. Layout with Role-Based Navigation

```tsx
// app/admin-dashboard/layout.tsx
import { AuthGuard } from '@/components/AuthGuard';
import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['admin']}>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
```

## Middleware Configuration

The middleware automatically:
- Redirects unauthenticated users to login
- Redirects authenticated users away from auth pages
- Enforces role-based route access
- Handles token validation

### Protected Routes:
- `/admin-dashboard/*` - Admin only
- `/user-dashboard/*` - Business owners and users
- All other routes require authentication unless in public routes list

### Public Routes:
- `/auth/*` - Authentication pages
- `/landing` - Landing page
- `/` - Home (redirects based on role)

## Adding New Protected Routes

1. **Server-side protection** (recommended):
   Update `middleware.ts` route arrays:

```typescript
const adminRoutes = ['/admin-dashboard', '/admin-settings'];
const businessOwnerRoutes = ['/user-dashboard', '/business-tools'];
```

2. **Client-side protection**:
   Wrap components with AuthGuard:

```tsx
<AuthGuard allowedRoles={['admin']}>
  <YourComponent />
</AuthGuard>
```

## Error Handling

The system handles common scenarios:
- **Invalid tokens**: Automatic logout and redirect to login
- **Expired tokens**: Attempt refresh, logout if failed
- **Role mismatch**: Redirect to appropriate dashboard
- **Unverified users**: Redirect to verification page

## Security Notes

1. **Server-side validation**: Middleware validates tokens server-side
2. **Client-side checks**: AuthGuard provides additional UX protection
3. **Token storage**: Tokens stored in httpOnly cookies and Zustand store
4. **Automatic cleanup**: Tokens cleared on logout and errors

## Debugging

Use the AuthDebugger component for development:

```tsx
import { AuthDebugger } from '@/components/AuthDebugger';

// Add to any page during development
<AuthDebugger />
```

This shows current auth state and localStorage contents.
