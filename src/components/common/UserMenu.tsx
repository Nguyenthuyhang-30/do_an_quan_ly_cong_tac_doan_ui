import React from 'react';
import { Avatar, Dropdown, Space, Typography } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import './UserMenu.scss';

const { Text } = Typography;

/**
 * UserMenu Component
 * Displays user avatar and dropdown menu with profile options
 */
const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'user-info',
      label: (
        <div className="user-menu-info ">
          <p className="text-black">{user.fullName}</p>
          <Text type="secondary" className="user-email">
            {user.email}
          </Text>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => handleNavigation('/admin'),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
      onClick: () => handleNavigation('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
      onClick: () => handleNavigation('/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
      onClick: handleLogout,
    },
  ];

  // Get first letter of name for avatar fallback
  const avatarLetter = user.fullName?.charAt(0).toUpperCase() || 'U';

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow trigger={['click']}>
      <div className="user-menu-trigger">
        <Space>
          <Avatar
            src={user.avatar}
            icon={!user.avatar && <UserOutlined />}
            size="default"
            className="user-avatar"
          >
            {!user.avatar && avatarLetter}
          </Avatar>
          <div className="user-info-compact">
            <Text className="user-name text-black">{user.fullName}</Text>
            {user.role && (
              <Text type="secondary" className="user-role">
                {user.role}
              </Text>
            )}
          </div>
        </Space>
      </div>
    </Dropdown>
  );
};

export default UserMenu;
