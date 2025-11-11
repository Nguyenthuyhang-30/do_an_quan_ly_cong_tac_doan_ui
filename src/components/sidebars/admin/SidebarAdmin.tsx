import {
  BarChartOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  IdcardOutlined,
  LineChartOutlined,
  NotificationOutlined,
  ProfileOutlined,
  SafetyOutlined,
  SettingOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
  CalendarOutlined,
  HighlightOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { Menu } from 'antd';
import { useMemo } from 'react';
import { RiTeamFill } from 'react-icons/ri';

interface SidebarAdminProps {
  collapsed: boolean;
}

export const SidebarAdmin = ({ collapsed }: SidebarAdminProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const getCurrentSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('/dashboard/statistical')) return ['statistical'];
    if (path.includes('/dashboard/reports')) return ['reports'];
    if (path.includes('/dashboard/overview')) return ['dashboard'];

    if (path.includes('/users/list')) return ['users'];
    if (path.includes('/users/roles')) return ['user-roles'];

    if (path.includes('/general-category/cohorts')) return ['cohorts'];
    if (path.includes('/general-category/branches')) return ['branches'];

    if (path.includes('/settings/system')) return ['system-settings'];
    if (path.includes('/settings/security')) return ['security-settings'];
    if (path.includes('/settings/notification')) return ['notification-settings'];
    if (path.includes('/settings')) return ['settings'];

    if (path.includes('/activity/event')) return ['activity-event'];
    if (path.includes('/activity/vote')) return ['activity-vote'];
    if (path.includes('/activity/meeting')) return ['activity-meeting'];
    if (path.includes('/activity/volunteer')) return ['activity-volunteer'];

    return ['dashboard'];
  };

  const getOpenKeys = (): string[] => {
    const path = location.pathname;
    const openKeys: string[] = [];

    if (path.includes('/dashboard')) openKeys.push('dashboard-menu');
    if (path.includes('/users')) openKeys.push('users-menu');
    if (path.includes('/general-category')) openKeys.push('general-category-menu');
    if (path.includes('/settings')) openKeys.push('settings-menu');
    if (path.includes('/activity')) openKeys.push('activity-menu');

    return openKeys;
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    const routeMap: Record<string, string> = {
      // Dashboard
      dashboard: '/admin/dashboard/overview',
      statistical: '/admin/dashboard/statistical',
      reports: '/admin/dashboard/reports',

      users: '/admin/users/list',
      'user-roles': '/admin/users/roles',

      'general-category': '/admin/general-category',
      cohorts: '/admin/general-category/cohorts',
      branches: '/admin/general-category/branches',

      settings: '/admin/settings',
      'general-settings': '/admin/settings/general',
      'system-settings': '/admin/settings/system',
      'security-settings': '/admin/settings/security',
      'notification-settings': '/admin/settings/notification',

      'activity-event': '/admin/activity/event',
      'activity-vote': '/admin/activity/vote',
      'activity-meeting': '/admin/activity/meeting',
      'activity-volunteer': '/admin/activity/volunteer',
    };

    if (routeMap[key]) {
      navigate({ to: routeMap[key] });
    }
  };

  const menuItems = useMemo(
    () => [
      {
        key: 'dashboard-menu',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        children: [
          { key: 'dashboard', icon: <BarChartOutlined />, label: 'Tổng quan' },
          { key: 'statistical', icon: <LineChartOutlined />, label: 'Thống kê' },
          { key: 'reports', icon: <ProfileOutlined />, label: 'Báo cáo' },
        ],
      },
      {
        key: 'general-category-menu',
        icon: <DatabaseOutlined />,
        label: 'Danh mục chung',
        children: [
          { key: 'cohorts', icon: <TeamOutlined />, label: 'Khóa' },
          { key: 'branches', icon: <RiTeamFill />, label: 'Chi đoàn' },
        ],
      },
      {
        key: 'users-menu',
        icon: <UserOutlined />,
        label: 'Quản lý người dùng',
        children: [
          { key: 'users', icon: <TeamOutlined />, label: 'Tài khoản người dùng' },
          { key: 'user-roles', icon: <IdcardOutlined />, label: 'Quyền & vai trò' },
        ],
      },
      {
        key: 'settings-menu',
        icon: <SettingOutlined />,
        label: 'Cài đặt',
        children: [
          { key: 'general-settings', icon: <ToolOutlined />, label: 'Chung' },
          { key: 'system-settings', icon: <DatabaseOutlined />, label: 'Hệ thống' },
          { key: 'security-settings', icon: <SafetyOutlined />, label: 'Bảo mật' },
          { key: 'notification-settings', icon: <NotificationOutlined />, label: 'Thông báo' },
        ],
      },
      {
        key: 'activity-menu',
        icon: <CalendarOutlined />,
        label: 'Tạo hoạt động',
        children: [
          { key: 'activity-event', icon: <HighlightOutlined />, label: 'Tạo event' },
          { key: 'activity-vote', icon: <BarChartOutlined />, label: 'Tạo vote' },
          { key: 'activity-meeting', icon: <TeamOutlined />, label: 'Sinh hoạt' },
          { key: 'activity-volunteer', icon: <HeartOutlined />, label: 'Tình nguyện' },
        ],
      },
    ],
    [],
  );

  return (
    <div style={{ height: '100%', background: '#001529', color: '#fff' }}>
      <div
        style={{
          padding: '16px',
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 20,
          color: '#fff',
        }}
      >
        {collapsed ? 'QTV' : 'Quản trị viên'}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getCurrentSelectedKey()}
        defaultOpenKeys={getOpenKeys()}
        onClick={handleMenuClick}
        items={menuItems}
        style={{ border: 'none', background: '#001529' }}
      />
    </div>
  );
};
