import {
  BarChartOutlined,
  CheckCircleOutlined,
  IdcardOutlined,
  LockOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import { Button, Checkbox, Col, Form, Input, Row, Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import { RiAdminFill } from 'react-icons/ri';
import { useAuth } from '../../../hooks/useAuth';
import notificationService from '../../../utils/notification';
import './Login.scss';

type UserType = 'member' | 'officer' | 'admin';

interface LoginFormData {
  username?: string;
  studentId?: string;
  email?: string;
  password?: string;
  remember?: boolean;
}

export const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserType>('officer');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/' });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (values: LoginFormData, userType: UserType) => {
    setLoading(true);

    try {
      // For member type, we'll use student ID as email for now
      // You can modify this logic based on your backend requirements
      const email = values.email || values.username || `${values.studentId}@student.com`;
      const password = values.password || values.studentId || '';

      await login(email, password);

      // Navigate to appropriate page based on user role or type
      if (userType === 'admin') {
        navigate({ to: '/admin' });
      } else {
        navigate({ to: '/' });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Đăng nhập thất bại. Vui lòng thử lại!';

      notificationService.error({
        message: 'Đăng nhập thất bại',
        description: errorMessage,
      });

      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMemberForm = () => (
    <Form
      name="member-login"
      onFinish={(values) => handleLogin(values, 'member')}
      layout="vertical"
      size="large"
      className="login-form"
    >
      <Form.Item
        label="Mã sinh viên"
        name="studentId"
        hasFeedback
        rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên!' }]}
      >
        <Input
          prefix={<IdcardOutlined className="site-form-item-icon" />}
          placeholder="Nhập mã sinh viên của bạn"
          className="modern-input"
        />
      </Form.Item>

      <div className="info-box">
        <CheckCircleOutlined className="info-icon" />
        <span>Đoàn viên chỉ cần nhập mã sinh viên để đăng nhập</span>
      </div>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-button primary-btn"
          loading={loading}
          block
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );

  const renderOfficerForm = () => (
    <Form
      name="officer-login"
      onFinish={(values) => handleLogin(values, 'officer')}
      layout="vertical"
      size="large"
      className="login-form"
    >
      <Form.Item
        label="Email"
        name="email"
        hasFeedback
        rules={[
          { required: true, message: 'Vui lòng nhập email!' },
          { type: 'email', message: 'Email không hợp lệ!' },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nhập email của bạn"
          className="modern-input"
          autoComplete="username"
        />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Nhập mật khẩu"
          className="modern-input"
          autoComplete="current-password"
        />
      </Form.Item>

      <Form.Item>
        <div className="form-options">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="remember-checkbox">Lưu mật khẩu</Checkbox>
          </Form.Item>
          <button
            type="button"
            className="forgot-password"
            onClick={() => notificationService.info({ message: 'Tính năng đang phát triển' })}
          >
            Quên mật khẩu?
          </button>
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-button primary-btn"
          loading={loading}
          block
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );

  const renderAdminForm = () => (
    <Form
      name="admin-login"
      onFinish={(values) => handleLogin(values, 'admin')}
      layout="vertical"
      size="large"
      className="login-form"
    >
      <Form.Item
        label="Email Admin"
        name="email"
        hasFeedback
        rules={[
          { required: true, message: 'Vui lòng nhập email admin!' },
          { type: 'email', message: 'Email không hợp lệ!' },
        ]}
      >
        <Input
          prefix={<RiAdminFill className="site-form-item-icon" />}
          placeholder="Nhập email admin"
          className="modern-input"
          autoComplete="username"
        />
      </Form.Item>

      <Form.Item
        label="Mật khẩu Admin"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu admin!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Nhập mật khẩu admin"
          className="modern-input"
          autoComplete="current-password"
        />
      </Form.Item>

      <Form.Item>
        <div className="form-options">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="remember-checkbox">Lưu mật khẩu</Checkbox>
          </Form.Item>
          <button
            type="button"
            className="forgot-password admin-link"
            onClick={() => notificationService.info({ message: 'Tính năng đang phát triển' })}
          >
            Quên mật khẩu?
          </button>
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-button admin-btn"
          loading={loading}
          block
        >
          Đăng nhập Admin
        </Button>
      </Form.Item>
    </Form>
  );

  const tabItems = [
    {
      key: 'member',
      label: 'Đoàn viên',
      children: renderMemberForm(),
    },
    {
      key: 'officer',
      label: 'Cán bộ Đoàn',
      children: renderOfficerForm(),
    },
    {
      key: 'admin',
      label: 'Admin',
      children: renderAdminForm(),
    },
  ];

  return (
    <div className="login-container">
      <Row className="login-row">
        <Col xs={0} md={12} className="illustration-section">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>

          <div className="volunteer-illustration">
            <div className="illustration-content">
              <svg
                className="main-illustration"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="rgba(255,255,255,0.1)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
              </svg>

              <h2 className="illustration-title">Đoàn Thanh niên</h2>
              <p className="illustration-subtitle">
                Nơi kết nối và phát triển tài năng trẻ, xây dựng tương lai công nghệ thông tin
              </p>

              <div className="features-list">
                <div className="feature-item">
                  <CheckCircleOutlined className="feature-icon green" />
                  <span>Quản lý hoạt động đoàn hiệu quả</span>
                </div>
                <div className="feature-item">
                  <TeamOutlined className="feature-icon orange" />
                  <span>Kết nối đoàn viên toàn khoa</span>
                </div>
                <div className="feature-item">
                  <BarChartOutlined className="feature-icon yellow" />
                  <span>Theo dõi tiến độ công tác</span>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} md={12} className="form-section">
          <div className="form-container">
            <div className="header-section">
              <div className="logo-container flex w-full justify-center">
                <img
                  src="/logos/doan_logo.png"
                  alt="Youth Logo"
                  loading="lazy"
                  width={84}
                  height={84}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h1 className="main-title">Quản lý công tác đoàn</h1>
              <p className="subtitle">Khoa CNTT trường Đại học Đại Nam</p>
              <div className="divider"></div>
            </div>

            <div className="tabs-container">
              <Tabs
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key as UserType)}
                items={tabItems}
                centered
                className="login-tabs"
              />
            </div>

            <div className="footer-section">
              <button onClick={() => navigate({ to: '/' })} className="back-home" type="button">
                <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Trở về trang chủ
              </button>
              <p className="copyright">© 2024 Khoa Công nghệ Thông tin - Đoàn TNCS Hồ Chí Minh</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
