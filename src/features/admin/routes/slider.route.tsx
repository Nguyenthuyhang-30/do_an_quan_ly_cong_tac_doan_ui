import { createRoute } from '@tanstack/react-router';
import { adminRoute } from '@routes/admin.routes';
import SliderManagement from '../pages/SliderManagement';

const sliderRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/slider-management',
  component: SliderManagement,
});

export const sliderTree = sliderRoute;
