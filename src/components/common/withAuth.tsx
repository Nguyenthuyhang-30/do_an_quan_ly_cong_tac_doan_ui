import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import { UserRole } from '../../types/auth';

/**
 * Higher-Order Component for protecting routes with authentication
 * @param Component - The component to wrap
 * @param requiredRole - Optional role requirement (admin, user, etc.)
 * @returns Protected component
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: UserRole | UserRole[] | string | string[],
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute requiredRole={requiredRole}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

/**
 * Higher-Order Component specifically for admin routes
 */
export function withAdminAuth<P extends object>(Component: React.ComponentType<P>) {
  return withAuth(Component, UserRole.ADMIN);
}

export default withAuth;
