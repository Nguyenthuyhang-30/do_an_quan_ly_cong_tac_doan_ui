import React, { useState } from 'react';
import { Card, Space, Button, Divider, Typography, Tag, Alert } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import { notificationService } from '../../utils/notification';
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

/**
 * AuthDemo Component
 * Demo component để test authentication system
 */
const AuthDemo: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [testing, setTesting] = useState(false);

  const testNotifications = () => {
    setTesting(true);

    // Success
    notificationService.success({
      message: 'Test Success!',
      description: 'This is a success notification.',
    });

    // Info after 1s
    setTimeout(() => {
      notificationService.info({
        message: 'Test Info',
        description: 'This is an info notification.',
      });
    }, 1000);

    // Warning after 2s
    setTimeout(() => {
      notificationService.warning({
        message: 'Test Warning',
        description: 'This is a warning notification.',
      });
    }, 2000);

    // Error after 3s
    setTimeout(() => {
      notificationService.error({
        message: 'Test Error',
        description: 'This is an error notification.',
      });
      setTesting(false);
    }, 3000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2}>🔐 Authentication System Demo</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Auth Status Card */}
        <Card
          title="Authentication Status"
          extra={
            isAuthenticated ? (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Authenticated
              </Tag>
            ) : (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Not Authenticated
              </Tag>
            )
          }
        >
          {isLoading ? (
            <Alert message="Loading..." type="info" showIcon />
          ) : isAuthenticated && user ? (
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>User ID:</Text> <Text>{user.id}</Text>
              </div>
              <div>
                <Text strong>Full Name:</Text> <Text>{user.fullName}</Text>
              </div>
              <div>
                <Text strong>Email:</Text> <Text>{user.email}</Text>
              </div>
              <div>
                <Text strong>Username:</Text> <Text>{user.username || 'N/A'}</Text>
              </div>
              <div>
                <Text strong>Role:</Text> <Tag color="blue">{user.role || 'user'}</Tag>
              </div>
              <Divider />
              <Button danger icon={<LogoutOutlined />} onClick={logout} size="large">
                Logout
              </Button>
            </Space>
          ) : (
            <Space direction="vertical" style={{ width: '100%' }}>
              <Paragraph>
                You are not logged in. Please login to access protected features.
              </Paragraph>
              <Button type="primary" icon={<LoginOutlined />} size="large" href="/auth/login">
                Go to Login
              </Button>
            </Space>
          )}
        </Card>

        {/* Notification Test Card */}
        <Card title="Notification System Test">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Paragraph>
              Test the notification system by clicking the button below. It will show 4 different
              types of notifications in sequence.
            </Paragraph>
            <Button type="primary" onClick={testNotifications} loading={testing} size="large">
              Test Notifications
            </Button>

            <Divider />

            <Text strong>Manual Tests:</Text>
            <Space wrap>
              <Button
                onClick={() =>
                  notificationService.success({
                    message: 'Success!',
                    description: 'Operation completed successfully.',
                  })
                }
              >
                Success
              </Button>
              <Button
                onClick={() =>
                  notificationService.info({
                    message: 'Information',
                    description: 'Here is some information.',
                  })
                }
              >
                Info
              </Button>
              <Button
                onClick={() =>
                  notificationService.warning({
                    message: 'Warning!',
                    description: 'Please be careful.',
                  })
                }
              >
                Warning
              </Button>
              <Button
                danger
                onClick={() =>
                  notificationService.error({
                    message: 'Error!',
                    description: 'Something went wrong.',
                  })
                }
              >
                Error
              </Button>
            </Space>
          </Space>
        </Card>

        {/* Components Demo Card */}
        <Card title="UI Components Demo">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Header Auth Component:</Text>
              <Paragraph type="secondary">
                Integrated in your header. Shows UserMenu if logged in, LoginButton if not.
              </Paragraph>
            </div>

            <div>
              <Text strong>Protected Route:</Text>
              <Paragraph type="secondary">
                Wrap any component with ProtectedRoute to require authentication.
              </Paragraph>
              <pre
                style={{
                  background: '#f5f5f5',
                  padding: '12px',
                  borderRadius: '4px',
                  overflow: 'auto',
                }}
              >
                {`<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>`}
              </pre>
            </div>

            <div>
              <Text strong>useAuth Hook:</Text>
              <Paragraph type="secondary">
                Access auth state and functions in any component.
              </Paragraph>
              <pre
                style={{
                  background: '#f5f5f5',
                  padding: '12px',
                  borderRadius: '4px',
                  overflow: 'auto',
                }}
              >
                {`const { user, isAuthenticated, logout } = useAuth();`}
              </pre>
            </div>
          </Space>
        </Card>

        {/* Info Card */}
        <Card>
          <Alert
            message="Documentation Available"
            description={
              <div>
                <Paragraph>Full documentation available at:</Paragraph>
                <ul>
                  <li>
                    <code>docs/AUTH_QUICK_START.md</code> - Quick start guide
                  </li>
                  <li>
                    <code>docs/AUTHENTICATION_SYSTEM.md</code> - Complete documentation
                  </li>
                </ul>
              </div>
            }
            type="info"
            showIcon
            icon={<UserOutlined />}
          />
        </Card>
      </Space>
    </div>
  );
};

export default AuthDemo;
