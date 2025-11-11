import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';
import { UserRole } from '../../types/auth';
import { notification } from 'antd';
import * as roleHelpers from '../../utils/roleHelpers';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[] | string | string[];
  redirectTo?: string;
  showUnauthorizedMessage?: boolean;
}

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication and optionally role-based authorization
 * Works with multiple roles per user
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/auth/login',
  showUnauthorizedMessage = true,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Helper function to check if user has required role
  const hasRequiredRole = React.useCallback((): boolean => {
    if (!requiredRole) return true;
    if (!user?.roles || user.roles.length === 0) return false;

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roleHelpers.hasAnyRole(user, roles);
  }, [requiredRole, user]); // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      notification.warning({
        message: 'Yêu cầu đăng nhập',
        description: 'Vui lòng đăng nhập để tiếp tục',
        placement: 'topRight',
      });
      window.location.href = redirectTo;
    }
  }, [isLoading, isAuthenticated, redirectTo]);

  // Check role and redirect if required
  useEffect(() => {
    if (!isLoading && isAuthenticated && requiredRole && !hasRequiredRole()) {
      if (showUnauthorizedMessage) {
        notification.error({
          message: 'Không có quyền truy cập',
          description: 'Bạn không có quyền truy cập vào trang này',
          placement: 'topRight',
          duration: 4,
        });
      }
      window.location.href = '/';
    }
  }, [isLoading, isAuthenticated, requiredRole, user, showUnauthorizedMessage, hasRequiredRole]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  // Don't render if not authenticated or wrong role
  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && !hasRequiredRole()) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
