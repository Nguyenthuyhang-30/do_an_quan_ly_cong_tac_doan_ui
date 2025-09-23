import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import CohortCategory from '../pages/genral-category/cohort/CohortCategory';
import BranchCategory from '../pages/genral-category/branch/Branch';

// Main route
const generalCategoryRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/general-category',
});

// Child routes cohort
const cohortCategoryRouteAdmin = createRoute({
  getParentRoute: () => generalCategoryRouteAdmin,
  path: '/cohorts',
  component: CohortCategory,
});
// child routes Branch
const branchCategoryRouteAdmin = createRoute({
  getParentRoute:() => generalCategoryRouteAdmin,
  path: '/branches',
  component: BranchCategory,
})

const generalCategoryTree = generalCategoryRouteAdmin.addChildren([cohortCategoryRouteAdmin,branchCategoryRouteAdmin]);


export { cohortCategoryRouteAdmin,branchCategoryRouteAdmin, generalCategoryRouteAdmin, generalCategoryTree };
