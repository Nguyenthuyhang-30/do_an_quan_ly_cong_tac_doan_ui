// Account Management Routes
import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';

// Parent: /admin/account-management
export const accountManagementRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/account-management',
});

// /admin/account-management (list)
export const accountListRoute = createRoute({
  getParentRoute: () => accountManagementRouteAdmin,
  path: '/',
  component: () => <div>Account List Page - To be implemented</div>,
});

// /admin/account-management/$id
export const accountDetailRoute = createRoute({
  getParentRoute: () => accountManagementRouteAdmin,
  path: '/$id',
  component: () => <div>Account Detail Page - To be implemented</div>,
});

// /admin/account-management/$id/edit
export const accountEditRoute = createRoute({
  getParentRoute: () => accountManagementRouteAdmin,
  path: '/$id/edit',
  component: () => <div>Account Edit Page - To be implemented</div>,
});

export const accountManagementTree = accountManagementRouteAdmin.addChildren([
  accountListRoute,
  accountDetailRoute,
  accountEditRoute,
]);
