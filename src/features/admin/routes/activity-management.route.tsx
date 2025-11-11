// Activity Management Routes
import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import ActivityListPage from '../pages/activity-management/ActivityListPage';
import ActivityDetailPage from '../pages/activity-management/ActivityDetailPage';
import ActivityEditPage from '../pages/activity-management/ActivityEditPage';
import ActivityAttendancePage from '../pages/activity-management/ActivityAttendancePage';
import CreateEventPage from '../pages/activity/event/CreateEventPage';

// Parent: /admin/activity-management
export const activityManagementRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/activity-management',
});

// /admin/activity-management (list)
export const activityListRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/',
  component: ActivityListPage,
});

// /admin/activity-management/create
export const activityCreateRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/create',
  component: CreateEventPage,
});

// /admin/activity-management/$id
export const activityDetailRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/$id',
  component: ActivityDetailPage,
});

// /admin/activity-management/$id/edit
export const activityEditRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/$id/edit',
  component: ActivityEditPage,
});

// /admin/activity-management/$id/attendance
export const activityAttendanceRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/$id/attendance',
  component: ActivityAttendancePage,
});

export const activityManagementTree = activityManagementRouteAdmin.addChildren([
  activityListRoute,
  activityCreateRoute,
  activityDetailRoute,
  activityEditRoute,
  activityAttendanceRoute,
]);
