import authService from '../services/api/auth.service';
import { UserRole } from '../app-types/auth';
import { notification } from 'antd';
import * as roleHelpers from './roleHelpers';

/**
 * Check if user has admin role
 */
export const isAdmin = (): boolean => {
  const user = authService.getCurrentUser();
  return roleHelpers.isAdmin(user);
};

/**
 * Check if user has specific role
 */
export const hasRole = (role: UserRole | string): boolean => {
  const user = authService.getCurrentUser();
  return roleHelpers.hasRole(user, role);
};

/**
 * Check if user has any of the specified roles
 */
export const hasAnyRole = (roles: (UserRole | string)[]): boolean => {
  const user = authService.getCurrentUser();
  return roleHelpers.hasAnyRole(user, roles);
};

/**
 * Route guard for admin routes
 * Allows Admin, Moderator, and BCH roles to access admin area
 * Can be used in route configuration
 */
export const adminGuard = () => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    notification.warning({
      message: 'Yêu cầu đăng nhập',
      description: 'Vui lòng đăng nhập để tiếp tục',
      placement: 'topRight',
    });
    throw new Error('Unauthorized: Not authenticated');
  }

  // Check if user has Admin, Moderator, or BCH role
  const user = authService.getCurrentUser();
  const hasAdminAccess = roleHelpers.hasAnyRole(user, [
    UserRole.ADMIN,
    UserRole.MODERATOR,
    UserRole.BCH,
  ]);

  if (!hasAdminAccess) {
    notification.error({
      message: 'Không có quyền truy cập',
      description: 'Bạn không có quyền truy cập vào trang quản trị',
      placement: 'topRight',
      duration: 4,
    });
    throw new Error('Forbidden: Admin access required');
  }

  return true;
};

/**
 * Generic route guard with role checking
 */
export const roleGuard = (requiredRole: UserRole | UserRole[] | string | string[]) => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    notification.warning({
      message: 'Yêu cầu đăng nhập',
      description: 'Vui lòng đăng nhập để tiếp tục',
      placement: 'topRight',
    });
    throw new Error('Unauthorized: Not authenticated');
  }

  const user = authService.getCurrentUser();
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  if (!roleHelpers.hasAnyRole(user, roles)) {
    notification.error({
      message: 'Không có quyền truy cập',
      description: 'Bạn không có quyền truy cập vào trang này',
      placement: 'topRight',
      duration: 4,
    });
    throw new Error('Forbidden: Required role not found');
  }

  return true;
};

export default {
  isAdmin,
  hasRole,
  hasAnyRole,
  adminGuard,
  roleGuard,
};
