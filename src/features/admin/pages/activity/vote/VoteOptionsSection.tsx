// src/features/admin/pages/activity/create-activity/VoteOptionsSection.tsx
import React from 'react';
import { Button, Col, Form, Input, InputNumber, Row, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const VoteOptionsSection: React.FC = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Form.List
            name="options"
            rules={[
              {
                validator: async (_, options) => {
                  if (!options || options.length < 2) {
                    return Promise.reject(new Error('Cần ít nhất 2 lựa chọn cho biểu quyết'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Danh sách lựa chọn</span>
                  <Button type="dashed" size="small" icon={<PlusOutlined />} onClick={() => add()}>
                    Thêm lựa chọn
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
                      label={index === 0 ? 'Lựa chọn' : ''}
                      name={[field.name, 'label']}
                      fieldKey={[field.fieldKey!, 'label']}
                      rules={[{ required: true, message: 'Nhập nội dung lựa chọn' }]}
                    >
                      <Input placeholder={`Lựa chọn ${index + 1}`} />
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

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Số lựa chọn tối thiểu" name="minChoice">
            <InputNumber min={1} style={{ width: '100%' }} placeholder="Không bắt buộc" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Số lựa chọn tối đa" name="maxChoice">
            <InputNumber min={1} style={{ width: '100%' }} placeholder="Không giới hạn" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default VoteOptionsSection;
