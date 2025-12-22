import { mainRoute } from '@routes/main.routes';
import { createRoute } from '@tanstack/react-router';
import ProfilePage from '../pages/profile/ProfilePage';

const profileRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/profile',
  component: ProfilePage,
});

export default profileRoute;

