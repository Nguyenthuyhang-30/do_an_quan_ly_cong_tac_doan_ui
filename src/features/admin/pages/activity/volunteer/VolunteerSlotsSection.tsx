// src/features/admin/pages/activity/create-activity/VolunteerSlotsSection.tsx
import React from 'react';
import { Button, Col, Form, Input, InputNumber, Row, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const VolunteerSlotsSection: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Form.List
          name="slots"
          rules={[
            {
              validator: async (_, slots) => {
                if (!slots || slots.length < 1) {
                  return Promise.reject(
                    new Error('Cần ít nhất 1 nhóm công việc / vị trí tình nguyện'),
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Nhóm công việc / vị trí tình nguyện</span>
                <Button type="dashed" size="small" icon={<PlusOutlined />} onClick={() => add()}>
                  Thêm vị trí
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
                    label={index === 0 ? 'Tên vị trí' : ''}
                    name={[field.name, 'title']}
                    fieldKey={[field.fieldKey!, 'title']}
                    rules={[{ required: true, message: 'Nhập tên vị trí' }]}
                  >
                    <Input placeholder={`VD: Hậu cần, Hướng dẫn viên, Truyền thông...`} />
                  </Form.Item>

                  <Form.Item
                    name={[field.name, 'quantity']}
                    fieldKey={[field.fieldKey!, 'quantity']}
                  >
                    <InputNumber min={1} placeholder="Số lượng" />
                  </Form.Item>

                  <Form.Item name={[field.name, 'note']} fieldKey={[field.fieldKey!, 'note']}>
                    <Input placeholder="Ghi chú" />
                  </Form.Item>

                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      onClick={() => remove(field.name)}
                      style={{ color: 'red' }}
                    />
                  ) : null}
                </Space>
              ))}

              <Form.ErrorList errors={errors} />
            </>
          )}
        </Form.List>
      </Col>
    </Row>
  );
};

export default VolunteerSlotsSection;
