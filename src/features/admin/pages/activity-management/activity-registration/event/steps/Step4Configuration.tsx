// Step 4: Cấu hình - Sự kiện
import { Col, Form, Input, Row } from 'antd';
import type { FormInstance } from 'antd/es/form';
import StyledSwitch from '../../../../../../../components/common/StyledSwitch';

const { TextArea } = Input;

interface Step4ConfigurationProps {
  form: FormInstance;
}

export default function Step4Configuration({ form }: Step4ConfigurationProps) {
  return (
    <div>
      <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '18px' }}>
        Cấu hình hoạt động
      </h3>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Mô tả chi tiết" name="description">
            <TextArea
              rows={4}
              placeholder="Nội dung, yêu cầu, quyền lợi tham gia..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Yêu cầu điểm danh"
            name="isRequiredCheckin"
            valuePropName="checked"
          >
            <StyledSwitch checkedChildren="Bắt buộc" unCheckedChildren="Không bắt buộc" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Ghi chú cho BTC" name="note">
            <TextArea
              rows={3}
              placeholder="Thông tin nội bộ cho Ban tổ chức"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

