// src/features/admin/pages/activity/event/components/EventTimeLocationSection.tsx
import { Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';

const { RangePicker } = DatePicker;

const EventTimeLocationSection: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Thời gian diễn ra"
          name="timeRange"
          rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
        >
          <RangePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Địa điểm"
          name="location"
          rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
        >
          <Input placeholder="Ví dụ: Hội trường A1, Khu phố 3 - ĐBP..." />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Số lượng Đoàn viên dự kiến" name="expectedParticipants">
          <InputNumber style={{ width: '100%' }} min={0} placeholder="Ví dụ: 100" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default EventTimeLocationSection;
