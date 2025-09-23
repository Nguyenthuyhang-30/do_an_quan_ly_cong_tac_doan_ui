import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';

const dashboardRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/dashboard',
});

export { dashboardRouteAdmin };
