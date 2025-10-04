import { mainRoute } from '@routes/main.routes';
import { createRoute } from '@tanstack/react-router';
import { homeRoute } from './home.route';
import CheckActivites from '../pages/CheckActivities';
import { rootRoutes } from '@routes/routes';

const checkActivitesRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/tra-cuu-hoat-dong',
  component: CheckActivites,
});

export default checkActivitesRoute;
