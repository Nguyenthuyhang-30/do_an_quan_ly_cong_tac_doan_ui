import { mainRoute } from '@routes/main.routes';
import { createRoute } from '@tanstack/react-router';
import Home from '@features/home/pages/Home';
import SettingSite from '../pages/SettingSite';
import { settingRoute } from '@routes/setting.routes';

const settingWebRoute = createRoute({
  getParentRoute: () => settingRoute,
  path: '/web',
  component: SettingSite,
});

export default settingWebRoute;
