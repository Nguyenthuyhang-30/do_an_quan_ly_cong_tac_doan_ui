// src/pages/settings/security/SecuritySettingsPage.tsx
import React, { useState } from 'react';
import { Card, Button, Typography, Space, notification } from 'antd';
import { SaveOutlined, SafetyOutlined } from '@ant-design/icons';
import { SecuritySettings } from './types';
import { DEFAULT_SECURITY_SETTINGS } from './mockData';
import TwoFactorSection from './TwoFactorSection';
import LoginLimitSection from './LoginLimitSection';
import AccessLogTable from './AccessLogTable';

const { Title, Text } = Typography;

const SecuritySettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SecuritySettings>(DEFAULT_SECURITY_SETTINGS);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof SecuritySettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // TODO: Gọi API lưu cấu hình bảo mật
      await new Promise((resolve) => setTimeout(resolve, 500));
      notification.success({
        message: 'Thành công',
        description: 'Đã lưu cấu hình bảo mật thành công!',
        placement: 'topRight',
        duration: 3,
      });
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể lưu cấu hình. Vui lòng thử lại.',
        placement: 'topRight',
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
          <Title level={2} style={{ marginBottom: '8px' }}>
            <SafetyOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            Cài đặt bảo mật
          </Title>
          <Text type="secondary">
          Quản lý các tùy chọn bảo mật hệ thống: đăng nhập 2 lớp, giới hạn lỗi và nhật ký truy cập.
          </Text>
      </div>

        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <TwoFactorSection
          enabled={settings.twoFactorEnabled}
          onChange={(val) => handleChange('twoFactorEnabled', val)}
        />

        <LoginLimitSection
          maxAttempts={settings.maxFailedAttempts}
          onChange={(val) => handleChange('maxFailedAttempts', val)}
        />

        <AccessLogTable logs={settings.logs} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <Button
                type="primary"
                icon={<SaveOutlined />}
            onClick={handleSave}
                loading={loading}
                size="large"
                style={{
                  background:
                    'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  height: '40px',
                  padding: '0 24px',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(21, 26, 166, 0.25)',
                }}
              >
                Lưu cài đặt
              </Button>
        </div>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default SecuritySettingsPage;
