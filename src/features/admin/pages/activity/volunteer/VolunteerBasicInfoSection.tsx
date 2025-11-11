// src/features/admin/pages/activity/create-activity/VolunteerBasicInfoSection.tsx
import React from 'react';
import { Col, DatePicker, Form, Input, InputNumber, Row, Switch } from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const VolunteerBasicInfoSection: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col span={16}>
        <Form.Item
          label="Tên hoạt động tình nguyện"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập tên hoạt động' }]}
        >
          <Input placeholder="VD: Chiến dịch Mùa hè xanh tại xã A..." />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Chiến dịch / chương trình" name="campaignName">
          <Input placeholder="VD: Chiến dịch Mùa hè xanh 2025" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Địa điểm"
          name="location"
          rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
        >
          <Input placeholder="VD: Xã X, Huyện Y, Tỉnh Z..." />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Thời gian diễn ra" name="timeRange">
          <RangePicker
            showTime
            format="DD/MM/YYYY HH:mm"
            style={{ width: '100%' }}
            placeholder={['Bắt đầu', 'Kết thúc']}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="Ghi chú về thời gian" name="timeNote">
          <Input placeholder="VD: Tập trung lúc 6h45 tại cổng trường..." />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Số lượng TNV tối đa" name="maxVolunteers">
          <InputNumber min={1} style={{ width: '100%' }} placeholder="Không giới hạn" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Người phụ trách" name="contactPerson">
          <Input placeholder="VD: Bí thư Nguyễn Văn A" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Số điện thoại liên hệ" name="contactPhone">
          <Input placeholder="VD: 09xx xxx xxx" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Yêu cầu sức khỏe tốt" name="requireHealthCheck" valuePropName="checked">
          <Switch checkedChildren="Có" unCheckedChildren="Không" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Yêu cầu tập huấn trước" name="requireTraining" valuePropName="checked">
          <Switch checkedChildren="Có" unCheckedChildren="Không" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="Nội dung chi tiết" name="description">
          <TextArea
            rows={3}
            placeholder="Mô tả công việc tình nguyện, lịch trình sơ bộ, trang phục, lưu ý..."
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="Quyền lợi / ghi nhận" name="benefits">
          <TextArea
            rows={2}
            placeholder="VD: Cộng điểm rèn luyện, Giấy chứng nhận, Hỗ trợ ăn trưa..."
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default VolunteerBasicInfoSection;
