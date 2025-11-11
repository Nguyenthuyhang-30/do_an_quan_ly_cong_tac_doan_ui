import AdminLayout from '@components/layout/admin/AdminLayout';
import { dashboardTree } from '@features/admin/routes/dashboard.route';
import { homeRouteAdmin } from '@features/admin/routes/home.route';
import { settingRouteAdmin } from '@features/admin/routes/setting.route';
import { userTree } from '@features/admin/routes/users.route';
import { generalCategoryTree } from '@features/admin/routes/generalCategory.routes';
import { activityTree } from '@features/admin/routes/activity.route';
import { activityManagementTree } from '@features/admin/routes/activity-management.route';
import { branchTree } from '@features/admin/routes/branch.route';
import { memberManagementTree } from '@features/admin/routes/member-management.route';
import { createRoute } from '@tanstack/react-router';
import { rootRoutes } from './routes';

const adminRoute = createRoute({
  getParentRoute: () => rootRoutes,
  path: '/admin',
  component: AdminLayout,
});

const adminTree = adminRoute.addChildren([
  homeRouteAdmin,
  dashboardTree,
  userTree,
  generalCategoryTree,
  branchTree,
  memberManagementTree,
  activityTree,
  activityManagementTree,
  settingRouteAdmin,
]);

export { adminRoute, adminTree };
