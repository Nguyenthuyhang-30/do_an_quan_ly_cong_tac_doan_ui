// src/pages/settings/notification/TestNotificationSection.tsx
import React, { useState } from 'react';
import { Card, Typography, Space, Input, Button, Alert } from 'antd';
import { ExperimentOutlined, SendOutlined } from '@ant-design/icons';
import { message } from 'antd';

const { Title, Text } = Typography;

const TestNotificationSection: React.FC = () => {
  const [receiver, setReceiver] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSend = async () => {
    if (!receiver.trim()) {
      message.warning('Vui lòng nhập email hoặc số điện thoại');
      return;
    }

    try {
      setLoading(true);
      // TODO: Gọi API gửi thông báo thử
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResult(`Đã gửi thông báo thử tới: ${receiver}`);
      message.success('Đã gửi thông báo thử thành công');
    } catch (error) {
      message.error('Không thể gửi thông báo thử. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          <ExperimentOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Gửi thử thông báo
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Nhập địa chỉ email hoặc số điện thoại để kiểm tra gửi thông báo.
        </Text>
      </Space>

      <Card
        style={{
          borderRadius: '12px',
          border: '1px solid #e8e8e8',
        }}
        bodyStyle={{ padding: '16px' }}
      >
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Nhập email hoặc số điện thoại..."
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            onPressEnter={handleSend}
            style={{ borderRadius: '8px 0 0 8px' }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            loading={loading}
            style={{
              background:
                'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
              border: 'none',
              borderRadius: '0 8px 8px 0',
            }}
          >
            Gửi thử
          </Button>
        </Space.Compact>

        {result && (
          <Alert
            message={result}
            type="success"
            showIcon
            style={{ marginTop: '16px', borderRadius: '8px' }}
            closable
            onClose={() => setResult(null)}
          />
        )}
      </Card>
    </div>
  );
};

export default TestNotificationSection;
