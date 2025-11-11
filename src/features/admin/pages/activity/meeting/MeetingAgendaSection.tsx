// src/features/admin/pages/activity/create-activity/MeetingAgendaSection.tsx
import React from 'react';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const MeetingAgendaSection: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Form.List name="agenda">
          {(fields, { add, remove }) => (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Chương trình buổi sinh hoạt</span>
                <Button type="dashed" size="small" icon={<PlusOutlined />} onClick={() => add()}>
                  Thêm mục chương trình
                </Button>
              </div>

              {fields.map((field, index) => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    label={index === 0 ? 'Nội dung' : ''}
                    name={[field.name, 'title']}
                    fieldKey={[field.fieldKey!, 'title']}
                    rules={[{ required: true, message: 'Nhập nội dung chương trình' }]}
                  >
                    <Input placeholder={`Nội dung ${index + 1}`} />
                  </Form.Item>

                  <Form.Item name={[field.name, 'time']} fieldKey={[field.fieldKey!, 'time']}>
                    <Input placeholder="Thời gian (vd: 19:30 - 19:45)" />
                  </Form.Item>

                  <Form.Item
                    name={[field.name, 'presenter']}
                    fieldKey={[field.fieldKey!, 'presenter']}
                  >
                    <Input placeholder="Người phụ trách" />
                  </Form.Item>

                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      onClick={() => remove(field.name)}
                      style={{ color: 'red' }}
                    />
                  ) : null}
                </Space>
              ))}
            </>
          )}
        </Form.List>
      </Col>
    </Row>
  );
};

export default MeetingAgendaSection;
