// src/pages/settings/general/OrganizationInfoForm.tsx
import React from 'react';
import { Typography, Space, Row, Col, Form, Input } from 'antd';
import { BankOutlined } from '@ant-design/icons';
import { OrganizationSettings } from './types';

const { Title, Text } = Typography;

interface Props {
  settings: OrganizationSettings;
  onChange: (key: keyof OrganizationSettings, value: any) => void;
}

const OrganizationInfoForm: React.FC<Props> = ({ settings, onChange }) => (
  <div>
    <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
      <Title level={4} style={{ margin: 0 }}>
        <BankOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
        Thông tin tổ chức
      </Title>
      <Text type="secondary" style={{ fontSize: '14px' }}>
        Cập nhật thông tin về trường và tổ chức Đoàn.
      </Text>
    </Space>

    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item label="Tên trường" style={{ marginBottom: 16 }}>
          <Input
            value={settings.schoolName}
            onChange={(e) => onChange('schoolName', e.target.value)}
            placeholder="Nhập tên trường"
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item label="Liên chi đoàn" style={{ marginBottom: 16 }}>
          <Input
            value={settings.unionName}
            onChange={(e) => onChange('unionName', e.target.value)}
            placeholder="Nhập tên liên chi đoàn"
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>
      </Col>

      <Col xs={24}>
        <Form.Item label="Khẩu hiệu" style={{ marginBottom: 0 }}>
          <Input
            value={settings.slogan}
            onChange={(e) => onChange('slogan', e.target.value)}
            placeholder="Nhập khẩu hiệu"
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>
      </Col>
    </Row>
  </div>
);

export default OrganizationInfoForm;
