// Step 3: Vị trí tình nguyện - Tình nguyện
import { Button, Col, Form, Input, InputNumber, Row, Space } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface Step3SlotsProps {
  form: FormInstance;
}

export default function Step3Slots({ form: _form }: Step3SlotsProps) {
  return (
    <div>
      <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '18px' }}>
        Nhóm công việc / vị trí tình nguyện
      </h3>

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
                <div style={{ marginBottom: '16px' }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    style={{ borderRadius: '8px' }}
                  >
                    Thêm vị trí
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <Space
                    key={field.key}
                    style={{ display: 'flex', marginBottom: 8, width: '100%' }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      label={index === 0 ? 'Tên vị trí' : ''}
                      name={[field.name, 'title']}
                      rules={[{ required: true, message: 'Nhập tên vị trí' }]}
                      style={{ flex: 1 }}
                    >
                      <Input
                        size="large"
                        placeholder="VD: Hậu cần, Hướng dẫn viên, Truyền thông..."
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Item>

                    <Form.Item name={[field.name, 'quantity']}>
                      <InputNumber
                        min={1}
                        size="large"
                        placeholder="Số lượng"
                        style={{ borderRadius: '8px', width: '120px' }}
                      />
                    </Form.Item>

                    <Form.Item name={[field.name, 'note']}>
                      <Input
                        size="large"
                        placeholder="Ghi chú"
                        style={{ borderRadius: '8px', width: '150px' }}
                      />
                    </Form.Item>

                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
                      />
                    )}
                  </Space>
                ))}

                {errors && errors.length > 0 && (
                  <div style={{ color: 'red', fontSize: '14px', marginTop: '8px' }}>
                    {errors.map((error, idx) => (
                      <div key={idx}>{error}</div>
                    ))}
                  </div>
                )}
              </>
            )}
          </Form.List>
        </Col>
      </Row>
    </div>
  );
}

