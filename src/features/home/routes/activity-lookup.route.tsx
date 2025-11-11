// Activity Lookup Route (Public)
import { createRoute } from '@tanstack/react-router';
import { mainRoute } from '@routes/main.routes';
import ActivityLookupPage from '../pages/ActivityLookupPage';

// /tra-cuu-hoat-dong
export const activityLookupRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/tra-cuu-hoat-dong',
  component: ActivityLookupPage,
});
