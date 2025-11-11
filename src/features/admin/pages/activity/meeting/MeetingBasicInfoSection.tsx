// src/features/admin/pages/activity/create-activity/MeetingBasicInfoSection.tsx
import React from 'react';
import { Col, DatePicker, Form, Input, Radio, Row, Switch } from 'antd';

const { TextArea } = Input;

const MeetingBasicInfoSection: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col span={16}>
        <Form.Item
          label="Chủ đề buổi sinh hoạt"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập chủ đề' }]}
        >
          <Input placeholder="Ví dụ: Sinh hoạt Chi đoàn tháng 11, Tổng kết học kỳ..." />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Chi đoàn / đơn vị tổ chức"
          name="branch"
          rules={[{ required: true, message: 'Vui lòng chọn chi đoàn' }]}
        >
          <Input placeholder="VD: CNTT K14A" />
          {/* Sau này có thể dùng Select từ API danh sách chi đoàn */}
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Thời gian diễn ra" name="dateTime">
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm"
            style={{ width: '100%' }}
            placeholder="Chọn ngày giờ"
          />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Hình thức sinh hoạt" name="meetingType">
          <Radio.Group>
            <Radio value="offline">Trực tiếp</Radio>
            <Radio value="online">Online</Radio>
            <Radio value="hybrid">Kết hợp</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Địa điểm / phòng" name="location">
          <Input placeholder="VD: Hội trường A1, Phòng B204..." />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Link phòng họp online" name="onlineLink">
          <Input placeholder="VD: Link Google Meet / Zoom (nếu có)" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Bắt buộc điểm danh" name="isRequiredAttendance" valuePropName="checked">
          <Switch checkedChildren="Bắt buộc" unCheckedChildren="Không bắt buộc" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Cho phép check-in bằng QR" name="allowQrCheckin" valuePropName="checked">
          <Switch checkedChildren="Có" unCheckedChildren="Không" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="Ghi chú / nội dung chi tiết" name="note">
          <TextArea
            rows={3}
            placeholder="Thêm ghi chú về chuẩn bị, trang phục, tài liệu mang theo..."
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default MeetingBasicInfoSection;
