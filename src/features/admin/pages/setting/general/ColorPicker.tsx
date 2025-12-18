// src/pages/settings/general/ColorPicker.tsx
import React from 'react';
import { Space, Typography } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Props {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<Props> = ({ color, onChange }) => {
  return (
    <Space direction="vertical" size="small" style={{ width: '100%' }}>
      <Text strong style={{ fontSize: '14px' }}>
        <BgColorsOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
        Màu chủ đạo
      </Text>
      <Space size="middle" align="center">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            cursor: 'pointer',
            border: '2px solid #e8e8e8',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Text style={{ fontSize: '14px', color: '#64748b', fontFamily: 'monospace' }}>
          {color.toUpperCase()}
        </Text>
      </Space>
    </Space>
  );
};

export default ColorPicker;
