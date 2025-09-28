import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define route access rules
const publicRoutes = [
  '/auth/login',
  '/auth/create-account',
  '/auth/forgot-password',
  '/auth/verification',
  '/auth/change-password',
  '/landing',
  '/', 
];

const adminRoutes = ['/admin-dashboard'];
const businessOwnerRoutes = ['/user-dashboard'];
const authRoutes = ['/auth'];

// Helper function to check if a path matches a route pattern
function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(route => pathname.startsWith(route));
}

// Helper function to decode JWT token
function decodeJWT(token: string): any {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    
    // Check if token is expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files, API routes, and other Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.') && !pathname.endsWith('/')
  ) {
    return NextResponse.next();
  }

  // Get auth token from cookies
  const accessToken = request.cookies.get('accessToken')?.value;

  console.log(`Middleware: ${pathname}, Token: ${accessToken ? 'present' : 'absent'}`);

  // If no token and trying to access protected route
  if (!accessToken) {
    // Allow access to public routes
    if (matchesRoute(pathname, publicRoutes)) {
      return NextResponse.next();
    }
    
    // Redirect to login for protected routes
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Decode and validate token
  const userData = decodeJWT(accessToken);
  if (!userData) {
    // Invalid token, redirect to login
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }

  // Try different possible role field names
  const role = userData.role || userData.user_role || userData.userRole || 'user';
  const is_verified = userData.is_verified || userData.verified || true;
  
  console.log(`Middleware: User data:`, userData);
  console.log(`Middleware: Extracted role: ${role}, Path: ${pathname}`);

  // If user is authenticated and trying to access auth routes (except verification), redirect to dashboard
  const isAuthPage = pathname.startsWith('/auth') && pathname !== '/auth/verification';
  if (isAuthPage) {
    console.log(`Middleware: Authenticated user trying to access auth page: ${pathname}`);
    const dashboardUrl = role === 'admin' 
      ? new URL('/admin-dashboard', request.url)
      : new URL('/user-dashboard', request.url);
    console.log(`Middleware: Redirecting to dashboard: ${dashboardUrl.pathname}`);
    return NextResponse.redirect(dashboardUrl);
  }

  // Check if user needs verification (if your system uses email verification)
  if (!is_verified && pathname !== '/auth/verification' && !matchesRoute(pathname, authRoutes)) {
    const verificationUrl = new URL('/auth/verification', request.url);
    return NextResponse.redirect(verificationUrl);
  }

  // Check admin routes access
  if (matchesRoute(pathname, adminRoutes)) {
    if (role !== 'admin') {
      // Non-admin users trying to access admin routes
      const redirectUrl = role === 'business_owner' 
        ? new URL('/user-dashboard', request.url)
        : new URL('/auth/login', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Check business owner routes access  
  if (matchesRoute(pathname, businessOwnerRoutes)) {
    console.log(`Middleware: Checking business owner route access for role: ${role}`);
    if (role === 'admin') {
      // Admin trying to access business owner routes
      console.log(`Middleware: Redirecting admin from ${pathname} to admin dashboard`);
      const adminDashboardUrl = new URL('/admin-dashboard', request.url);
      return NextResponse.redirect(adminDashboardUrl);
    }
    if (role !== 'business_owner' && role !== 'user') {
      // Other roles trying to access business owner routes
      console.log(`Middleware: Unauthorized role ${role} trying to access ${pathname}`);
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Handle root path redirect based on role
  if (pathname === '/') {
    const dashboardUrl = role === 'admin' 
      ? new URL('/admin-dashboard', request.url)
      : new URL('/user-dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Allow access to the requested route
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
