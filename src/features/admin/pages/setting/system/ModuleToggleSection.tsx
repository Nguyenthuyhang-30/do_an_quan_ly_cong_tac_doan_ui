// src/pages/settings/system/ModuleToggleSection.tsx
import React from 'react';
import { Card, Typography, Space, Row, Col } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import StyledSwitch from '@components/common/StyledSwitch';
import { ModuleToggle } from './types';

const { Title, Text } = Typography;

interface Props {
  modules: ModuleToggle;
  onChange: (modules: ModuleToggle) => void;
}

const ModuleToggleSection: React.FC<Props> = ({ modules, onChange }) => {
  const handleToggle = (key: keyof ModuleToggle) => {
    onChange({ ...modules, [key]: !modules[key] });
  };

  const moduleLabels: Record<keyof ModuleToggle, string> = {
    news: 'Tin tức',
    activities: 'Hoạt động',
    achievements: 'Điểm rèn luyện',
    feedback: 'Phản hồi / Góp ý',
  };

  return (
    <div>
      <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          <AppstoreOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Module hệ thống
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
        Bật hoặc tắt các chức năng tùy theo nhu cầu sử dụng.
        </Text>
      </Space>

      <Row gutter={[16, 16]}>
        {Object.entries(modules).map(([key, value]) => (
          <Col xs={24} sm={12} key={key}>
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
                  {moduleLabels[key as keyof ModuleToggle]}
                </Text>
                <StyledSwitch
              checked={value}
              onChange={() => handleToggle(key as keyof ModuleToggle)}
            />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ModuleToggleSection;
