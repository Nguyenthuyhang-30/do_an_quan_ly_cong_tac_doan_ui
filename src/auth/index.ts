/**
 * Authentication and Authorization Module
 * Central export point for all auth-related functionality
 */

// Types
export {
  UserRole,
  type User,
  type Role,
  type LoginRequest,
  type LoginResponse,
  type LoginResponseData,
  type RegisterRequest,
  type RegisterResponse,
  type AuthTokens,
  type ApiResponse,
} from '../app-types/auth';

// Hooks
export { useAuth } from '../hooks/useAuth';
export { useRole } from '../hooks/useRole';

// Components
export { default as ProtectedRoute } from '../components/common/ProtectedRoute';
export { withAuth, withAdminAuth } from '../components/common/withAuth';

// Services
export { default as authService } from '../services/api/auth.service';

// Guards & Utilities
export { isAdmin, hasRole, hasAnyRole, adminGuard, roleGuard } from '../utils/authGuards';

// Role Helpers
export * as roleHelpers from '../utils/roleHelpers';
export {
  getPrimaryRole,
  getAllRoles,
  getHighestPriorityRole,
  formatRolesForDisplay,
  canPerformAdminActions,
  canAccessAdminArea,
  isBCH,
  isMember,
} from '../utils/roleHelpers';

// Context
export { AuthContext } from '../contexts/AuthContext';
export { AuthProvider } from '../contexts/AuthProvider';
