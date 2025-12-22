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
  PictureOutlined,
  UserAddOutlined,
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

    if (path.includes('/general-category/cohorts')) return ['cohorts'];
    if (path.includes('/general-category/branches')) return ['branches'];

    if (path.includes('/branch')) return ['branch-list'];
    if (path.includes('/member-management')) return ['member-list'];

    if (path.includes('/settings/system')) return ['system-settings'];
    if (path.includes('/settings/security')) return ['security-settings'];
    if (path.includes('/settings/notification')) return ['notification-settings'];
    if (path.includes('/slider-management')) return ['slider-management'];
    if (path.includes('/settings')) return ['settings'];

    if (path.includes('/activity-management/registration')) return ['activity-registration'];
    if (path.includes('/activity-management')) return ['activity-list'];

    return ['dashboard'];
  };

  const getOpenKeys = (): string[] => {
    const path = location.pathname;
    const openKeys: string[] = [];

    if (path.includes('/dashboard')) openKeys.push('dashboard-menu');
    if (path.includes('/users')) openKeys.push('users-menu');
    if (path.includes('/general-category')) openKeys.push('general-category-menu');
    if (path.includes('/branch')) openKeys.push('organization-menu');
    if (path.includes('/member-management')) openKeys.push('organization-menu');
    if (path.includes('/settings')) openKeys.push('settings-menu');
    if (path.includes('/activity-management')) openKeys.push('activity-management-menu');

    return openKeys;
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    const routeMap: Record<string, string> = {
      // Dashboard
      dashboard: '/admin/dashboard/overview',
      statistical: '/admin/dashboard/statistical',
      reports: '/admin/dashboard/reports',

      users: '/admin/users/list',

      'general-category': '/admin/general-category',
      cohorts: '/admin/general-category/cohorts',
      branches: '/admin/general-category/branches',

      'branch-list': '/admin/branch',
      'member-list': '/admin/member-management',

      settings: '/admin/settings',
      'general-settings': '/admin/settings/general',
      'system-settings': '/admin/settings/system',
      'security-settings': '/admin/settings/security',
      'notification-settings': '/admin/settings/notification',
      'slider-management': '/admin/slider-management',

      'activity-registration': '/admin/activity-management/registration',
      'activity-list': '/admin/activity-management',
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
        key: 'organization-menu',
        icon: <TeamOutlined />,
        label: 'Quản lý tổ chức',
        children: [
          { key: 'branch-list', icon: <RiTeamFill />, label: 'Quản lý chi đoàn' },
          { key: 'member-list', icon: <UserOutlined />, label: 'Quản lý đoàn viên' },
        ],
      },
      {
        key: 'users-menu',
        icon: <UserOutlined />,
        label: 'Quản lý người dùng',
        children: [
          { key: 'users', icon: <TeamOutlined />, label: 'Tài khoản người dùng' },
        ],
      },

      {
        key: 'activity-management-menu',
        icon: <CalendarOutlined />,
        label: 'Quản lý hoạt động',
        children: [
          { key: 'activity-registration', icon: <UserAddOutlined />, label: 'Đăng ký hoạt động' },
          { key: 'activity-list', icon: <ProfileOutlined />, label: 'Danh sách hoạt động' },
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
          { key: 'slider-management', icon: <PictureOutlined />, label: 'Slider Banner' },
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
