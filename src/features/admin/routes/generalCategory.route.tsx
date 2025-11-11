import Home from '@features/admin/pages/Home';
import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
// import GeneralCategory from '../pages/general-category/GeneralCategory';
import GeneralCategory from '../pages/general-category/GeneralCategory';

const generalCategoryRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/general-category',
  component: GeneralCategory,
});

export { generalCategoryRoute };
