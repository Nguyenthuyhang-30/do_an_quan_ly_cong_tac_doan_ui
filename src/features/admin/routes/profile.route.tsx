import ProfilePage from '@features/admin/pages/profile/ProfilePage';
import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';

const profileRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/profile',
  component: ProfilePage,
});

export { profileRoute };

