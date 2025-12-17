import React from 'react';
import {
  Card,
  Descriptions,
  Avatar,
  Space,
  Typography,
  Tag,
  Row,
  Col,
  Divider,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useAuth } from '@hooks/useAuth';
import './ProfilePage.scss';

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Text type="secondary">Vui lòng đăng nhập để xem thông tin cá nhân</Text>
      </div>
    );
  }

  const primaryRole = user.roles && user.roles.length > 0 ? user.roles[0] : null;

  const avatarContent = user.avatar ? (
    <Avatar src={user.avatar} size={120} />
  ) : (
    <Avatar
      style={{ background: 'blueviolet', fontSize: '48px' }}
      size={120}
      icon={<UserOutlined />}
    >
      {(user.fullName || 'U')[0].toUpperCase()}
    </Avatar>
  );

  return (
    <div className="profile-page">
      <Title level={2} style={{ marginBottom: '24px' }}>
        Thông tin cá nhân
      </Title>

      <Row gutter={[24, 24]}>
        {/* Avatar và thông tin cơ bản */}
        <Col xs={24} lg={8}>
          <Card
            className="profile-avatar-card"
            style={{
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
            }}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {avatarContent}
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {user.fullName}
                </Title>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  {user.email}
                </Text>
              </div>
              {primaryRole && (
                <Tag color="blue" style={{ fontSize: '14px', padding: '4px 12px' }}>
                  {primaryRole.roleName}
                </Tag>
              )}
            </Space>
          </Card>
        </Col>

        {/* Thông tin chi tiết */}
        <Col xs={24} lg={16}>
          <Card
            className="profile-info-card"
            title={
              <Space>
                <UserOutlined style={{ color: '#1890ff' }} />
                <span>Thông tin tài khoản</span>
              </Space>
            }
            style={{
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Descriptions column={1} bordered>
              <Descriptions.Item
                label={
                  <Space>
                    <UserOutlined />
                    <span>Họ và tên</span>
                  </Space>
                }
              >
                <Text strong>{user.fullName || 'Chưa có thông tin'}</Text>
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <Space>
                    <MailOutlined />
                    <span>Email</span>
                  </Space>
                }
              >
                <Text>{user.email || 'Chưa có thông tin'}</Text>
              </Descriptions.Item>

              {user.userName && (
                <Descriptions.Item
                  label={
                    <Space>
                      <IdcardOutlined />
                      <span>Tên đăng nhập</span>
                    </Space>
                  }
                >
                  <Text>{user.userName}</Text>
                </Descriptions.Item>
              )}

              {user.username && (
                <Descriptions.Item
                  label={
                    <Space>
                      <IdcardOutlined />
                      <span>Username</span>
                    </Space>
                  }
                >
                  <Text>{user.username}</Text>
                </Descriptions.Item>
              )}

              {user.memberId && (
                <Descriptions.Item
                  label={
                    <Space>
                      <IdcardOutlined />
                      <span>Mã đoàn viên</span>
                    </Space>
                  }
                >
                  <Text>{user.memberId}</Text>
                </Descriptions.Item>
              )}

              {user.roles && user.roles.length > 0 && (
                <Descriptions.Item
                  label={
                    <Space>
                      <TeamOutlined />
                      <span>Vai trò</span>
                    </Space>
                  }
                >
                  <Space wrap>
                    {user.roles.map((role, index) => (
                      <Tag
                        key={index}
                        color={
                          role.roleName === 'Admin'
                            ? 'red'
                            : role.roleName === 'BCH'
                            ? 'orange'
                            : role.roleName === 'Moderator'
                            ? 'blue'
                            : 'green'
                        }
                      >
                        {role.roleName}
                        {role.roleDescription && (
                          <span style={{ marginLeft: '4px', fontSize: '12px' }}>
                            - {role.roleDescription}
                          </span>
                        )}
                      </Tag>
                    ))}
                  </Space>
                </Descriptions.Item>
              )}

              {user.status && (
                <Descriptions.Item
                  label={
                    <Space>
                      <IdcardOutlined />
                      <span>Trạng thái</span>
                    </Space>
                  }
                >
                  <Tag color={user.status === 'active' || user.status === 1 ? 'green' : 'default'}>
                    {user.status === 'active' || user.status === 1 ? 'Hoạt động' : 'Không hoạt động'}
                  </Tag>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;

