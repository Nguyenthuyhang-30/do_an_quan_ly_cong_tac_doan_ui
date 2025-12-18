// src/pages/settings/notification/NotificationSettingsPage.tsx
import React, { useState } from 'react';
import { Card, Button, Typography, Space, message } from 'antd';
import { SaveOutlined, BellOutlined } from '@ant-design/icons';
import { NotificationSettings } from './types';
import { DEFAULT_NOTIFICATION_SETTINGS } from './mockData';
import ChannelConfigSection from './ChannelConfigSection';
import TemplateManager from './TemplateManager';
import TestNotificationSection from './TestNotificationSection';
import AutoSendToggle from './AutoSendToggle';

const { Title, Text } = Typography;

const NotificationSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_NOTIFICATION_SETTINGS);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof NotificationSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // TODO: Gọi API lưu cấu hình thông báo
      await new Promise((resolve) => setTimeout(resolve, 500));
      message.success('Đã lưu cấu hình thông báo thành công');
    } catch (error) {
      message.error('Không thể lưu cấu hình. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
          <Title level={2} style={{ marginBottom: '8px' }}>
            <BellOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            Cài đặt thông báo
          </Title>
          <Text type="secondary">
            Cấu hình kênh gửi, mẫu thông báo và tùy chọn gửi tự động.
          </Text>
      </div>

        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <ChannelConfigSection
          channels={settings.channels}
          onChange={(val) => handleChange('channels', val)}
        />

        <TemplateManager
          templates={settings.templates}
          onChange={(val) => handleChange('templates', val)}
        />

        <TestNotificationSection />

        <AutoSendToggle
          enabled={settings.autoSendEnabled}
          onChange={(val) => handleChange('autoSendEnabled', val)}
        />

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

export default NotificationSettingsPage;
