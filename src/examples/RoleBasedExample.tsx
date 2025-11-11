import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRole } from '../hooks/useRole';
import { Button, Card, Tag, Space, Typography, Divider } from 'antd';
import { UserOutlined, SafetyCertificateOutlined, CrownOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

/**
 * Example component demonstrating role-based access control
 * This shows how to use useAuth and useRole hooks for conditional rendering
 */
const RoleBasedExample: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isAdmin, isModerator, isBCH, isMember, hasAnyRole, getAllRoles, getHighestPriorityRole } =
    useRole();

  const highestRole = getHighestPriorityRole();
  const allRoles = getAllRoles();

  if (!isAuthenticated) {
    return (
      <Card>
        <Title level={3}>Vui lòng đăng nhập</Title>
        <Paragraph>Bạn cần đăng nhập để xem nội dung này.</Paragraph>
      </Card>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* User Info */}
          <div>
            <Title level={3}>
              <UserOutlined /> Thông tin người dùng
            </Title>
            <Paragraph>
              <Text strong>Tên:</Text> {user?.fullName}
            </Paragraph>
            <Paragraph>
              <Text strong>Email:</Text> {user?.email}
            </Paragraph>
            <Paragraph>
              <Text strong>Vai trò:</Text>{' '}
              <Space>
                {allRoles.map((role) => (
                  <Tag
                    key={role}
                    color={
                      role === 'Admin'
                        ? 'red'
                        : role === 'BCH'
                        ? 'orange'
                        : role === 'Moderator'
                        ? 'blue'
                        : 'green'
                    }
                  >
                    {role}
                  </Tag>
                ))}
              </Space>
            </Paragraph>
            {highestRole && (
              <Paragraph>
                <Text strong>Vai trò chính:</Text> <Tag color="purple">{highestRole.roleName}</Tag>
                {highestRole.roleDescription && (
                  <Text type="secondary"> - {highestRole.roleDescription}</Text>
                )}
              </Paragraph>
            )}
          </div>

          <Divider />

          {/* Admin Only Content */}
          {isAdmin() && (
            <Card
              type="inner"
              title={
                <>
                  <CrownOutlined /> Nội dung dành cho Admin
                </>
              }
              style={{ background: '#fff1f0' }}
            >
              <Paragraph>Bạn có quyền quản trị viên! Bạn có thể:</Paragraph>
              <ul>
                <li>Quản lý toàn bộ hệ thống</li>
                <li>Thêm/sửa/xóa người dùng</li>
                <li>Cấu hình hệ thống</li>
                <li>Xem tất cả báo cáo</li>
              </ul>
            </Card>
          )}

          {/* BCH Only Content */}
          {isBCH() && (
            <Card
              type="inner"
              title={
                <>
                  <CrownOutlined /> Nội dung dành cho BCH
                </>
              }
              style={{ background: '#fff7e6' }}
            >
              <Paragraph>Bạn là Ban Chấp hành! Bạn có thể:</Paragraph>
              <ul>
                <li>Quản lý đoàn viên</li>
                <li>Phê duyệt hoạt động</li>
                <li>Quản lý chi đoàn</li>
                <li>Xem báo cáo chi tiết</li>
              </ul>
            </Card>
          )}

          {/* Moderator Only Content */}
          {isModerator() && (
            <Card
              type="inner"
              title={
                <>
                  <SafetyCertificateOutlined /> Nội dung dành cho Moderator
                </>
              }
              style={{ background: '#e6f7ff' }}
            >
              <Paragraph>Bạn là người kiểm duyệt! Bạn có thể:</Paragraph>
              <ul>
                <li>Kiểm duyệt nội dung</li>
                <li>Quản lý bài viết</li>
                <li>Xem báo cáo</li>
              </ul>
            </Card>
          )}

          {/* Content for Admin, BCH or Moderator */}
          {hasAnyRole(['Admin', 'BCH', 'Moderator']) && (
            <Card
              type="inner"
              title="Nội dung cho Admin, BCH & Moderator"
              style={{ background: '#f6ffed' }}
            >
              <Paragraph>Bạn có quyền truy cập vào các tính năng quản trị cấp cao.</Paragraph>
            </Card>
          )}

          {/* Regular Member Content */}
          {isMember() && (
            <Card type="inner" title="Nội dung đoàn viên" style={{ background: '#f9f0ff' }}>
              <Paragraph>Chào mừng bạn! Bạn có thể:</Paragraph>
              <ul>
                <li>Xem thông tin cá nhân</li>
                <li>Cập nhật hồ sơ</li>
                <li>Xem hoạt động của mình</li>
              </ul>
            </Card>
          )}

          {/* Public Content - Everyone can see */}
          <Card type="inner" title="Nội dung công khai">
            <Paragraph>Nội dung này hiển thị cho tất cả người dùng đã đăng nhập.</Paragraph>
          </Card>

          <Divider />

          {/* Action Buttons */}
          <Space>
            <Button type="primary" danger onClick={logout}>
              Đăng xuất
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default RoleBasedExample;
