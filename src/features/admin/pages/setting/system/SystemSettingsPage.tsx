// src/pages/settings/system/SystemSettingsPage.tsx
import React, { useState } from 'react';
import { Card, Button, Typography, Space, message } from 'antd';
import { SaveOutlined, ToolOutlined } from '@ant-design/icons';
import { SystemSettings } from './types';
import { DEFAULT_SYSTEM_SETTINGS } from './mockData';
import ApiConfigSection from './ApiConfigSection';
import ModuleToggleSection from './ModuleToggleSection';

const { Title, Text } = Typography;

const SystemSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings>(DEFAULT_SYSTEM_SETTINGS);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof SystemSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // TODO: Gọi API lưu cấu hình hệ thống
      await new Promise((resolve) => setTimeout(resolve, 500));
      message.success('Đã lưu cấu hình hệ thống thành công');
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
            <ToolOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            Cài đặt hệ thống
          </Title>
          <Text type="secondary">
            Quản lý cấu hình API và bật/tắt các module của hệ thống.
          </Text>
      </div>

        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <ApiConfigSection api={settings.api} onChange={(api) => handleChange('api', api)} />

        <ModuleToggleSection
          modules={settings.modules}
          onChange={(modules) => handleChange('modules', modules)}
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
                Lưu cấu hình
              </Button>
        </div>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default SystemSettingsPage;
