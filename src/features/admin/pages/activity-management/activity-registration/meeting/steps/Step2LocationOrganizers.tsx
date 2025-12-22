// Step 2: Địa điểm & Tổ chức - Sinh hoạt
import { Col, Form, Input, Row } from 'antd';
import type { FormInstance } from 'antd/es/form';

interface Step2LocationOrganizersProps {
  form: FormInstance;
}

export default function Step2LocationOrganizers({ form: _form }: Step2LocationOrganizersProps) {
  return (
    <div>
      <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '18px' }}>
        Địa điểm và tổ chức
      </h3>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Địa điểm / phòng"
            name="location"
            rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
          >
            <Input
              size="large"
              placeholder="VD: Hội trường A1, Phòng B204..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Link phòng họp online" name="onlineLink">
            <Input
              size="large"
              placeholder="VD: Link Google Meet / Zoom (nếu có)"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Ban tổ chức" name="organizer">
            <Input
              size="large"
              placeholder="VD: Ban Chấp hành Chi đoàn..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Người phụ trách" name="contactPerson">
            <Input
              size="large"
              placeholder="VD: Bí thư Nguyễn Văn A"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Số điện thoại liên hệ" name="contactPhone">
            <Input
              size="large"
              placeholder="VD: 09xx xxx xxx"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

