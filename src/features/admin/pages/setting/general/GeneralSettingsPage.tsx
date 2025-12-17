// src/pages/settings/general/GeneralSettingsPage.tsx
import React, { useState } from 'react';
import { Card, Button, Typography, Space, message } from 'antd';
import { SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { OrganizationSettings } from './types';
import { DEFAULT_SETTINGS } from './mockData';
import OrganizationInfoForm from './OrganizationInfoForm';
import UploadSection from './UploadSection';
import LanguageSelector from './LanguageSelector';

const { Title, Text } = Typography;

const GeneralSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<OrganizationSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof OrganizationSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // TODO: Gọi API lưu cấu hình
      await new Promise((resolve) => setTimeout(resolve, 500));
      message.success('Đã lưu cấu hình thành công');
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
            <SettingOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            Cài đặt chung
          </Title>
          <Text type="secondary">
          Thay đổi thông tin tổ chức, logo, màu sắc và ngôn ngữ hệ thống.
          </Text>
      </div>

        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <OrganizationInfoForm settings={settings} onChange={handleChange} />
        <UploadSection settings={settings} onChange={handleChange} />
        <LanguageSelector
          language={settings.language}
          onChange={(lang) => handleChange('language', lang)}
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
                Lưu thay đổi
              </Button>
        </div>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default GeneralSettingsPage;
