// src/features/admin/pages/activity/event/components/EventBasicInfoSection.tsx
import { Col, Form, Input, Row, Select } from 'antd';

const EventBasicInfoSection: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Tên hoạt động"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên hoạt động' }]}
        >
          <Input placeholder="Ví dụ: Hiến máu nhân đạo, Mùa hè xanh..." />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Loại hoạt động"
          name="type"
          rules={[{ required: true, message: 'Vui lòng chọn loại hoạt động' }]}
        >
          <Select
            placeholder="Chọn loại"
            options={[
              { label: 'Hoạt động tình nguyện', value: 'volunteer' },
              { label: 'Hoạt động phong trào', value: 'campaign' },
              { label: 'Sinh hoạt chuyên đề', value: 'seminar' },
            ]}
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Đối tượng / Chi đoàn"
          name="targetBranch"
          rules={[{ required: true, message: 'Vui lòng chọn đối tượng' }]}
        >
          <Select
            placeholder="Chọn chi đoàn hoặc toàn khoa"
            options={[
              { label: 'Toàn khoa CNTT', value: 'all' },
              { label: 'Chi đoàn CNTT K14A', value: 'cntt-k14a' },
              { label: 'Chi đoàn CNTT K14B', value: 'cntt-k14b' },
            ]}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default EventBasicInfoSection;
