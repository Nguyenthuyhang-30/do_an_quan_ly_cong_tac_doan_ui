import { mainRoute } from '@routes/main.routes';
import { createRoute } from '@tanstack/react-router';
import Home from '@features/home/pages/Home';
import checkActivitesRoute from './checkActivities.route';
import executiveBoardRoute from './executiveBoard.route';
import contactRoute from './contact.route';

const homeRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/',
  component: Home,
});

const homeTree = homeRoute.addChildren([checkActivitesRoute, executiveBoardRoute, contactRoute]);

export { homeTree, homeRoute, contactRoute };
