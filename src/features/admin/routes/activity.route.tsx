// src/features/admin/routes/activity.route.tsx
import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import CreateEventPage from '../pages/activity/event/CreateEventPage';
import CreateVotePage from '../pages/activity/vote/CreateVotePage';
import CreateMeetingPage from '../pages/activity/meeting/CreateMeetingPage';
import CreateVolunteerPage from '../pages/activity/volunteer/CreateVolunteerPage';

// CHA: /admin/activity
export const activityRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/activity',
});

// /admin/activity/event
export const createActivityEventRouteAdmin = createRoute({
  getParentRoute: () => activityRouteAdmin,
  path: '/event',
  component: CreateEventPage,
});

// /admin/activity/vote
export const createActivityVoteRouteAdmin = createRoute({
  getParentRoute: () => activityRouteAdmin,
  path: '/vote',
  component: CreateVotePage,
});

// /admin/activity/meeting
export const createActivityMeetingRouteAdmin = createRoute({
  getParentRoute: () => activityRouteAdmin,
  path: '/meeting',
  component: CreateMeetingPage,
});

// /admin/activity/volunteer
export const createActivityVolunteerRouteAdmin = createRoute({
  getParentRoute: () => activityRouteAdmin,
  path: '/volunteer',
  component: CreateVolunteerPage,
});

export const activityTree = activityRouteAdmin.addChildren([
  createActivityEventRouteAdmin,
  createActivityVoteRouteAdmin,
  createActivityMeetingRouteAdmin,
  createActivityVolunteerRouteAdmin,
]);
