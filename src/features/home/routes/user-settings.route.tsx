import { mainRoute } from '@routes/main.routes';
import { createRoute } from '@tanstack/react-router';
import UserSettingsPage from '../pages/user-settings/UserSettingsPage';

const userSettingsRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/user-settings',
  component: UserSettingsPage,
});

export default userSettingsRoute;

