// Step 1: Thông tin cơ bản - Sự kiện
import { Col, Form, Input, Row, Select, DatePicker } from 'antd';
import type { FormInstance } from 'antd/es/form';

const { RangePicker } = DatePicker;
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
        <Col span={12}>
          <Form.Item
            label="Tên hoạt động"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên hoạt động' }]}
          >
            <Input
              size="large"
              placeholder="Ví dụ: Hiến máu nhân đạo, Mùa hè xanh..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Loại hoạt động"
            name="type"
            rules={[{ required: true, message: 'Vui lòng chọn loại hoạt động' }]}
          >
            <Select
              size="large"
              placeholder="Chọn loại"
              style={{ borderRadius: '8px' }}
              options={[
                { label: 'Hoạt động tình nguyện', value: 'tinh-nguyen' },
                { label: 'Hoạt động phong trào', value: 'van-hoa' },
                { label: 'Sinh hoạt chuyên đề', value: 'hoc-tap' },
                { label: 'Hoạt động thể thao', value: 'the-thao' },
                { label: 'Khác', value: 'khac' },
              ]}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Thời gian diễn ra"
            name="timeRange"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
          >
            <RangePicker
              showTime
              format="DD/MM/YYYY HH:mm"
              style={{ width: '100%', borderRadius: '8px' }}
              size="large"
              placeholder={['Bắt đầu', 'Kết thúc']}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Số lượng Đoàn viên dự kiến" name="expectedParticipants">
            <Input
              type="number"
              size="large"
              min={0}
              placeholder="Ví dụ: 100"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Mô tả" name="description">
            <TextArea
              rows={4}
              placeholder="Nội dung, mục đích, ý nghĩa của hoạt động..."
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

