import AdminLayout from '@components/layout/admin/AdminLayout';
import { dashboardRouteAdmin, dashboardTree } from '@features/admin/routes/dashboard.route';
import { homeRouteAdmin } from '@features/admin/routes/home.route';
import { settingRouteAdmin } from '@features/admin/routes/setting.route';
import { userRouteAdmin } from '@features/admin/routes/users.route';
import { generalCategoryTree } from '@features/admin/routes/generalCategory.routes';
import { createRoute } from '@tanstack/react-router';
import { rootRoutes } from './routes';

const adminRoute = createRoute({
  getParentRoute: () => rootRoutes,
  path: '/admin',
  component: AdminLayout,
});

const adminTree = adminRoute.addChildren([
  homeRouteAdmin,
  userRouteAdmin,
  settingRouteAdmin,
  generalCategoryTree,
  dashboardTree
]);


export { adminRoute, adminTree };
