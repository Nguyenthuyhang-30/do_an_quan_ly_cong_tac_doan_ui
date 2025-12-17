// src/pages/settings/notification/AutoSendToggle.tsx
import React from 'react';
import { Card, Typography, Space } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import StyledSwitch from '@components/common/StyledSwitch';

const { Title, Text } = Typography;

interface Props {
  enabled: boolean;
  onChange: (val: boolean) => void;
}

const AutoSendToggle: React.FC<Props> = ({ enabled, onChange }) => {
  return (
    <div>
      <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          <ThunderboltOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Gửi tự động
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
        Khi bật, hệ thống sẽ tự động gửi thông báo khi có hoạt động hoặc tin tức mới.
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
            Gửi tự động khi có hoạt động mới
          </Text>
          <StyledSwitch checked={enabled} onChange={onChange} />
      </div>
      </Card>
    </div>
  );
};

export default AutoSendToggle;
