// src/pages/settings/security/LoginLimitSection.tsx
import React from 'react';
import { Card, Typography, Space, InputNumber } from 'antd';
import { StopOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Props {
  maxAttempts: number;
  onChange: (val: number) => void;
}

const LoginLimitSection: React.FC<Props> = ({ maxAttempts, onChange }) => {
  return (
    <div>
      <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          <StopOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Giới hạn đăng nhập sai
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Giới hạn số lần nhập sai mật khẩu trước khi tài khoản bị tạm khóa.
        </Text>
      </Space>

      <Card
        style={{
          borderRadius: '12px',
          border: '1px solid #e8e8e8',
        }}
        bodyStyle={{ padding: '16px' }}
      >
        <Space size="middle" align="center">
          <InputNumber
            min={1}
            max={10}
            value={maxAttempts}
            onChange={(val) => onChange(val || 1)}
            style={{ width: '100px' }}
          />
          <Text style={{ fontSize: '14px', color: '#64748b' }}>
            lần cho phép trước khi khóa
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default LoginLimitSection;
