import { BellOutlined, SearchOutlined } from '@ant-design/icons';
import CommandPalette from '@components/common/CommandPalette';
import UserMenu from '@components/common/UserMenu';
import type { MenuProps } from 'antd';
import { Badge, Button, Divider, Dropdown, Input, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import './HeaderAdmin.scss';

const HeaderAdmin = () => {
  const [notificationCount] = useState(5);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Xử lý phím tắt Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Menu items cho user dropdown
  // const userMenuItems: MenuProps['items'] = [
  //   {
  //     key: 'profile',
  //     icon: <UserOutlined />,
  //     label: 'Thông tin cá nhân',
  //   },
  //   {
  //     key: 'messages',
  //     icon: <MailOutlined />,
  //     label: 'Tin nhắn',
  //   },
  //   {
  //     type: 'divider',
  //   },
  //   {
  //     key: 'settings',
  //     icon: <SettingOutlined />,
  //     label: 'Cài đặt',
  //   },
  //   {
  //     type: 'divider',
  //   },
  //   {
  //     key: 'logout',
  //     icon: <LogoutOutlined />,
  //     label: 'Đăng xuất',
  //     danger: true,
  //   },
  // ];

  // Menu items cho notifications dropdown
  const notificationMenuItems: MenuProps['items'] = [
    {
      key: 'notif-1',
      label: (
        <div className="admin-header-notification__item">
          <div className="admin-header-notification__item-title">Thông báo mới</div>
          <div className="admin-header-notification__item-content">
            Bạn có 1 nhiệm vụ mới cần xử lý
          </div>
          <div className="admin-header-notification__item-time">5 phút trước</div>
        </div>
      ),
    },
    {
      key: 'notif-2',
      label: (
        <div className="admin-header-notification__item">
          <div className="admin-header-notification__item-title">Cập nhật hệ thống</div>
          <div className="admin-header-notification__item-content">
            Hệ thống đã được cập nhật phiên bản mới
          </div>
          <div className="admin-header-notification__item-time">1 giờ trước</div>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'view-all',
      label: <div className="admin-header-notification__view-all">Xem tất cả thông báo</div>,
    },
  ];

  // const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  //   switch (key) {
  //     case 'logout':
  //       console.log('Đăng xuất');
  //       // TODO: Implement logout logic
  //       break;
  //     case 'profile':
  //       console.log('Xem profile');
  //       // TODO: Navigate to profile page
  //       break;
  //     case 'settings':
  //       console.log('Mở cài đặt');
  //       // TODO: Navigate to settings page
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleSearchClick = () => {
    setCommandPaletteOpen(true);
  };

  return (
    <>
      <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      <div className="admin-header">
        {/* Left Section - Title */}
        <div className="admin-header__title">
          <Typography.Title level={4}>Hệ thống quản lý đoàn viên</Typography.Title>
        </div>
        {/* Middle Section - Search */}
        <div className="admin-header__search">
          <Input
            placeholder="Tìm kiếm... (Ctrl+K)"
            readOnly
            onClick={handleSearchClick}
            prefix={<SearchOutlined />}
            suffix={
              <div className="admin-header__search-shortcut">
                <kbd>Ctrl</kbd>
                <span>+</span>
                <kbd>K</kbd>
              </div>
            }
            className="admin-header__search-trigger"
          />
        </div>{' '}
        {/* Right Section - Actions & User */}
        <Space size="large" className="admin-header__actions">
          {/* Notifications */}
          <Dropdown
            menu={{ items: notificationMenuItems }}
            trigger={['click']}
            placement="bottomRight"
            dropdownRender={(menu) => <div className="admin-header-notification">{menu}</div>}
          >
            <Badge
              count={notificationCount}
              offset={[-2, 2]}
              className="admin-header__notification-badge"
            >
              <Button
                type="text"
                icon={<BellOutlined style={{ fontSize: 18 }} />}
                className="admin-header__notification-btn"
              />
            </Badge>
          </Dropdown>

          <Divider type="vertical" style={{ height: 32, margin: 0 }} />

          {/* User Menu */}
          {/* <Dropdown
            menu={{ items: userMenuItems, onClick: handleMenuClick }}
            trigger={['click']}
            placement="bottomRight"
            overlayClassName="admin-header-user-menu"
          >
            <div className="admin-header__user-info">
              <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />}>
                A
              </Avatar>
              <div className="admin-header__user-info-text">
                <Text strong className="admin-header__user-info-name">
                  Admin User
                </Text>
                <Text type="secondary" className="admin-header__user-info-role">
                  Quản trị viên
                </Text>
              </div>
            </div>
          </Dropdown> */}

          <UserMenu />
        </Space>
      </div>
    </>
  );
};

export default HeaderAdmin;
