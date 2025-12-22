import { Modal, Input, List, Typography, Tag, Empty } from 'antd';
import type { InputRef } from 'antd';
import {
  SearchOutlined,
  FileTextOutlined,
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  DatabaseOutlined,
  LineChartOutlined,
  ProfileOutlined,
  PieChartOutlined,
  IdcardOutlined,
  ToolOutlined,
  SafetyOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import './CommandPalette.scss';
import { RiTeamFill } from 'react-icons/ri';

const { Text } = Typography;

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: 'pages' | 'actions' | 'settings';
  keywords: string[];
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<InputRef>(null);

  const commands: CommandItem[] = useMemo(
    () => [
      // ========== DASHBOARD ==========
      {
        id: 'dashboard-overview',
        title: 'Dashboard - Tổng quan',
        description: 'Xem tổng quan hệ thống',
        icon: <DashboardOutlined />,
        category: 'pages',
        keywords: ['dashboard', 'tổng quan', 'overview', 'home', 'trang chủ'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/admin/dashboard/overview' }), 100);
        },
      },
      {
        id: 'dashboard-analytics',
        title: 'Thống kê',
        description: 'Xem phân tích và thống kê chi tiết',
        icon: <LineChartOutlined />,
        category: 'pages',
        keywords: ['analytics', 'thống kê', 'phân tích', 'chart'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/admin/dashboard/analytics' }), 100);
        },
      },
      {
        id: 'dashboard-reports',
        title: 'Báo cáo',
        description: 'Xem các báo cáo hệ thống',
        icon: <ProfileOutlined />,
        category: 'pages',
        keywords: ['reports', 'báo cáo', 'report'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/admin/dashboard/reports' }), 100);
        },
      },
      {
        id: 'dashboard-charts',
        title: 'Biểu đồ',
        description: 'Xem biểu đồ trực quan',
        icon: <PieChartOutlined />,
        category: 'pages',
        keywords: ['charts', 'biểu đồ', 'visualization', 'graph'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/admin/dashboard/charts' }), 100);
        },
      },

      // ========== DANH MỤC CHUNG ==========
      {
        id: 'general-category',
        title: 'Danh mục chung',
        description: 'Quản lý các danh mục hệ thống',
        icon: <DatabaseOutlined />,
        category: 'pages',
        keywords: ['category', 'danh mục', 'chung', 'general'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/admin/general-category' }), 100);
        },
      },
      {
        id: 'cohorts',
        title: 'Quản lý Khóa',
        description: 'Quản lý các khóa đoàn viên',
        icon: <TeamOutlined />,
        category: 'pages',
        keywords: ['cohorts', 'khóa', 'danh mục', 'course', 'lớp'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/admin/general-category/cohorts' }), 100);
        },
      },
      {
        id: 'branches',
        title: 'Quản lý Chi đoàn',
        description: 'Quản lý các chi đoàn',
        icon: <RiTeamFill />,
        category: 'pages',
        keywords: ['branches', 'chi đoàn', 'branch', 'đoàn'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/admin/general-category/branches' }), 100);
        },
      },

      // ========== QUẢN LÝ NGƯỜI DÙNG ==========
      {
        id: 'users-list',
        title: 'Tài khoản người dùng',
        description: 'Danh sách và quản lý tài khoản',
        icon: <UserOutlined />,
        category: 'pages',
        keywords: ['users', 'người dùng', 'user', 'account', 'tài khoản', 'quản lý'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/admin/users/list' }), 100);
        },
      },
      // ========== CÀI ĐẶT ==========
      {
        id: 'settings-general',
        title: 'Cài đặt chung',
        description: 'Cấu hình chung của hệ thống',
        icon: <ToolOutlined />,
        category: 'settings',
        keywords: ['settings', 'cài đặt', 'chung', 'general', 'config'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/admin/settings' }), 100);
        },
      },
      {
        id: 'settings-system',
        title: 'Cài đặt hệ thống',
        description: 'Cấu hình hệ thống nâng cao',
        icon: <DatabaseOutlined />,
        category: 'settings',
        keywords: ['system', 'hệ thống', 'cài đặt', 'config', 'system settings'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/admin/settings/system' }), 100);
        },
      },
      {
        id: 'settings-security',
        title: 'Cài đặt bảo mật',
        description: 'Quản lý bảo mật và an ninh',
        icon: <SafetyOutlined />,
        category: 'settings',
        keywords: ['security', 'bảo mật', 'an ninh', 'safety', 'password'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/admin/settings/security' }), 100);
        },
      },
      {
        id: 'settings-notifications',
        title: 'Cài đặt thông báo',
        description: 'Quản lý thông báo hệ thống',
        icon: <NotificationOutlined />,
        category: 'settings',
        keywords: ['notifications', 'thông báo', 'alerts', 'email'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/admin/settings/notifications' }), 100);
        },
      },

      // ========== ACTIONS ==========
      {
        id: 'profile',
        title: 'Xem hồ sơ',
        description: 'Xem thông tin cá nhân của bạn',
        icon: <UserOutlined />,
        category: 'actions',
        keywords: ['profile', 'hồ sơ', 'thông tin', 'cá nhân', 'account'],
        action: () => {
          onClose();
          setTimeout(() => navigate({ to: '/profile' }), 100);
        },
      },
      {
        id: 'docs',
        title: 'Tài liệu hướng dẫn',
        description: 'Xem tài liệu và hướng dẫn sử dụng',
        icon: <FileTextOutlined />,
        category: 'actions',
        keywords: ['docs', 'tài liệu', 'hướng dẫn', 'documentation', 'help'],
        action: () => {
          onClose();
          setTimeout(() => window.open('/docs', '_blank'), 100);
        },
      },
    ],
    [navigate, onClose],
  );

  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) {
      return commands;
    }

    const query = searchQuery.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(query) ||
        cmd.description?.toLowerCase().includes(query) ||
        cmd.keywords.some((keyword) => keyword.toLowerCase().includes(query)),
    );
  }, [searchQuery, commands]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  // Auto focus input khi modal mở
  useEffect(() => {
    if (open) {
      // Delay nhỏ để đảm bảo modal đã render xong
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
          break;
      }
    },
    [filteredCommands, selectedIndex],
  );

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'pages':
        return { text: 'Trang', color: 'blue' };
      case 'actions':
        return { text: 'Hành động', color: 'green' };
      case 'settings':
        return { text: 'Cài đặt', color: 'orange' };
      default:
        return { text: 'Khác', color: 'default' };
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={640}
      className="command-palette-modal"
      closeIcon={null}
      keyboard={true}
      maskClosable={true}
      destroyOnClose={true}
      centered
      transitionName="command-palette-zoom"
      maskTransitionName="command-palette-fade"
      afterClose={() => {
        // Reset state sau khi modal đóng hoàn toàn
        setSearchQuery('');
        setSelectedIndex(0);
      }}
      styles={{
        body: { padding: 0 },
      }}
    >
      <div className="command-palette">
        <div className="command-palette__search">
          <SearchOutlined className="command-palette__search-icon" />
          <Input
            ref={inputRef}
            placeholder="Tìm kiếm trang, chức năng... (Ctrl+K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            bordered={false}
            autoFocus
            className="command-palette__search-input"
          />
          <div className="command-palette__shortcut">
            <kbd>ESC</kbd>
          </div>
        </div>

        <div className="command-palette__results">
          {filteredCommands.length > 0 ? (
            <List
              dataSource={filteredCommands}
              renderItem={(item, index) => {
                const category = getCategoryLabel(item.category);
                return (
                  <List.Item
                    className={`command-palette__item ${
                      index === selectedIndex ? 'command-palette__item--selected' : ''
                    }`}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="command-palette__item-icon">{item.icon}</div>
                    <div className="command-palette__item-content">
                      <div className="command-palette__item-title">
                        <Text strong>{item.title}</Text>
                        <Tag color={category.color} className="command-palette__item-tag">
                          {category.text}
                        </Tag>
                      </div>
                      {item.description && (
                        <Text type="secondary" className="command-palette__item-description">
                          {item.description}
                        </Text>
                      )}
                    </div>
                    {index === selectedIndex && (
                      <div className="command-palette__item-hint">
                        <kbd>↵</kbd>
                      </div>
                    )}
                  </List.Item>
                );
              }}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không tìm thấy kết quả"
              className="command-palette__empty"
            />
          )}
        </div>

        <div className="command-palette__footer">
          <div className="command-palette__footer-shortcuts">
            <span>
              <kbd>↑</kbd> <kbd>↓</kbd> di chuyển
            </span>
            <span>
              <kbd>↵</kbd> chọn
            </span>
            <span>
              <kbd>ESC</kbd> đóng
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CommandPalette;
