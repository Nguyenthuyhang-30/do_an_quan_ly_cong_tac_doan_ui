// Member Management Routes
import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import MemberListPage from '../pages/member-management/MemberListPage';

// Parent: /admin/member-management
export const memberManagementRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/member-management',
});

// /admin/member-management (list)
export const memberListRoute = createRoute({
  getParentRoute: () => memberManagementRouteAdmin,
  path: '/',
  component: MemberListPage,
});

// /admin/member-management/create
export const memberCreateRoute = createRoute({
  getParentRoute: () => memberManagementRouteAdmin,
  path: '/create',
  component: () => <div>Member Create Page - To be implemented</div>,
});

// /admin/member-management/$id
export const memberDetailRoute = createRoute({
  getParentRoute: () => memberManagementRouteAdmin,
  path: '/$id',
  component: () => <div>Member Detail Page - To be implemented</div>,
});

// /admin/member-management/$id/edit
export const memberEditRoute = createRoute({
  getParentRoute: () => memberManagementRouteAdmin,
  path: '/$id/edit',
  component: () => <div>Member Edit Page - To be implemented</div>,
});

// /admin/member-management/$id/activities
export const memberActivitiesRoute = createRoute({
  getParentRoute: () => memberManagementRouteAdmin,
  path: '/$id/activities',
  component: () => <div>Member Activities Page - To be implemented</div>,
});

export const memberManagementTree = memberManagementRouteAdmin.addChildren([
  memberListRoute,
  memberCreateRoute,
  memberDetailRoute,
  memberEditRoute,
  memberActivitiesRoute,
]);
