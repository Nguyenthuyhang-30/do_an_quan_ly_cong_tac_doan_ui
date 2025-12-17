// src/pages/settings/system/ApiConfigSection.tsx
import React from 'react';
import { Typography, Space, Row, Col, Form, Input } from 'antd';
import { ApiOutlined } from '@ant-design/icons';
import { ApiConfig } from './types';

const { Title, Text } = Typography;

interface Props {
  api: ApiConfig;
  onChange: (api: ApiConfig) => void;
}

const ApiConfigSection: React.FC<Props> = ({ api, onChange }) => {
  const handleChange = (key: keyof ApiConfig, value: string) => {
    onChange({ ...api, [key]: value });
  };

  return (
    <div>
      <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          <ApiOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Cấu hình API Backend
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Cấu hình URL và phiên bản API của hệ thống.
        </Text>
      </Space>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="URL API" style={{ marginBottom: 0 }}>
            <Input
              value={api.baseUrl}
              onChange={(e) => handleChange('baseUrl', e.target.value)}
              placeholder="https://api.doan-truong.edu.vn"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Phiên bản API" style={{ marginBottom: 0 }}>
            <Input
              value={api.version}
              onChange={(e) => handleChange('version', e.target.value)}
              placeholder="v1"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default ApiConfigSection;
