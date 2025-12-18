// src/pages/settings/notification/ChannelConfigSection.tsx
import React from 'react';
import { Card, Typography, Space, Row, Col } from 'antd';
import { SendOutlined, MailOutlined, MessageOutlined, BellOutlined } from '@ant-design/icons';
import StyledSwitch from '@components/common/StyledSwitch';
import { NotificationChannel } from './types';

const { Title, Text } = Typography;

interface Props {
  channels: NotificationChannel;
  onChange: (channels: NotificationChannel) => void;
}

const ChannelConfigSection: React.FC<Props> = ({ channels, onChange }) => {
  const toggle = (key: keyof NotificationChannel) => {
    onChange({ ...channels, [key]: !channels[key] });
  };

  const channelConfig = [
    { key: 'email' as const, label: 'Email', icon: <MailOutlined /> },
    { key: 'sms' as const, label: 'SMS', icon: <MessageOutlined /> },
    { key: 'push' as const, label: 'Thông báo hệ thống', icon: <BellOutlined /> },
  ];

  return (
    <div>
      <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          <SendOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Kênh gửi thông báo
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Chọn kênh sẽ được dùng để gửi thông báo hệ thống.
        </Text>
      </Space>

      <Row gutter={[16, 16]}>
        {channelConfig.map(({ key, label, icon }) => (
          <Col xs={24} sm={12} lg={8} key={key}>
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
                <Space>
                  <span style={{ color: '#1890ff', fontSize: '16px' }}>{icon}</span>
                  <Text strong style={{ fontSize: '14px', color: '#1e293b' }}>
                    {label}
                  </Text>
                </Space>
                <StyledSwitch checked={channels[key]} onChange={() => toggle(key)} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ChannelConfigSection;
