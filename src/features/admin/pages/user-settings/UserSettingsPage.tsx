import React, { useState } from 'react';
import { Card, Switch, Space, Typography, Row, Col, Button, Divider, Form, Input } from 'antd';
import {
  SettingOutlined,
  BellOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth } from '@hooks/useAuth';
import './UserSettingsPage.scss';

const { Title, Text } = Typography;

const UserSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [emailNotification, setEmailNotification] = useState(true);
  const [activityNotification, setActivityNotification] = useState(true);
  const [systemNotification, setSystemNotification] = useState(false);

  if (!user) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Text type="secondary">Vui lòng đăng nhập để chỉnh sửa cài đặt</Text>
      </div>
    );
  }

  const handleSaveBasic = () => {
    // TODO: gọi API cập nhật thông tin cơ bản
    // Hiện tại chỉ là UI demo
  };

  const handleSaveSecurity = () => {
    // TODO: gọi API đổi mật khẩu
  };

  const handleSaveNotification = () => {
    // TODO: gọi API lưu cài đặt thông báo
  };

  return (
    <div className="user-settings-page">
      <Title level={2} style={{ marginBottom: 24 }}>
        Cài đặt tài khoản
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Card
            className="settings-card"
            title={
              <Space>
                <SettingOutlined style={{ color: '#1890ff' }} />
                <span>Cài đặt cơ bản</span>
              </Space>
            }
          >
            <Form layout="vertical" onFinish={handleSaveBasic} initialValues={{ fullName: user.fullName, email: user.email }}>
              <Form.Item
                label={
                  <Space>
                    <UserOutlined />
                    <span>Họ và tên</span>
                  </Space>
                }
                name="fullName"
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>

              <Form.Item
                label={
                  <Space>
                    <MailOutlined />
                    <span>Email</span>
                  </Space>
                }
                name="email"
              >
                <Input placeholder="Nhập email" />
              </Form.Item>

              <Space style={{ marginTop: 8 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                    border: 'none',
                    height: 36,
                    padding: '0 16px',
                    borderRadius: 8,
                  }}
                >
                  Lưu thay đổi
                </Button>
              </Space>
            </Form>
          </Card>

          <Divider />

          <Card
            className="settings-card"
            title={
              <Space>
                <LockOutlined style={{ color: '#faad14' }} />
                <span>Bảo mật & mật khẩu</span>
              </Space>
            }
          >
            <Form layout="vertical" onFinish={handleSaveSecurity}>
              <Form.Item
                label="Mật khẩu hiện tại"
                name="currentPassword"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
              >
                <Input.Password placeholder="Nhập mật khẩu hiện tại" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
              >
                <Input.Password placeholder="Nhập mật khẩu mới" />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu mới"
                name="confirmPassword"
                rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu mới' }]}
              >
                <Input.Password placeholder="Nhập lại mật khẩu mới" />
              </Form.Item>

              <Space style={{ marginTop: 8 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                    border: 'none',
                    height: 36,
                    padding: '0 16px',
                    borderRadius: 8,
                  }}
                >
                  Đổi mật khẩu
                </Button>
              </Space>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card
            className="settings-card"
            title={
              <Space>
                <BellOutlined style={{ color: '#52c41a' }} />
                <span>Cài đặt thông báo</span>
              </Space>
            }
          >
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div className="settings-item-row">
                <div>
                  <Text strong>Thông báo email</Text>
                  <br />
                  <Text type="secondary">Nhận email khi có thông báo quan trọng</Text>
                </div>
                <Switch
                  checked={emailNotification}
                  onChange={setEmailNotification}
                />
              </div>

              <div className="settings-item-row">
                <div>
                  <Text strong>Hoạt động Đoàn</Text>
                  <br />
                  <Text type="secondary">Thông báo khi có hoạt động mới hoặc cập nhật</Text>
                </div>
                <Switch
                  checked={activityNotification}
                  onChange={setActivityNotification}
                />
              </div>

              <div className="settings-item-row">
                <div>
                  <Text strong>Thông báo hệ thống</Text>
                  <br />
                  <Text type="secondary">Thông báo về thay đổi, nâng cấp hệ thống</Text>
                </div>
                <Switch
                  checked={systemNotification}
                  onChange={setSystemNotification}
                />
              </div>

              <Button
                type="primary"
                onClick={handleSaveNotification}
                style={{
                  background:
                    'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                  border: 'none',
                  height: 36,
                  padding: '0 16px',
                  borderRadius: 8,
                }}
              >
                Lưu cài đặt thông báo
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserSettingsPage;


