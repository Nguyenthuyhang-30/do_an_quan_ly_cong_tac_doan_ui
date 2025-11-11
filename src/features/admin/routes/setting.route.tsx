import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import SettingAdmin from '../pages/setting/Setting';
import GeneralSettingsPage from '../pages/setting/general/GeneralSettingsPage';
import SystemSettingsPage from '../pages/setting/system/SystemSettingsPage';
import SecuritySettingsPage from '../pages/setting/security/SecuritySettingsPage';
import NotificationSettingsPage from '../pages/setting/notification/NotificationSettingsPage';

const settingRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/settings',
});

const generalSettingsRouteAdmin = createRoute({
  getParentRoute: () => settingRouteAdmin,
  path: '/general',
  component: GeneralSettingsPage,
});
const systemSettingsRouteAdmin = createRoute({
  getParentRoute: () => settingRouteAdmin,
  path: '/system',
  component: SystemSettingsPage,
});
const securitySettingsRouteAdmin = createRoute({
  getParentRoute: () => settingRouteAdmin,
  path: '/security',
  component: SecuritySettingsPage,
});
const notificationSettingsRouteAdmin = createRoute({
  getParentRoute: () => settingRouteAdmin,
  path: '/notification',
  component: NotificationSettingsPage,
});

const settingTree = settingRouteAdmin.addChildren([
  generalSettingsRouteAdmin,
  systemSettingsRouteAdmin,
  securitySettingsRouteAdmin,
  notificationSettingsRouteAdmin,
]);

export {
  settingRouteAdmin,
  generalSettingsRouteAdmin,
  systemSettingsRouteAdmin,
  securitySettingsRouteAdmin,
  notificationSettingsRouteAdmin,
  settingTree,
};
