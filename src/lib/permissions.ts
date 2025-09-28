export type UserRole = 'admin' | 'business_owner' | 'user';

export const ROLES = {
  ADMIN: 'admin' as const,
  BUSINESS_OWNER: 'business_owner' as const,
  USER: 'user' as const,
} as const;

export const ROUTE_PERMISSIONS = {
  // Admin only routes
  '/admin-dashboard': [ROLES.ADMIN],
  '/admin-dashboard/users': [ROLES.ADMIN],
  '/admin-dashboard/applications': [ROLES.ADMIN],
  '/admin-dashboard/services': [ROLES.ADMIN],
  '/admin-dashboard/blog': [ROLES.ADMIN],
  '/admin-dashboard/settings': [ROLES.ADMIN],
  
  // Business owner / User routes
  '/user-dashboard': [ROLES.BUSINESS_OWNER, ROLES.USER],
  
  // Public routes (no auth required)
  '/landing': [],
  '/auth/login': [],
  '/auth/create-account': [],
  '/auth/forgot-password': [],
} as const;

export function hasPermission(userRole: string, requiredRoles: string[]): boolean {
  if (requiredRoles.length === 0) return true; // Public route
  return requiredRoles.includes(userRole);
}

export function getDefaultDashboard(userRole: string): string {
  switch (userRole) {
    case ROLES.ADMIN:
      return '/admin-dashboard';
    case ROLES.BUSINESS_OWNER:
    case ROLES.USER:
      return '/user-dashboard';
    default:
      return '/auth/login';
  }
}

export function getRoleDisplayName(role: string): string {
  switch (role) {
    case ROLES.ADMIN:
      return 'Administrator';
    case ROLES.BUSINESS_OWNER:
      return 'Business Owner';
    case ROLES.USER:
      return 'User';
    default:
      return 'Unknown';
  }
}
