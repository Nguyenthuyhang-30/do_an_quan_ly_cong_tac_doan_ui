import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import UserPage from '../pages/user/User';
import UserAccountManagement from '../pages/user/List/UserAccountManagement';

const userRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/users',
});

const userAccountListRouteAdmin = createRoute({
  getParentRoute: () => userRouteAdmin,
  path: '/list',
  component: UserAccountManagement,
});

const userTree = userRouteAdmin.addChildren([
  userAccountListRouteAdmin,
]);

export { userRouteAdmin, userAccountListRouteAdmin, userTree };
