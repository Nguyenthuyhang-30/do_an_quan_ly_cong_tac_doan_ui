import { createRoute } from '@tanstack/react-router';
import { rootRoutes } from './routes';
import MainLayout from '@components/layout/main/MainLayout';
import settingWebRoute from '@features/setting/routes/settingWeb.route';

const settingRoute = createRoute({
  getParentRoute: () => rootRoutes,
  path: '/setting',
  component: MainLayout,
});

const settingTree = settingRoute.addChildren([settingWebRoute]);

export { settingTree, settingRoute };
