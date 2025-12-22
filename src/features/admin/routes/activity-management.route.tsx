// Activity Management Routes
import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import ActivityListPage from '../pages/activity-management/ActivityListPage';
import ActivityDetailPage from '../pages/activity-management/ActivityDetailPage';
import ActivityEditPage from '../pages/activity-management/ActivityEditPage';
import ActivityAttendancePage from '../pages/activity-management/ActivityAttendancePage';
import ActivityRegistrationPage from '../pages/activity-management/activity-registration/ActivityRegistrationPage';
import ActivityTypeSelectionPage from '../pages/activity-management/activity-registration/ActivityTypeSelectionPage';
import CreateEventRegistrationPage from '../pages/activity-management/activity-registration/event/CreateEventRegistrationPage';
import CreateVoteRegistrationPage from '../pages/activity-management/activity-registration/vote/CreateVoteRegistrationPage';
import CreateMeetingRegistrationPage from '../pages/activity-management/activity-registration/meeting/CreateMeetingRegistrationPage';
import CreateVolunteerRegistrationPage from '../pages/activity-management/activity-registration/volunteer/CreateVolunteerRegistrationPage';
import CreateEventPage from '../pages/activity/event/CreateEventPage';
import RegistrationListPage from '../pages/activity-management/registration-list/RegistrationListPage';

// Parent: /admin/activity-management
export const activityManagementRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/activity-management',
});

// /admin/activity-management/registration (đăng ký hoạt động - đặt trước list)
export const activityRegistrationRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/registration',
  component: ActivityRegistrationPage,
});

// /admin/activity-management/registration/select-type (chọn loại hoạt động)
export const activityTypeSelectionRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/registration/select-type',
  component: ActivityTypeSelectionPage,
});

// /admin/activity-management/registration/create/event (tạo phiếu đăng ký sự kiện)
export const createEventRegistrationRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/registration/create/event',
  component: CreateEventRegistrationPage,
});

// /admin/activity-management/registration/create/vote (tạo phiếu đăng ký biểu quyết)
export const createVoteRegistrationRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/registration/create/vote',
  component: CreateVoteRegistrationPage,
});

// /admin/activity-management/registration/create/meeting (tạo phiếu đăng ký sinh hoạt)
export const createMeetingRegistrationRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/registration/create/meeting',
  component: CreateMeetingRegistrationPage,
});

// /admin/activity-management/registration/create/volunteer (tạo phiếu đăng ký tình nguyện)
export const createVolunteerRegistrationRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/registration/create/volunteer',
  component: CreateVolunteerRegistrationPage,
});

// /admin/activity-management (list)
export const activityListRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/',
  component: ActivityListPage,
});

// /admin/activity-management/create
export const activityCreateRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/create',
  component: CreateEventPage,
});

// /admin/activity-management/$id
export const activityDetailRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/$id',
  component: ActivityDetailPage,
});

// /admin/activity-management/$id/edit
export const activityEditRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/$id/edit',
  component: ActivityEditPage,
});

// /admin/activity-management/$id/attendance
export const activityAttendanceRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/$id/attendance',
  component: ActivityAttendancePage,
});

// /admin/activity-management/registration-list (danh sách đăng ký)
export const registrationListRoute = createRoute({
  getParentRoute: () => activityManagementRouteAdmin,
  path: '/registration-list',
  component: RegistrationListPage,
});

export const activityManagementTree = activityManagementRouteAdmin.addChildren([
  activityRegistrationRoute,
  activityTypeSelectionRoute,
  createEventRegistrationRoute,
  createVoteRegistrationRoute,
  createMeetingRegistrationRoute,
  createVolunteerRegistrationRoute,
  registrationListRoute,
  activityListRoute,
  activityCreateRoute,
  activityDetailRoute,
  activityEditRoute,
  activityAttendanceRoute,
]);
