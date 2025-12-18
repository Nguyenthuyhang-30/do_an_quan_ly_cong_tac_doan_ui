// src/pages/settings/general/UploadSection.tsx
import React, { useRef } from 'react';
import { Typography, Space, Row, Col, Button, Avatar } from 'antd';
import { UploadOutlined, PictureOutlined } from '@ant-design/icons';
import { OrganizationSettings } from './types';
import ColorPicker from './ColorPicker';

const { Title, Text } = Typography;

interface Props {
  settings: OrganizationSettings;
  onChange: (key: keyof OrganizationSettings, value: any) => void;
}

const UploadSection: React.FC<Props> = ({ settings, onChange }) => {
  const logoInput = useRef<HTMLInputElement>(null);
  const faviconInput = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File, key: keyof OrganizationSettings) => {
    const url = URL.createObjectURL(file);
    onChange(key, url);
  };

  return (
    <div>
      <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          <PictureOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Giao diện & Logo
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Tải lên logo, favicon và chọn màu chủ đạo cho hệ thống.
        </Text>
      </Space>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Space direction="vertical" size="middle">
            <Text strong style={{ fontSize: '14px' }}>
              Logo
            </Text>
            <Space size="middle">
              <Avatar
                src={settings.logoUrl}
                shape="square"
                size={64}
                icon={<PictureOutlined />}
                style={{ border: '1px solid #e8e8e8', borderRadius: '8px' }}
              />
              <div>
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => logoInput.current?.click()}
                  style={{ borderRadius: '8px' }}
                >
                  Tải logo mới
                </Button>
                <input
                  ref={logoInput}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files && handleUpload(e.target.files[0], 'logoUrl')}
                />
              </div>
            </Space>
          </Space>
        </Col>

        <Col xs={24} md={12}>
          <Space direction="vertical" size="middle">
            <Text strong style={{ fontSize: '14px' }}>
              Favicon
            </Text>
            <Space size="middle">
              <Avatar
                src={settings.faviconUrl}
                shape="square"
                size={48}
                icon={<PictureOutlined />}
                style={{ border: '1px solid #e8e8e8', borderRadius: '8px' }}
              />
              <div>
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => faviconInput.current?.click()}
                  style={{ borderRadius: '8px' }}
                >
                  Tải favicon mới
                </Button>
                <input
                  ref={faviconInput}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files && handleUpload(e.target.files[0], 'faviconUrl')}
                />
              </div>
            </Space>
          </Space>
        </Col>
      </Row>

      <div style={{ marginTop: '24px' }}>
        <ColorPicker color={settings.primaryColor} onChange={(c) => onChange('primaryColor', c)} />
      </div>
    </div>
  );
};

export default UploadSection;
