// Step 3: Chương trình sinh hoạt - Sinh hoạt
import { Button, Col, Form, Input, Row, Space } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface Step3AgendaProps {
  form: FormInstance;
}

export default function Step3Agenda({ form: _form }: Step3AgendaProps) {
  return (
    <div>
      <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '18px' }}>
        Chương trình buổi sinh hoạt
      </h3>

      <Row gutter={16}>
        <Col span={24}>
          <Form.List name="agenda">
            {(fields, { add, remove }) => (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    style={{ borderRadius: '8px' }}
                  >
                    Thêm mục chương trình
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
                      label={index === 0 ? 'Nội dung' : ''}
                      name={[field.name, 'title']}
                      rules={[{ required: true, message: 'Nhập nội dung chương trình' }]}
                      style={{ flex: 1 }}
                    >
                      <Input
                        size="large"
                        placeholder={`Nội dung ${index + 1}`}
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Item>

                    <Form.Item name={[field.name, 'time']}>
                      <Input
                        size="large"
                        placeholder="Thời gian (vd: 19:30 - 19:45)"
                        style={{ borderRadius: '8px', width: '200px' }}
                      />
                    </Form.Item>

                    <Form.Item name={[field.name, 'presenter']}>
                      <Input
                        size="large"
                        placeholder="Người phụ trách"
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
              </>
            )}
          </Form.List>
        </Col>
      </Row>
    </div>
  );
}

