// src/features/admin/pages/activity/create-activity/CreateVolunteerPage.tsx
import React from 'react';
import { Button, Card, Form, message } from 'antd';
import type { VolunteerFormValues } from './types';
import VolunteerBasicInfoSection from './VolunteerBasicInfoSection';
import VolunteerSlotsSection from './VolunteerSlotsSection';

import VolunteerTargetSection from './VolunteerTargetSection';

const CreateVolunteerPage: React.FC = () => {
  const [form] = Form.useForm<VolunteerFormValues>();

  const handleSubmit = (values: VolunteerFormValues) => {
    console.log('Volunteer form submit:', values);
    // TODO: call API tạo hoạt động tình nguyện
    message.success('Đã lưu hoạt động tình nguyện (demo)');
  };

  return (
    <div className="p-4">
      <Card title="Tạo hoạt động tình nguyện / chiến dịch mới">
        ∏
        <Form<VolunteerFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            requireHealthCheck: false,
            requireTraining: true,
            targetType: 'branch',
            slots: [
              { id: 1, title: 'Hậu cần' },
              { id: 2, title: 'Truyền thông' },
            ],
          }}
        >
          <VolunteerBasicInfoSection />
          <VolunteerSlotsSection />
          <VolunteerTargetSection />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu & tạo hoạt động
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateVolunteerPage;
