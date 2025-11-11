// Notification Service
export { notificationService, default as notification } from './notification';

// Auth Guards
export { isAdmin, hasRole, hasAnyRole, adminGuard, roleGuard } from './authGuards';

// Role Helpers
export * as roleHelpers from './roleHelpers';
export {
  getPrimaryRole,
  getAllRoles,
  getHighestPriorityRole,
  formatRolesForDisplay,
  canPerformAdminActions,
  canAccessAdminArea,
  isBCH,
  isMember,
} from './roleHelpers';
