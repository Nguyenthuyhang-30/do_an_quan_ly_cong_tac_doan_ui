import { createRoute } from '@tanstack/react-router';
import { rootRoutes } from './routes';
import MainLayout from '@components/layout/main/MainLayout';
import { homeTree } from '@features/home/routes/home.route';
import BirthdayWish from '@pages/BirthdayWish';
import ActivityLookupPage from '@features/home/pages/ActivityLookupPage';
import QRCheckInPage from '@features/home/pages/QRCheckInPage';

const mainRoute = createRoute({
  getParentRoute: () => rootRoutes,
  id: 'main',
  component: MainLayout,
});

const birthdayRoute = createRoute({
  getParentRoute: () => rootRoutes,
  path: '/birthday-wish',
  component: BirthdayWish,
});

const activityLookupRoute = createRoute({
  getParentRoute: () => rootRoutes,
  path: '/tra-cuu-hoat-dong',
  component: ActivityLookupPage,
});

const qrCheckInRoute = createRoute({
  getParentRoute: () => rootRoutes,
  path: '/check-in/qr',
  component: QRCheckInPage,
});

const mainTree = mainRoute.addChildren([homeTree]);

export { mainTree, mainRoute, birthdayRoute, activityLookupRoute, qrCheckInRoute };
