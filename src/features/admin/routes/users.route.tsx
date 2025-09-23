import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import UserPage from '../pages/user/User';

const userRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/users',
  component: UserPage,
});

export { userRouteAdmin };
