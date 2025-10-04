import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoutes } from './routes';
import MainLayout from '@components/layout/main/MainLayout';
import { homeTree } from '@features/home/routes/home.route';
import checkActivitesRoute from '@features/home/routes/checkActivities.route';

const mainRoute = createRoute({
  getParentRoute: () => rootRoutes,
  id: 'main',
  component: MainLayout,
});

const mainTree = mainRoute.addChildren([homeTree]);

export { mainTree, mainRoute };
