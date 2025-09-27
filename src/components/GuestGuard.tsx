'use client';

import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDefaultDashboard } from '@/lib/permissions';

interface GuestGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * GuestGuard - Protects pages that should only be accessible to non-authenticated users
 * (like login, register, forgot password pages)
 * Redirects authenticated users to their appropriate dashboard
 */
export function GuestGuard({ children, redirectTo }: GuestGuardProps) {
  const { user, accessToken } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // If user is authenticated, redirect them away from auth pages
      if (user && accessToken) {
        const defaultRedirect = getDefaultDashboard(user.role);
        const destination = redirectTo || defaultRedirect;
        
        console.log(`GuestGuard: Redirecting authenticated user (${user.role}) from auth page to ${destination}`);
        router.replace(destination);
        return;
      }

      // User is not authenticated, allow access to the page
      setShowContent(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [user, accessToken, redirectTo, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show children if user is not authenticated
  if (showContent) {
    return <>{children}</>;
  }

  // Show nothing if authenticated user is being redirected
  return null;
}
