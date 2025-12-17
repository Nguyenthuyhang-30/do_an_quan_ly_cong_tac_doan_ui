// src/pages/settings/general/LanguageSelector.tsx
import React from 'react';
import { Typography, Space, Radio } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import '../../activity/styles/RadioGroup.scss';

const { Title, Text } = Typography;

interface Props {
  language: 'vi' | 'en';
  onChange: (lang: 'vi' | 'en') => void;
}

const LanguageSelector: React.FC<Props> = ({ language, onChange }) => {
  return (
    <div style={{ paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
      <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          <GlobalOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Ngôn ngữ
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Chọn ngôn ngữ hiển thị cho hệ thống.
        </Text>
      </Space>

      <Radio.Group
        value={language}
        onChange={(e) => onChange(e.target.value)}
        className="activity-radio-group"
      >
        <Radio value="vi">Tiếng Việt</Radio>
        <Radio value="en">English</Radio>
      </Radio.Group>
    </div>
  );
};

export default LanguageSelector;
