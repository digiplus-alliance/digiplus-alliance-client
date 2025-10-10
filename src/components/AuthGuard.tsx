'use client';

import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
  requireAuth?: boolean;
}

export function AuthGuard({ 
  children, 
  allowedRoles = [], 
  redirectTo,
  requireAuth = true 
}: AuthGuardProps) {
  const { user, accessToken } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // If auth is not required, allow access
      if (!requireAuth) {
        setIsAuthorized(true);
        setIsLoading(false);
        return;
      }

      // Check if user is authenticated
      if (!user || !accessToken) {
        // Redirect to login if not authenticated
        const currentPath = window.location.pathname;
        const loginUrl = `/auth/login?redirect=${encodeURIComponent(currentPath)}`;
        router.replace(loginUrl);
        return;
      }

      // Check if user is verified (skip verification check for verification page)
      const currentPath = window.location.pathname;
      if (!user.is_verified && !currentPath.includes('/auth/verification')) {
        router.replace('/auth/verification');
        return;
      }

      // Check if user has required role
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect based on user role
        const defaultRedirect = user.role === 'admin' 
          ? '/admin-dashboard' 
          : '/user-dashboard';
        
        router.replace(redirectTo || defaultRedirect);
        return;
      }

      // User is authorized
      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [user, accessToken, allowedRoles, redirectTo, requireAuth, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show children if authorized
  if (isAuthorized) {
    return <>{children}</>;
  }

  // Show nothing if not authorized (redirect is in progress)
  return null;
}

// Higher-order component for easier usage
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  guardProps?: Omit<AuthGuardProps, 'children'>
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <AuthGuard {...guardProps}>
        <Component {...props} />
      </AuthGuard>
    );
  };
}

// Hook for checking auth status
export function useAuthGuard(allowedRoles?: string[]) {
  const { user, accessToken } = useAuthStore();
  const router = useRouter();

  const isAuthenticated = !!(user && accessToken);
  const isVerified = user?.is_verified || false;
  const isAuthorized = isAuthenticated && isVerified && (
    !allowedRoles || 
    allowedRoles.length === 0 || 
    allowedRoles.includes(user?.role || '')
  );

  const redirectToLogin = (returnUrl?: string) => {
    const currentPath = returnUrl || window.location.pathname;
    const loginUrl = `/auth/login?redirect=${encodeURIComponent(currentPath)}`;
    router.replace(loginUrl);
  };

  const redirectToDashboard = () => {
    const dashboardUrl = user?.role === 'admin' 
      ? '/admin-dashboard' 
      : '/user-dashboard';
    router.replace(dashboardUrl);
  };

  const redirectToVerification = () => {
    router.replace('/auth/verification');
  };

  return {
    isAuthenticated,
    isVerified,
    isAuthorized,
    user,
    redirectToLogin,
    redirectToDashboard,
    redirectToVerification,
  };
}
