import {
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Space, Typography } from 'antd';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { profile, userSettings } from '../../config/paths';
import './UserMenu.scss';

const { Text } = Typography;

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const items: MenuProps['items'] = [
    {
      key: 'user-info',
      disabled: true,
      label: (
        <div className="dropdown-user-header">
          <p>{user.fullName}</p>
          <Text type="secondary">{user.email}</Text>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
      onClick: () => navigate({ to: '/' }),
    },
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate({ to: '/admin/dashboard/overview' }),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
      onClick: () => navigate({ to: profile }),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
      onClick: () => navigate({ to: userSettings }),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
      onClick: () => {
        logout();
        navigate({ to: '/login' });
      },
    },
  ];

  const avatarContent = user.avatar ? (
    <Avatar src={user.avatar} size="default" />
  ) : (
    <Avatar style={{ background: 'blueviolet' }} size="default">
      {(user.fullName || 'U')[0].toUpperCase()}
    </Avatar>
  );

  // Get primary role for display
  const primaryRole = user.roles && user.roles.length > 0 ? user.roles[0].roleName : null;

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
      <div className="user-menu-trigger">
        <Space size={8}>
          {avatarContent}
          <div className="user-info">
            <Text className="name">{user.fullName}</Text>
            {primaryRole && <Text className="role">{primaryRole}</Text>}
          </div>
        </Space>
      </div>
    </Dropdown>
  );
};

export default UserMenu;
