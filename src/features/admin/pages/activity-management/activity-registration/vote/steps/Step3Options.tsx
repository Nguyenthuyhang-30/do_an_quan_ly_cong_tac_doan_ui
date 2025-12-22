// Step 3: Lựa chọn - Biểu quyết
import { Button, Col, Form, Input, InputNumber, Row, Space } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface Step3OptionsProps {
  form: FormInstance;
}

export default function Step3Options({ form }: Step3OptionsProps) {
  return (
    <div>
      <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '18px' }}>
        Danh sách lựa chọn
      </h3>

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
                <div style={{ marginBottom: '16px' }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    style={{ borderRadius: '8px' }}
                  >
                    Thêm lựa chọn
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
                      label={index === 0 ? 'Lựa chọn' : ''}
                      name={[field.name, 'label']}
                      rules={[{ required: true, message: 'Nhập nội dung lựa chọn' }]}
                      style={{ flex: 1 }}
                    >
                      <Input
                        size="large"
                        placeholder={`Lựa chọn ${index + 1}`}
                        style={{ borderRadius: '8px' }}
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

        <Col span={12}>
          <Form.Item label="Số lựa chọn tối thiểu" name="minChoice">
            <InputNumber
              min={1}
              size="large"
              style={{ width: '100%', borderRadius: '8px' }}
              placeholder="Không bắt buộc"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Số lựa chọn tối đa" name="maxChoice">
            <InputNumber
              min={1}
              size="large"
              style={{ width: '100%', borderRadius: '8px' }}
              placeholder="Không giới hạn"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

