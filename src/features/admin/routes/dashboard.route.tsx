import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import OverviewDashboard from '../pages/dashboard/Overview/Overview';

const dashboardRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/dashboard',
});

// Child routes
const overviewRouteAdmin = createRoute({
  getParentRoute: () => dashboardRouteAdmin,
  path: '/overview',
  component: OverviewDashboard,
});

const  dashboardTree = dashboardRouteAdmin.addChildren([overviewRouteAdmin]);


export { dashboardRouteAdmin, dashboardTree, overviewRouteAdmin };
