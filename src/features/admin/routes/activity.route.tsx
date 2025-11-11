// src/features/admin/routes/activity.route.tsx
import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import ActivityTypeSelection from '../pages/activity/ActivityTypeSelection';
import CreateEventPage from '../pages/activity/event/CreateEventPage';
import CreateVotePage from '../pages/activity/vote/CreateVotePage';
import CreateMeetingPage from '../pages/activity/meeting/CreateMeetingPage';
import CreateVolunteerPage from '../pages/activity/volunteer/CreateVolunteerPage';

// Parent: /admin/activity (no component, just route grouping)
export const activityRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/activity',
});

// /admin/activity/ (index - Activity Type Selection)
export const activityIndexRoute = createRoute({
  getParentRoute: () => activityRouteAdmin,
  path: '/',
  component: ActivityTypeSelection,
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
  activityIndexRoute,
  createActivityEventRouteAdmin,
  createActivityVoteRouteAdmin,
  createActivityMeetingRouteAdmin,
  createActivityVolunteerRouteAdmin,
]);
