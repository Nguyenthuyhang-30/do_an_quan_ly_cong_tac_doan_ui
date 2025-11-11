import { useAuth } from './useAuth';
import { UserRole } from '../types/auth';

/**
 * Custom hook for role-based access control
 */
export const useRole = () => {
  const { user, isAuthenticated } = useAuth();

  /**
   * Check if user has a specific role
   */
  const hasRole = (role: UserRole | string): boolean => {
    if (!isAuthenticated || !user?.role) return false;
    return user.role === role;
  };

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = (roles: (UserRole | string)[]): boolean => {
    if (!isAuthenticated || !user?.role) return false;
    return roles.includes(user.role);
  };

  /**
   * Check if user has all of the specified roles
   */
  const hasAllRoles = (roles: (UserRole | string)[]): boolean => {
    if (!isAuthenticated || !user?.role) return false;
    // For single role system, user can only have one role
    // This would be relevant if implementing multiple roles per user
    return roles.length === 1 && roles.includes(user.role);
  };

  /**
   * Check if user is admin
   */
  const isAdmin = (): boolean => {
    return hasRole(UserRole.ADMIN);
  };

  /**
   * Check if user is moderator
   */
  const isModerator = (): boolean => {
    return hasRole(UserRole.MODERATOR);
  };

  /**
   * Check if user is regular user
   */
  const isRegularUser = (): boolean => {
    return hasRole(UserRole.USER);
  };

  /**
   * Check if user can perform admin actions
   */
  const canPerformAdminActions = (): boolean => {
    return hasAnyRole([UserRole.ADMIN, UserRole.MODERATOR]);
  };

  return {
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isModerator,
    isRegularUser,
    canPerformAdminActions,
    currentRole: user?.role,
  };
};

export default useRole;
