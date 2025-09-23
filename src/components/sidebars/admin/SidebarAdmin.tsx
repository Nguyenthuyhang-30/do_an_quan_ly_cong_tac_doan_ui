import { Menu } from 'antd';
import { DashboardOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from '@tanstack/react-router';

interface SidebarAdminProps {
  collapsed: boolean;
}

export const SidebarAdmin = ({ collapsed }: SidebarAdminProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('/users')) return ['users'];
    if (path.includes('/settings')) return ['settings'];
    return ['dashboard'];
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate({ to: `/admin/${key}` });
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

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
        onClick={handleMenuClick}
        items={menuItems}
        style={{ border: 'none', background: '#001529' }}
      />
    </div>
  );
};
