import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import Dashboard from '../pages/Dashboard';

const dashboardRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/dashboard',
  component: Dashboard,
});

export { dashboardRouteAdmin };
