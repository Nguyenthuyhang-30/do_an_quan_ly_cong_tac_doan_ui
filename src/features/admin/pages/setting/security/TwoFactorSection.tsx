// src/pages/settings/security/TwoFactorSection.tsx
import React from 'react';
import { Card, Typography, Space } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import StyledSwitch from '@components/common/StyledSwitch';

const { Title, Text } = Typography;

interface Props {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const TwoFactorSection: React.FC<Props> = ({ enabled, onChange }) => {
  return (
    <div>
      <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          <SafetyCertificateOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Đăng nhập hai lớp (2FA)
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
        Khi bật, người dùng phải xác thực thêm mã OTP qua email hoặc ứng dụng bảo mật khi đăng nhập.
        </Text>
      </Space>

      <Card
        hoverable
        style={{
          borderRadius: '12px',
          border: '1px solid #e8e8e8',
          transition: 'all 0.3s ease',
        }}
        bodyStyle={{ padding: '16px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong style={{ fontSize: '14px', color: '#1e293b' }}>
            Bật đăng nhập 2 lớp
          </Text>
          <StyledSwitch checked={enabled} onChange={onChange} />
      </div>
      </Card>
    </div>
  );
};

export default TwoFactorSection;
