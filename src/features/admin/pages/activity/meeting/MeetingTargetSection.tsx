// src/features/admin/pages/activity/create-activity/MeetingTargetSection.tsx
import React from 'react';
import { Col, Form, Radio, Row, Select } from 'antd';

const MeetingTargetSection: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item label="Đối tượng tham gia" name="targetType">
          <Radio.Group>
            <Radio value="all">Toàn bộ Đoàn viên khoa</Radio>
            <Radio value="branch">Theo chi đoàn</Radio>
            <Radio value="role">Theo vai trò</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Chi đoàn áp dụng" name="targetBranches">
          <Select
            mode="multiple"
            allowClear
            placeholder="Chỉ áp dụng khi chọn 'Theo chi đoàn'"
            options={[
              { label: 'CNTT K14A', value: 'cntt-k14a' },
              { label: 'CNTT K14B', value: 'cntt-k14b' },
              { label: 'CNTT K15A', value: 'cntt-k15a' },
            ]}
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Vai trò áp dụng" name="targetRoles">
          <Select
            mode="multiple"
            allowClear
            placeholder="Chỉ áp dụng khi chọn 'Theo vai trò'"
            options={[
              { label: 'BCH Chi đoàn', value: 'bch' },
              { label: 'Bí thư', value: 'secretary' },
              { label: 'Đoàn viên', value: 'member' },
            ]}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default MeetingTargetSection;
