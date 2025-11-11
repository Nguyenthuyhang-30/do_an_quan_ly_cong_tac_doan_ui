// src/features/admin/pages/activity/create-activity/VoteBasicInfoSection.tsx
import React from 'react';
import { Col, DatePicker, Form, Input, Row, Switch } from 'antd';

const { TextArea } = Input;

const VoteBasicInfoSection: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col span={16}>
        <Form.Item
          label="Tiêu đề biểu quyết"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input placeholder="Ví dụ: Bình chọn BCH Chi đoàn, Thống nhất kế hoạch..." />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Hạn cuối tham gia" name="deadline">
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm"
            style={{ width: '100%' }}
            placeholder="Chọn hạn cuối"
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Biểu quyết ẩn danh" name="isAnonymous" valuePropName="checked">
          <Switch checkedChildren="Ẩn danh" unCheckedChildren="Hiển tên" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Cho phép chọn nhiều phương án"
          name="allowMultiple"
          valuePropName="checked"
        >
          <Switch checkedChildren="Nhiều lựa chọn" unCheckedChildren="Một lựa chọn" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="Mô tả / nội dung" name="description">
          <TextArea rows={3} placeholder="Giải thích nội dung biểu quyết, bối cảnh, lưu ý..." />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default VoteBasicInfoSection;
