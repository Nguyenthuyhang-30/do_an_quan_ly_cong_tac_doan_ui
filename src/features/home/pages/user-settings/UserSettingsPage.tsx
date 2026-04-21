import React, { useState } from 'react';
import { Card, Switch, Space, Typography, Row, Col, Button, Divider, Form, Input, Alert } from 'antd';
import {
  SettingOutlined,
  BellOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { notification } from 'antd';
import { useAuth } from '@hooks/useAuth';
import memberService from '@services/api/member.service';
import accountService from '@services/api/account.service';
import authService from '@services/api/auth.service';
import notificationService from '@utils/notification';
import './UserSettingsPage.scss';

const { Title, Text } = Typography;

const UserSettingsPage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [emailNotification, setEmailNotification] = useState(true);
  const [activityNotification, setActivityNotification] = useState(true);
  const [systemNotification, setSystemNotification] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  if (!user) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Text type="secondary">Vui lòng đăng nhập để chỉnh sửa cài đặt</Text>
      </div>
    );
  }

  const handleSaveBasic = async (values: { fullName: string; email: string }) => {
    if (!user?.id) return;

    setLoading(true);
    try {
      await memberService.updateProfile(user.id, {
        fullName: values.fullName,
      });
      
      const updatedUser = {
        ...user,
        fullName: values.fullName,
      };
      authService.setUser(updatedUser);
      refreshUser();
      
      form.resetFields();
      
      notificationService.success({
        message: 'Thành công',
        description: 'Cập nhật thông tin thành công!',
      });
    } catch (error) {
      notificationService.error({
        message: 'Lỗi',
        description: 'Không thể cập nhật thông tin. Vui lòng thử lại.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSecurity = async (values: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    if (values.newPassword !== values.confirmPassword) {
      notificationService.error({
        message: 'Lỗi',
        description: 'Mật khẩu mới không khớp!',
      });
      return;
    }

    setPasswordLoading(true);
    try {
      await accountService.changePassword({
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      
      passwordForm.resetFields();
      notificationService.success({
        message: 'Thành công',
        description: 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại.',
      });
      
      setTimeout(() => {
        authService.logout();
        window.location.href = '/auth/login';
      }, 1500);
    } catch (error: any) {
      const errorMessage = error?.message || 'Không thể đổi mật khẩu. Vui lòng thử lại.';
      
      notificationService.error({
        message: 'Lỗi đổi mật khẩu',
        description: errorMessage,
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSaveNotification = async () => {
    setNotificationLoading(true);
    
    try {
      const notificationSettings = {
        emailNotification,
        activityNotification,
        systemNotification,
      };
      
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
      
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể lưu cài đặt. Vui lòng thử lại.',
        placement: 'topRight',
        duration: 3,
      });
    } finally {
      setNotificationLoading(false);
    }
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
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSaveBasic}
              initialValues={{ fullName: user.fullName, email: user.email }}
            >
              <Form.Item
                label={
                  <Space>
                    <UserOutlined />
                    <span>Họ và tên</span>
                  </Space>
                }
                name="fullName"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
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
                <Input placeholder="Email không thể thay đổi" disabled />
              </Form.Item>

              <Space style={{ marginTop: 8 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
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
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handleSaveSecurity}
            >
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
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                ]}
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
                  loading={passwordLoading}
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

              {showSuccessAlert && (
                <Alert
                  message="Thành công"
                  description="Cài đặt thông báo đã được lưu!"
                  type="success"
                  showIcon
                />
              )}

              <Button
                type="primary"
                onClick={handleSaveNotification}
                loading={notificationLoading}
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
