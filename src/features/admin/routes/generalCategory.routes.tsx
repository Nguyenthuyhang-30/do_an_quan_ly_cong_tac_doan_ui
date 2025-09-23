import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import CohortCategory from '../pages/genral-category/CohortCategory';

// Main route
const generalCategoryRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/general-category',
});

// Child routes
const cohortCategoryRouteAdmin = createRoute({
  getParentRoute: () => generalCategoryRouteAdmin,
  path: '/cohorts',
  component: CohortCategory,
});

const generalCategoryTree = generalCategoryRouteAdmin.addChildren([cohortCategoryRouteAdmin]);

export { cohortCategoryRouteAdmin, generalCategoryRouteAdmin, generalCategoryTree };
