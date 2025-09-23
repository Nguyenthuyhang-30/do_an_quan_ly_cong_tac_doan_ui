import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import SettingAdmin from '../pages/Setting';

const settingRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/settings',
  component: SettingAdmin,
});

export { settingRouteAdmin };
