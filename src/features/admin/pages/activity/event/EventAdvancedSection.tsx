// src/features/admin/pages/activity/event/components/EventAdvancedSection.tsx
import { Col, Form, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import StyledSwitch from '../../../../../components/common/StyledSwitch';

const EventAdvancedSection: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col span={16}>
        <Form.Item label="Mô tả chi tiết" name="description">
          <TextArea rows={4} placeholder="Nội dung, yêu cầu, quyền lợi tham gia..." />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Yêu cầu điểm danh" name="isRequiredCheckin" valuePropName="checked">
          <StyledSwitch checkedChildren="Bắt buộc" unCheckedChildren="Không bắt buộc" />
        </Form.Item>

        <Form.Item label="Ghi chú cho BTC" name="note">
          <TextArea rows={3} placeholder="Thông tin nội bộ cho Ban tổ chức" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default EventAdvancedSection;
