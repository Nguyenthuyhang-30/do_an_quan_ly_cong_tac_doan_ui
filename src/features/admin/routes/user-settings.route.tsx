import UserSettingsPage from '@features/admin/pages/user-settings/UserSettingsPage';
import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';

const userSettingsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/user-settings',
  component: UserSettingsPage,
});

export { userSettingsRoute };


