import { User, Role, UserRole } from '../types/auth';

/**
 * Helper functions for working with user roles
 */

/**
 * Get primary role from user's roles array
 * Returns the first role or undefined
 */
export const getPrimaryRole = (user: User | null): string | undefined => {
  if (!user?.roles || user.roles.length === 0) return undefined;
  return user.roles[0].roleName;
};

/**
 * Get all role names from user
 */
export const getAllRoles = (user: User | null): string[] => {
  if (!user?.roles) return [];
  return user.roles.map((role) => role.roleName);
};

/**
 * Check if user has specific role
 */
export const hasRole = (user: User | null, roleName: string): boolean => {
  if (!user?.roles) return false;
  return user.roles.some((role) => role.roleName === roleName);
};

/**
 * Check if user has any of the specified roles
 */
export const hasAnyRole = (user: User | null, roleNames: string[]): boolean => {
  if (!user?.roles) return false;
  return user.roles.some((role) => roleNames.includes(role.roleName));
};

/**
 * Check if user has all of the specified roles
 */
export const hasAllRoles = (user: User | null, roleNames: string[]): boolean => {
  if (!user?.roles) return false;
  return roleNames.every((roleName) => user.roles!.some((role) => role.roleName === roleName));
};

/**
 * Check if user is admin
 */
export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, UserRole.ADMIN);
};

/**
 * Check if user is moderator
 */
export const isModerator = (user: User | null): boolean => {
  return hasRole(user, UserRole.MODERATOR);
};

/**
 * Check if user is BCH (Ban Chấp hành)
 */
export const isBCH = (user: User | null): boolean => {
  return hasRole(user, UserRole.BCH);
};

/**
 * Check if user is regular member
 */
export const isMember = (user: User | null): boolean => {
  return hasRole(user, UserRole.MEMBER);
};

/**
 * Check if user can perform admin actions
 * Admin, Moderator, and BCH can perform admin actions
 */
export const canPerformAdminActions = (user: User | null): boolean => {
  return hasAnyRole(user, [UserRole.ADMIN, UserRole.MODERATOR, UserRole.BCH]);
};

/**
 * Check if user can access admin area
 * Admin, Moderator, and BCH can access admin routes
 * Alias for canPerformAdminActions
 */
export const canAccessAdminArea = (user: User | null): boolean => {
  return canPerformAdminActions(user);
};

/**
 * Get role description
 */
export const getRoleDescription = (user: User | null, roleName: string): string | undefined => {
  if (!user?.roles) return undefined;
  const role = user.roles.find((r) => r.roleName === roleName);
  return role?.roleDescription;
};

/**
 * Get highest priority role
 * Priority: Admin > BCH > Moderator > Member
 */
export const getHighestPriorityRole = (user: User | null): Role | undefined => {
  if (!user?.roles || user.roles.length === 0) return undefined;

  const rolePriority: Record<string, number> = {
    [UserRole.ADMIN]: 4,
    [UserRole.BCH]: 3,
    [UserRole.MODERATOR]: 2,
    [UserRole.MEMBER]: 1,
  };

  return user.roles.reduce((highest, current) => {
    const currentPriority = rolePriority[current.roleName] || 0;
    const highestPriority = rolePriority[highest.roleName] || 0;
    return currentPriority > highestPriority ? current : highest;
  }, user.roles[0]);
};

/**
 * Format roles for display
 */
export const formatRolesForDisplay = (user: User | null): string => {
  if (!user?.roles || user.roles.length === 0) return 'Không có vai trò';
  return user.roles.map((role) => role.roleName).join(', ');
};

export default {
  getPrimaryRole,
  getAllRoles,
  hasRole,
  hasAnyRole,
  hasAllRoles,
  isAdmin,
  isModerator,
  isBCH,
  isMember,
  canPerformAdminActions,
  getRoleDescription,
  getHighestPriorityRole,
  formatRolesForDisplay,
};
