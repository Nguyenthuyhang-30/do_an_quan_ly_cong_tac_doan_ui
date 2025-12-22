import { useAuth } from './useAuth';
import { UserRole } from '../app-types/auth';
import * as roleHelpers from '../utils/roleHelpers';

/**
 * Custom hook for role-based access control
 * Works with multiple roles per user
 */
export const useRole = () => {
  const { user, isAuthenticated } = useAuth();

  /**
   * Check if user has a specific role
   */
  const hasRole = (role: UserRole | string): boolean => {
    if (!isAuthenticated) return false;
    return roleHelpers.hasRole(user, role);
  };

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = (roles: (UserRole | string)[]): boolean => {
    if (!isAuthenticated) return false;
    return roleHelpers.hasAnyRole(user, roles);
  };

  /**
   * Check if user has all of the specified roles
   */
  const hasAllRoles = (roles: (UserRole | string)[]): boolean => {
    if (!isAuthenticated) return false;
    return roleHelpers.hasAllRoles(user, roles);
  };

  /**
   * Check if user is admin
   */
  const isAdmin = (): boolean => {
    return roleHelpers.isAdmin(user);
  };

  /**
   * Check if user is moderator
   */
  const isModerator = (): boolean => {
    return roleHelpers.isModerator(user);
  };

  /**
   * Check if user is BCH (Ban Chấp hành)
   */
  const isBCH = (): boolean => {
    return roleHelpers.isBCH(user);
  };

  /**
   * Check if user is regular member
   */
  const isMember = (): boolean => {
    return roleHelpers.isMember(user);
  };

  /**
   * Check if user can perform admin actions
   * Admin, Moderator, and BCH can perform admin actions
   */
  const canPerformAdminActions = (): boolean => {
    return roleHelpers.canPerformAdminActions(user);
  };

  /**
   * Check if user can access admin area
   * Admin, Moderator, and BCH can access admin routes
   */
  const canAccessAdminArea = (): boolean => {
    return roleHelpers.canAccessAdminArea(user);
  };

  /**
   * Get primary role (first role in array)
   */
  const getPrimaryRole = (): string | undefined => {
    return roleHelpers.getPrimaryRole(user);
  };

  /**
   * Get all roles
   */
  const getAllRoles = (): string[] => {
    return roleHelpers.getAllRoles(user);
  };

  /**
   * Get highest priority role
   */
  const getHighestPriorityRole = () => {
    return roleHelpers.getHighestPriorityRole(user);
  };

  return {
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isModerator,
    isBCH,
    isMember,
    canPerformAdminActions,
    canAccessAdminArea,
    getPrimaryRole,
    getAllRoles,
    getHighestPriorityRole,
    currentRoles: user?.roles || [],
    primaryRole: roleHelpers.getPrimaryRole(user),
  };
};

export default useRole;
