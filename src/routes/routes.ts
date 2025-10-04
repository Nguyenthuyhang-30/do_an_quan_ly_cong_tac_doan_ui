import RootLayout from '@components/layout/route/RootLayout';
import NotFound from '@pages/NotFound';
import { createRootRoute, createRouter } from '@tanstack/react-router';
import { adminTree } from './admin.routes';
import { authTree } from './auth.routes';
import { mainTree } from './main.routes';
import { settingTree } from './setting.routes';

const rootRoutes = createRootRoute({
  component: RootLayout,
});

const rootTree = rootRoutes.addChildren([mainTree, adminTree, authTree, settingTree]);

const router = createRouter({
  routeTree: rootTree,
  defaultNotFoundComponent: NotFound,
});

export { rootRoutes, rootTree, router };

