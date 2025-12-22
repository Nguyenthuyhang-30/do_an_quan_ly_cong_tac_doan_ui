// Step 1: Thông tin cơ bản - Biểu quyết
import { Col, Form, Input, Row, DatePicker } from 'antd';
import type { FormInstance } from 'antd/es/form';
import StyledSwitch from '../../../../../../../components/common/StyledSwitch';

const { TextArea } = Input;

interface Step1BasicInfoProps {
  form: FormInstance;
}

export default function Step1BasicInfo({ form }: Step1BasicInfoProps) {
  return (
    <div>
      <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '18px' }}>
        Thông tin cơ bản
      </h3>

      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            label="Tiêu đề biểu quyết"
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input
              size="large"
              placeholder="Ví dụ: Bình chọn BCH Chi đoàn, Thống nhất kế hoạch..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Hạn cuối tham gia" name="deadline">
            <DatePicker
              showTime
              format="DD/MM/YYYY HH:mm"
              style={{ width: '100%', borderRadius: '8px' }}
              size="large"
              placeholder="Chọn hạn cuối"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Biểu quyết ẩn danh" name="isAnonymous" valuePropName="checked">
            <StyledSwitch checkedChildren="Ẩn danh" unCheckedChildren="Hiển tên" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Cho phép chọn nhiều phương án"
            name="allowMultiple"
            valuePropName="checked"
          >
            <StyledSwitch checkedChildren="Nhiều lựa chọn" unCheckedChildren="Một lựa chọn" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Mô tả / nội dung" name="description">
            <TextArea
              rows={3}
              placeholder="Giải thích nội dung biểu quyết, bối cảnh, lưu ý..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

