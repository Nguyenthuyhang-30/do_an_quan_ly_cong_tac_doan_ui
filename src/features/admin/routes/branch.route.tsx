// Branch Management Routes
import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import BranchListPage from '../pages/member-management/branch/BranchListPage';
import BranchFormPage from '../pages/member-management/branch/BranchFormPage';

// Parent: /admin/branch
export const branchRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/branch',
});

// /admin/branch (list)
export const branchListRoute = createRoute({
  getParentRoute: () => branchRouteAdmin,
  path: '/',
  component: BranchListPage,
});

// /admin/branch/create
export const branchCreateRoute = createRoute({
  getParentRoute: () => branchRouteAdmin,
  path: '/create',
  component: () => <BranchFormPage mode="create" />,
});

// /admin/branch/$id/edit
export const branchEditRoute = createRoute({
  getParentRoute: () => branchRouteAdmin,
  path: '/$id/edit',
  component: () => <BranchFormPage mode="edit" />,
});

// /admin/branch/$id (detail - to be implemented)
export const branchDetailRoute = createRoute({
  getParentRoute: () => branchRouteAdmin,
  path: '/$id',
  component: () => <div>Branch Detail Page - To be implemented</div>,
});

export const branchTree = branchRouteAdmin.addChildren([
  branchListRoute,
  branchCreateRoute,
  branchEditRoute,
  branchDetailRoute,
]);
