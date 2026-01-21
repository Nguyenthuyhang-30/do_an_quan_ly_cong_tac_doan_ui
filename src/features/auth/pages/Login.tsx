import {
  BarChartOutlined,
  CheckCircleOutlined,
  LockOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import { Button, Checkbox, Col, Form, Input, Row, Tabs, Carousel } from 'antd';
import React, { useEffect, useState } from 'react';
import { RiAdminFill } from 'react-icons/ri';
import ImageWithFallback from '@components/common/ImageWithFallback';
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
        navigate({ to: '/admin/dashboard/overview' });
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
              <div className="abstract-shapes">
                <div className="shape-gradient shape-gradient-1"></div>
                <div className="shape-gradient shape-gradient-2"></div>
                <div className="shape-gradient shape-gradient-3"></div>
              </div>

              <h2 className="illustration-title">Đoàn thanh niên</h2>
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
              <div className="logo-container">
                <Carousel autoplay autoplaySpeed={3000} effect="fade" dots={false}>
                  <div key="doan-logo">
                    <div className="logo-slide">
                      <ImageWithFallback
                        src="/logos/doan_logo.png"
                        alt="Đoàn Thanh niên Logo"
                        className="logo-image"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                  <div key="dainam-logo">
                    <div className="logo-slide">
                      <ImageWithFallback
                        src="/logos/dainam_logo.png"
                        alt="Đại Nam University Logo"
                        className="logo-image"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                </Carousel>
              </div>
              <h1 className="main-title">Hệ thống quản lý công tác Đoàn</h1>
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
              <p className="copyright">2025 Liên chi đoàn khoa CNTT - Đoàn TNCS Hồ Chí Minh</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
