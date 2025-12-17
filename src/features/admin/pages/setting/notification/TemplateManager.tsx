// src/pages/settings/notification/TemplateManager.tsx
import React, { useState } from 'react';
import { Card, Typography, Space, Button, Input, Form, Divider, List } from 'antd';
import { FileTextOutlined, PlusOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { NotificationTemplate } from './types';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Props {
  templates: NotificationTemplate[];
  onChange: (templates: NotificationTemplate[]) => void;
}

const TemplateManager: React.FC<Props> = ({ templates, onChange }) => {
  const [selected, setSelected] = useState<NotificationTemplate | null>(null);

  const handleAdd = () => {
    const newTemplate: NotificationTemplate = {
      id: Date.now(),
      name: 'Mẫu mới',
      subject: '',
      content: '',
    };
    onChange([...templates, newTemplate]);
    setSelected(newTemplate);
  };

  const handleSave = (updated: NotificationTemplate) => {
    onChange(templates.map((t) => (t.id === updated.id ? updated : t)));
    setSelected(null);
  };

  return (
    <div>
      <Space direction="vertical" size="small" style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          <FileTextOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Mẫu thông báo
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Quản lý nội dung mẫu thông báo cho các loại sự kiện.
        </Text>
      </Space>

      <Card
        style={{
          borderRadius: '12px',
          border: '1px solid #e8e8e8',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <List
          dataSource={templates}
          renderItem={(tpl) => (
            <List.Item
              style={{
                padding: '16px',
                borderBottom: '1px solid #f0f0f0',
                cursor: 'pointer',
              }}
              onClick={() => setSelected(tpl)}
            >
              <List.Item.Meta
                title={<Text strong>{tpl.name}</Text>}
                description={<Text type="secondary" style={{ fontSize: '12px' }}>{tpl.subject}</Text>}
              />
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(tpl);
                }}
              >
                Chỉnh sửa
              </Button>
            </List.Item>
          )}
          footer={
            <div style={{ padding: '12px', textAlign: 'center' }}>
              <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                style={{ color: '#1890ff' }}
              >
                Thêm mẫu thông báo
              </Button>
            </div>
          }
        />
      </Card>

      {selected && (
        <Card
          style={{
            marginTop: '16px',
            borderRadius: '12px',
            border: '1px solid #e8e8e8',
            backgroundColor: '#fafafa',
          }}
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Title level={5} style={{ margin: 0 }}>
              Chỉnh sửa mẫu: {selected.name}
            </Title>

            <Form layout="vertical">
              <Form.Item label="Tên mẫu">
                <Input
                  value={selected.name}
                  onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                  placeholder="Tên mẫu"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>

              <Form.Item label="Tiêu đề (Subject)">
                <Input
                  value={selected.subject}
                  onChange={(e) => setSelected({ ...selected, subject: e.target.value })}
                  placeholder="Tiêu đề thông báo"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>

              <Form.Item label="Nội dung thông báo">
                <TextArea
                  rows={4}
                  value={selected.content}
                  onChange={(e) => setSelected({ ...selected, content: e.target.value })}
                  placeholder="Nội dung thông báo (có thể dùng biến {{name}}, {{branch}}, ...)"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => setSelected(null)}
                  style={{ borderRadius: '8px' }}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave(selected)}
                  style={{
                    background:
                      'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%)',
                    border: 'none',
                    borderRadius: '8px',
                  }}
                >
                  Lưu
                </Button>
              </div>
            </Form>
          </Space>
        </Card>
      )}
    </div>
  );
};

export default TemplateManager;
