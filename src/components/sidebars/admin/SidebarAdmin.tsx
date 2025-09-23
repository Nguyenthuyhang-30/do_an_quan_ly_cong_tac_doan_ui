import { Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  UserAddOutlined,
  IdcardOutlined,
  SafetyOutlined,
  DatabaseOutlined,
  NotificationOutlined,
  ToolOutlined,
  ProfileOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { useMemo } from 'react';

interface SidebarAdminProps {
  collapsed: boolean;
}

export const SidebarAdmin = ({ collapsed }: SidebarAdminProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentSelectedKey = () => {
    const path = location.pathname;
    // Dashboard submenu
    if (path.includes('/dashboard/analytics')) return ['analytics'];
    if (path.includes('/dashboard/reports')) return ['reports'];
    if (path.includes('/dashboard/charts')) return ['charts'];
    if (path.includes('/dashboard')) return ['dashboard'];

    // User Management submenu
    if (path.includes('/users/list')) return ['user-list'];
    if (path.includes('/users/add')) return ['user-add'];
    if (path.includes('/users/roles')) return ['user-roles'];
    if (path.includes('/users')) return ['users'];

    // General Category submenu
    if (path.includes('/general-category/cohorts')) return ['cohorts'];
    if (path.includes('/general-category')) return ['general-category'];

    // Settings submenu
    if (path.includes('/settings/system')) return ['system-settings'];
    if (path.includes('/settings/security')) return ['security-settings'];
    if (path.includes('/settings/notifications')) return ['notification-settings'];
    if (path.includes('/settings')) return ['settings'];

    return ['dashboard'];
  };

  const getOpenKeys = (): string[] => {
    const path = location.pathname;
    const openKeys: string[] = [];

    if (path.includes('/dashboard')) openKeys.push('dashboard-menu');
    if (path.includes('/users')) openKeys.push('users-menu');
    if (path.includes('/general-category')) openKeys.push('general-category-menu');
    if (path.includes('/settings')) openKeys.push('settings-menu');

    return openKeys;
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    const routeMap: Record<string, string> = {
      // Dashboard routes
      dashboard: '/admin/dashboard',
      analytics: '/admin/dashboard/analytics',
      reports: '/admin/dashboard/reports',
      charts: '/admin/dashboard/charts',

      // User Management routes
      users: '/admin/users',
      'user-list': '/admin/users/list',
      'user-add': '/admin/users/add',
      'user-roles': '/admin/users/roles',

      // General Category routes
      'general-category': '/admin/general-category',
      cohorts: '/admin/general-category/cohorts',

      // Settings routes
      settings: '/admin/settings',
      'system-settings': '/admin/settings/system',
      'security-settings': '/admin/settings/security',
      'notification-settings': '/admin/settings/notifications',
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
          {
            key: 'dashboard',
            icon: <BarChartOutlined />,
            label: 'Overview',
          },
          {
            key: 'analytics',
            icon: <LineChartOutlined />,
            label: 'Analytics',
          },
          {
            key: 'reports',
            icon: <ProfileOutlined />,
            label: 'Reports',
          },
          {
            key: 'charts',
            icon: <PieChartOutlined />,
            label: 'Charts',
          },
        ],
      },
      {
        key: 'general-category-menu',
        icon: <DatabaseOutlined />,
        label: 'General Category',
        children: [
          {
            key: 'cohorts',
            icon: <TeamOutlined />,
            label: 'Cohorts',
          },
        ],
      },
      {
        key: 'users-menu',
        icon: <UserOutlined />,
        label: 'User Management',
        children: [
          {
            key: 'users',
            icon: <TeamOutlined />,
            label: 'All Users',
          },
          {
            key: 'user-list',
            icon: <TeamOutlined />,
            label: 'User List',
          },
          {
            key: 'user-add',
            icon: <UserAddOutlined />,
            label: 'Add User',
          },
          {
            key: 'user-roles',
            icon: <IdcardOutlined />,
            label: 'Roles & Permissions',
          },
        ],
      },
      {
        key: 'settings-menu',
        icon: <SettingOutlined />,
        label: 'Settings',
        children: [
          {
            key: 'settings',
            icon: <ToolOutlined />,
            label: 'General',
          },
          {
            key: 'system-settings',
            icon: <DatabaseOutlined />,
            label: 'System',
          },
          {
            key: 'security-settings',
            icon: <SafetyOutlined />,
            label: 'Security',
          },
          {
            key: 'notification-settings',
            icon: <NotificationOutlined />,
            label: 'Notifications',
          },
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
        {collapsed ? 'A' : 'Admin'}
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
